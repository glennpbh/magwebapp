import { Readable } from 'stream'
import { pipeline } from 'stream/promises'
import { Pool } from 'pg'
import copyFrom from 'pg-copy-streams'
import { stringify } from 'csv-stringify'

import { queryMultiple, executeScalar } from '../db/query'

interface CustomerSyncData {
  customerAccount: string
  customerName: string
  salesOffice: string
  address1?: string
  address2?: string
  address3?: string
  address4?: string
  address5?: string
  address6?: string
  postcode?: string
  countryCode?: string
  contactName?: string
  telephone?: string
  mobile?: string
  email?: string
  vatRegNum?: string
  companyRegNum?: string
  repCode?: string
  status: string
  prospectCustType: string
  withdrawn: string
}

export class FastCustomerSyncService {
  private pgPool: Pool

  constructor() {
    this.pgPool = new Pool({
      host: process.env.POSTGRES_HOST || 'localhost',
      port: parseInt(process.env.POSTGRES_PORT || '5432'),
      user: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'postgres',
      database: process.env.POSTGRES_DB || 'magwebapp_dev',
      ssl: process.env.POSTGRES_SSL === 'true',
      max: 10
    })
  }

  /**
   * Ultra-fast full sync using PostgreSQL COPY command
   */
  async fullSync(): Promise<{
    totalRecords: number
    syncTime: number
    recordsPerSecond: number
  }> {
    const startTime = Date.now()
    console.log('🚀 Starting ultra-fast customer sync...')

    try {
      // Get total count for progress tracking
      const totalCount = await this.getOracleTotalCount()
      console.log(`📊 Total customers to sync: ${totalCount}`)

      // Clear existing data
      await this.clearExistingData()
      console.log('🗑️  Cleared existing data')

      // Stream data from Oracle and bulk insert to PostgreSQL
      const syncedCount = await this.streamOracleToPostgres()
      console.log(`✅ Synced ${syncedCount} customers`)

      // Update statistics
      await this.updateSyncStatistics()

      const endTime = Date.now()
      const syncTime = (endTime - startTime) / 1000
      const recordsPerSecond = Math.round(syncedCount / syncTime)

      console.log(`🏁 Sync completed in ${syncTime}s (${recordsPerSecond} records/sec)`)

      return {
        totalRecords: syncedCount,
        syncTime,
        recordsPerSecond
      }
    } catch (error) {
      console.error('❌ Sync failed:', error)
      throw error
    }
  }

  /**
   * Incremental sync for recently changed customers
   */
  async incrementalSync(
    sinceDate?: Date
  ): Promise<{ totalRecords: number; syncTime: number }> {
    const startTime = Date.now()
    const since = sinceDate || new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24h

    console.log(`🔄 Starting incremental sync since ${since.toISOString()}`)

    try {
      const syncedCount = await this.streamOracleToPostgres(since, true)
      
      const endTime = Date.now()
      const syncTime = (endTime - startTime) / 1000

      console.log(
        `✅ Incremental sync completed: ${syncedCount} records in ${syncTime}s`
      )

      return { totalRecords: syncedCount, syncTime }
    } catch (error) {
      console.error('❌ Incremental sync failed:', error)
      throw error
    }
  }

  /**
   * Stream data from Oracle to PostgreSQL using COPY
   */
  private async streamOracleToPostgres(
    sinceDate?: Date,
    upsert = false
  ): Promise<number> {
    const client = await this.pgPool.connect()
    let recordCount = 0

    try {
      const tempTableName = upsert ? 'customer_search_temp' : 'customer_search'

      // Create temp table for upserts
      if (upsert) {
        await client.query(`
          CREATE TEMP TABLE customer_search_temp (LIKE customer_search INCLUDING DEFAULTS)
        `)
      }

      // Create COPY stream
      const copyStream = client.query(
        copyFrom(`
          COPY ${tempTableName} (
            customer_account, customer_name, sales_office,
            address_1, address_2, address_3, address_4, address_5, address_6,
            postcode, country_code, contact_name, telephone, mobile, email,
            vat_reg_num, company_reg_num, rep_code,
            status, prospect_cust_type, withdrawn,
            last_synced, synced_from
          ) FROM STDIN WITH CSV HEADER
        `)
      )

      // Create Oracle data stream
      const oracleStream = await this.createOracleDataStream(sinceDate)

      // CSV formatter
      const csvStream = stringify({
        header: true,
        columns: [
          'customer_account',
          'customer_name',
          'sales_office',
          'address_1',
          'address_2',
          'address_3',
          'address_4',
          'address_5',
          'address_6',
          'postcode',
          'country_code',
          'contact_name',
          'telephone',
          'mobile',
          'email',
          'vat_reg_num',
          'company_reg_num',
          'rep_code',
          'status',
          'prospect_cust_type',
          'withdrawn',
          'last_synced',
          'synced_from'
        ]
      })

      // Count records as they pass through
      const countStream = new Readable({
        objectMode: true,
        transform(chunk, _encoding, callback) {
          recordCount++
          if (recordCount % 10000 === 0) {
            console.log(`📈 Processed ${recordCount} records...`)
          }
          callback(null, chunk)
        }
      })

      // Stream pipeline: Oracle → CSV → PostgreSQL
      await pipeline(oracleStream, csvStream, copyStream)

      // Handle upsert logic
      if (upsert && recordCount > 0) {
        await this.performUpsert(client)
      }

      console.log(`📦 Streamed ${recordCount} records to PostgreSQL`)
      return recordCount
    } finally {
      client.release()
    }
  }

  /**
   * Create streaming Oracle data source
   */
  private async createOracleDataStream(sinceDate?: Date): Promise<Readable> {
    const whereClause = sinceDate
      ? `WHERE c.CHANGE_DATE >= ${this.dateToOracleNumber(sinceDate)}`
      : 'WHERE c.WITHDRAWN = 0'

    // Optimised Oracle query with joins for maximum data retrieval
    const sql = `
      SELECT 
        c.CUSTOMER_ACCOUNT,
        c.CUSTOMER_NAME,
        c.SALES_OFFICE,
        a.ADDRESS_1,
        a.ADDRESS_2,
        a.ADDRESS_3,
        a.ADDRESS_4,
        a.ADDRESS_5,
        a.ADDRESS_6,
        a.POSTCODE,
        c.COUNTRY_CODE,
        ct.CONTACT_NAME,
        ct.TELEPHONE,
        ct.MOBILE_TELEPHONE,
        ct.EMAIL,
        c.VAT_REG_NUM,
        c.COMPANY_REG_NUM,
        c.REP_CODE,
        CASE WHEN c.WITHDRAWN = 0 THEN 'Active' ELSE 'Withdrawn' END as STATUS,
        CASE WHEN c.PROSPECT_CUST_TYPE = 0 THEN 'Customer' ELSE 'Prospect' END as PROSPECT_TYPE,
        CASE WHEN c.WITHDRAWN = 0 THEN 'Active' ELSE 'Withdrawn' END as WITHDRAWN_STATUS
      FROM MAGINUS.CUSTOMER c
      LEFT JOIN MAGINUS.CUSTOMER_ADDRESS a ON (
        c.CUSTOMER_ACCOUNT = a.CUSTOMER_ACCOUNT 
        AND c.ADDRESS_ID = a.ADDRESS_ID
      )
      LEFT JOIN MAGINUS.CUSTOMER_CONTACT ct ON (
        c.CUSTOMER_ACCOUNT = ct.CUSTOMER_ACCOUNT 
        AND c.MAIN_CONTACT_ID = ct.CONTACT_ID
      )
      ${whereClause}
      ORDER BY c.CUSTOMER_ACCOUNT
    `

    console.log('🔍 Executing Oracle query...')
    const rows = await queryMultiple<any>(sql)
    console.log(`📊 Retrieved ${rows.length} rows from Oracle`)

    // Convert to stream
    let index = 0
    return new Readable({
      objectMode: true,
      read() {
        if (index < rows.length) {
          const row = rows[index++]
          this.push({
            customer_account: row.CUSTOMER_ACCOUNT,
            customer_name: this.cleanString(row.CUSTOMER_NAME),
            sales_office: row.SALES_OFFICE,
            address_1: this.cleanString(row.ADDRESS_1),
            address_2: this.cleanString(row.ADDRESS_2),
            address_3: this.cleanString(row.ADDRESS_3),
            address_4: this.cleanString(row.ADDRESS_4),
            address_5: this.cleanString(row.ADDRESS_5),
            address_6: this.cleanString(row.ADDRESS_6),
            postcode: this.cleanString(row.POSTCODE),
            country_code: row.COUNTRY_CODE,
            contact_name: this.cleanString(row.CONTACT_NAME),
            telephone: this.cleanString(row.TELEPHONE),
            mobile: this.cleanString(row.MOBILE_TELEPHONE),
            email: this.cleanString(row.EMAIL),
            vat_reg_num: this.cleanString(row.VAT_REG_NUM),
            company_reg_num: this.cleanString(row.COMPANY_REG_NUM),
            rep_code: this.cleanString(row.REP_CODE),
            status: row.STATUS,
            prospect_cust_type: row.PROSPECT_TYPE,
            withdrawn: row.WITHDRAWN_STATUS,
            last_synced: new Date().toISOString(),
            synced_from: 'Oracle'
          })
        } else {
          this.push(null) // End stream
        }
      }
    })
  }

  /**
   * Perform upsert from temp table to main table
   */
  private async performUpsert(client: any): Promise<void> {
    console.log('🔄 Performing upsert...')

    await client.query(`
      INSERT INTO customer_search 
      SELECT * FROM customer_search_temp
      ON CONFLICT (customer_account) DO UPDATE SET
        customer_name = EXCLUDED.customer_name,
        sales_office = EXCLUDED.sales_office,
        address_1 = EXCLUDED.address_1,
        address_2 = EXCLUDED.address_2,
        address_3 = EXCLUDED.address_3,
        address_4 = EXCLUDED.address_4,
        address_5 = EXCLUDED.address_5,
        address_6 = EXCLUDED.address_6,
        postcode = EXCLUDED.postcode,
        country_code = EXCLUDED.country_code,
        contact_name = EXCLUDED.contact_name,
        telephone = EXCLUDED.telephone,
        mobile = EXCLUDED.mobile,
        email = EXCLUDED.email,
        vat_reg_num = EXCLUDED.vat_reg_num,
        company_reg_num = EXCLUDED.company_reg_num,
        rep_code = EXCLUDED.rep_code,
        status = EXCLUDED.status,
        prospect_cust_type = EXCLUDED.prospect_cust_type,
        withdrawn = EXCLUDED.withdrawn,
        last_synced = EXCLUDED.last_synced
    `)

    console.log('✅ Upsert completed')
  }

  /**
   * Get total count from Oracle
   */
  private async getOracleTotalCount(): Promise<number> {
    return await executeScalar<number>(
      'SELECT COUNT(*) FROM MAGINUS.CUSTOMER WHERE WITHDRAWN = 0'
    )
  }

  /**
   * Clear existing PostgreSQL data
   */
  private async clearExistingData(): Promise<void> {
    const client = await this.pgPool.connect()
    try {
      await client.query('TRUNCATE TABLE customer_search')
    } finally {
      client.release()
    }
  }

  /**
   * Update sync statistics
   */
  private async updateSyncStatistics(): Promise<void> {
    const client = await this.pgPool.connect()
    try {
      await client.query('ANALYZE customer_search')
    } finally {
      client.release()
    }
  }

  /**
   * Utility: Clean string for CSV
   */
  private cleanString(value: any): string | null {
    if (!value) return null
    return String(value).replace(/"/g, '""').trim()
  }

  /**
   * Utility: Convert Date to Oracle number
   */
  private dateToOracleNumber(date: Date): number {
    // Oracle stores dates as number of days since 1900-01-01
    const oracleEpoch = new Date(1900, 0, 1)
    const diffTime = date.getTime() - oracleEpoch.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  /**
   * Close connections
   */
  async close(): Promise<void> {
    await this.pgPool.end()
  }
}

// Export singleton
export const fastCustomerSync = new FastCustomerSyncService()