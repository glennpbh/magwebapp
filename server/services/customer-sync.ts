import { eq, sql } from 'drizzle-orm'

import { db, schema } from '../db/drizzle/connection'
import { queryMultiple } from '../db/query'
import type { Customer } from '~/types/customer'
import type { CustomerAddress } from '~/types/customer-address'
import type { CustomerContact } from '~/types/customer-contact'

/**
 * Sync customer data from Oracle to PostgreSQL search table
 */
export class CustomerSyncService {
  /**
   * Sync all active customers from Oracle to PostgreSQL
   */
  async syncAllCustomers(): Promise<{ synced: number; errors: number }> {
    let synced = 0
    let errors = 0

    try {
      // Get all active customers from Oracle
      const customers = await this.getOracleCustomers()
      console.log(`Found ${customers.length} customers to sync`)

      for (const customer of customers) {
        try {
          await this.syncSingleCustomer(customer.customerAccount)
          synced++
        } catch (error) {
          console.error(
            `Error syncing customer ${customer.customerAccount}:`,
            error
          )
          errors++
        }
      }

      console.log(`Customer sync completed: ${synced} synced, ${errors} errors`)
      return { synced, errors }
    } catch (error) {
      console.error('Error in customer sync:', error)
      throw error
    }
  }

  /**
   * Sync a single customer by account number
   */
  async syncSingleCustomer(customerAccount: string): Promise<void> {
    try {
      // Get customer data from Oracle
      const [customer, addresses, contacts] = await Promise.all([
        this.getOracleCustomer(customerAccount),
        this.getOracleCustomerAddresses(customerAccount),
        this.getOracleCustomerContacts(customerAccount)
      ])

      if (!customer) {
        throw new Error(`Customer ${customerAccount} not found in Oracle`)
      }

      // Get primary address and contact
      const primaryAddress = addresses.find((addr) => addr.addressId === customer.addressId) || addresses[0]
      const primaryContact = contacts.find((contact) => contact.contactId === customer.mainContactId) || contacts[0]

      // Create search record
      const searchRecord = {
        customerAccount: customer.customerAccount,
        customerName: customer.customerName,
        salesOffice: customer.salesOffice,

        // Address information
        address1: primaryAddress?.address1,
        address2: primaryAddress?.address2,
        address3: primaryAddress?.address3,
        address4: primaryAddress?.address4,
        address5: primaryAddress?.address5,
        address6: primaryAddress?.address6,
        postcode: primaryAddress?.postcode,
        countryCode: customer.countryCode,

        // Contact information
        contactName: primaryContact?.contactName,
        telephone: primaryContact?.telephone,
        mobile: primaryContact?.mobileTelephone,
        email: primaryContact?.email,

        // Additional searchable fields
        vatRegNum: customer.vatRegNum,
        companyRegNum: customer.companyRegNum,
        repCode: customer.repCode,

        // Status and classification
        status: customer.withdrawn === 0 ? 'Active' : 'Withdrawn',
        prospectCustType: customer.prospectCustType === 0 ? 'Customer' : 'Prospect',
        withdrawn: customer.withdrawn === 0 ? 'Active' : 'Withdrawn',

        // Audit
        lastSynced: new Date(),
        syncedFrom: 'Oracle'
      }

      // Upsert to PostgreSQL
      await db
        .insert(schema.customerSearch)
        .values(searchRecord)
        .onConflictDoUpdate({
          target: schema.customerSearch.customerAccount,
          set: {
            customerName: searchRecord.customerName,
            salesOffice: searchRecord.salesOffice,
            address1: searchRecord.address1,
            address2: searchRecord.address2,
            address3: searchRecord.address3,
            address4: searchRecord.address4,
            address5: searchRecord.address5,
            address6: searchRecord.address6,
            postcode: searchRecord.postcode,
            countryCode: searchRecord.countryCode,
            contactName: searchRecord.contactName,
            telephone: searchRecord.telephone,
            mobile: searchRecord.mobile,
            email: searchRecord.email,
            vatRegNum: searchRecord.vatRegNum,
            companyRegNum: searchRecord.companyRegNum,
            repCode: searchRecord.repCode,
            status: searchRecord.status,
            prospectCustType: searchRecord.prospectCustType,
            withdrawn: searchRecord.withdrawn,
            lastSynced: searchRecord.lastSynced
          }
        })

      console.log(`Synced customer: ${customerAccount}`)
    } catch (error) {
      console.error(`Error syncing customer ${customerAccount}:`, error)
      throw error
    }
  }

  /**
   * Get all customers from Oracle
   */
  private async getOracleCustomers(): Promise<Pick<Customer, 'customerAccount'>[]> {
    return await queryMultiple<Pick<Customer, 'customerAccount'>>(
      'SELECT CUSTOMER_ACCOUNT as customerAccount FROM MAGINUS.CUSTOMER WHERE WITHDRAWN = 0 ORDER BY CUSTOMER_ACCOUNT'
    )
  }

  /**
   * Get single customer from Oracle
   */
  private async getOracleCustomer(customerAccount: string): Promise<Customer | null> {
    const customers = await queryMultiple<Customer>(
      `SELECT 
        CUSTOMER_ACCOUNT as customerAccount,
        CUSTOMER_NAME as customerName,
        SALES_OFFICE as salesOffice,
        COUNTRY_CODE as countryCode,
        ADDRESS_ID as addressId,
        MAIN_CONTACT_ID as mainContactId,
        VAT_REG_NUM as vatRegNum,
        COMPANY_REG_NUM as companyRegNum,
        REP_CODE as repCode,
        WITHDRAWN as withdrawn,
        PROSPECT_CUST_TYPE as prospectCustType
       FROM MAGINUS.CUSTOMER 
       WHERE CUSTOMER_ACCOUNT = :customerAccount`,
      { customerAccount }
    )

    return customers[0] || null
  }

  /**
   * Get customer addresses from Oracle
   */
  private async getOracleCustomerAddresses(customerAccount: string): Promise<CustomerAddress[]> {
    return await queryMultiple<CustomerAddress>(
      `SELECT 
        CUSTOMER_ACCOUNT as customerAccount,
        ADDRESS_ID as addressId,
        ADDRESS_1 as address1,
        ADDRESS_2 as address2,
        ADDRESS_3 as address3,
        ADDRESS_4 as address4,
        ADDRESS_5 as address5,
        ADDRESS_6 as address6,
        POSTCODE as postcode,
        COUNTRY_CODE as countryCode
       FROM MAGINUS.CUSTOMER_ADDRESS 
       WHERE CUSTOMER_ACCOUNT = :customerAccount
       ORDER BY ADDRESS_ID`,
      { customerAccount }
    )
  }

  /**
   * Get customer contacts from Oracle
   */
  private async getOracleCustomerContacts(customerAccount: string): Promise<CustomerContact[]> {
    return await queryMultiple<CustomerContact>(
      `SELECT 
        CUSTOMER_ACCOUNT as customerAccount,
        CONTACT_ID as contactId,
        CONTACT_NAME as contactName,
        TELEPHONE as telephone,
        MOBILE_TELEPHONE as mobileTelephone,
        EMAIL as email
       FROM MAGINUS.CUSTOMER_CONTACT 
       WHERE CUSTOMER_ACCOUNT = :customerAccount
       ORDER BY CONTACT_ID`,
      { customerAccount }
    )
  }

  /**
   * Search customers using full-text search
   */
  async searchCustomers(searchTerm: string, limit: number = 50): Promise<any[]> {
    if (!searchTerm || searchTerm.trim().length === 0) {
      return []
    }

    // Clean and prepare search term
    const cleanTerm = searchTerm.trim().replace(/[^\w\s]/g, ' ')

    try {
      // Use PostgreSQL full-text search
      return await db
        .select()
        .from(schema.customerSearch)
        .where(
          sql`to_tsvector('english', ${schema.customerSearch.searchVector}) @@ plainto_tsquery('english', ${cleanTerm})`
        )
        .orderBy(
          sql`ts_rank(to_tsvector('english', ${schema.customerSearch.searchVector}), plainto_tsquery('english', ${cleanTerm})) DESC`
        )
        .limit(limit)
    } catch (error) {
      console.error('Full-text search error:', error)
      
      // Fallback to LIKE search
      return await db
        .select()
        .from(schema.customerSearch)
        .where(
          sql`(
            ${schema.customerSearch.customerName} ILIKE ${`%${searchTerm}%`} OR
            ${schema.customerSearch.customerAccount} ILIKE ${`%${searchTerm}%`} OR
            ${schema.customerSearch.postcode} ILIKE ${`%${searchTerm}%`} OR
            ${schema.customerSearch.email} ILIKE ${`%${searchTerm}%`}
          )`
        )
        .limit(limit)
    }
  }

  /**
   * Get customer by account
   */
  async getCustomer(customerAccount: string): Promise<any | null> {
    const results = await db
      .select()
      .from(schema.customerSearch)
      .where(eq(schema.customerSearch.customerAccount, customerAccount))
      .limit(1)

    return results[0] || null
  }
}

// Export singleton instance
export const customerSyncService = new CustomerSyncService()