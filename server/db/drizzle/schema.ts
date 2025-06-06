import { index, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

/**
 * Customer search table optimised for fast searches
 * Contains key customer information from Oracle MAGINUS.CUSTOMER table
 * with additional address and contact details for comprehensive search
 */
export const customerSearch = pgTable(
  'customer_search',
  {
    // Primary customer information
    customerAccount: varchar('customer_account', { length: 10 }).primaryKey(),
    customerName: varchar('customer_name', { length: 100 }).notNull(),
    salesOffice: varchar('sales_office', { length: 6 }).notNull(),

    // Address information (from related CUSTOMER_ADDRESS table)
    address1: varchar('address_1', { length: 100 }),
    address2: varchar('address_2', { length: 100 }),
    address3: varchar('address_3', { length: 100 }),
    address4: varchar('address_4', { length: 100 }),
    address5: varchar('address_5', { length: 100 }),
    address6: varchar('address_6', { length: 100 }),
    postcode: varchar('postcode', { length: 20 }),
    countryCode: varchar('country_code', { length: 6 }),

    // Contact information (from related CUSTOMER_CONTACT table)
    contactName: varchar('contact_name', { length: 100 }),
    telephone: varchar('telephone', { length: 30 }),
    mobile: varchar('mobile', { length: 30 }),
    email: varchar('email', { length: 256 }),

    // Additional searchable fields
    vatRegNum: varchar('vat_reg_num', { length: 15 }),
    companyRegNum: varchar('company_reg_num', { length: 20 }),
    repCode: varchar('rep_code', { length: 20 }),

    // Status and classification
    status: varchar('status', { length: 20 }).notNull().default('Active'),
    prospectCustType: varchar('prospect_cust_type', { length: 10 })
      .notNull()
      .default('Customer'),
    withdrawn: varchar('withdrawn', { length: 10 }).notNull().default('Active'),

    // Full-text search field (automatically maintained)
    searchVector: text('search_vector'),

    // Audit fields
    lastSynced: timestamp('last_synced').defaultNow().notNull(),
    syncedFrom: varchar('synced_from', { length: 20 }).notNull().default('Oracle')
  },
  (table) => ({
    // Primary search indexes
    customerAccountIdx: index('idx_customer_search_account').on(
      table.customerAccount
    ),
    postcodeIdx: index('idx_customer_search_postcode').on(table.postcode),

    // Full-text search index
    searchVectorIdx: index('idx_customer_search_vector')
      .using('gin', sql`to_tsvector('english', ${table.searchVector})`)
      .where(sql`${table.searchVector} IS NOT NULL`),

    // Additional search indexes
    nameIdx: index('idx_customer_search_name').on(table.customerName),
    salesOfficeIdx: index('idx_customer_search_sales_office').on(
      table.salesOffice
    ),
    emailIdx: index('idx_customer_search_email').on(table.email),
    telephoneIdx: index('idx_customer_search_telephone').on(table.telephone),
    mobileIdx: index('idx_customer_search_mobile').on(table.mobile),

    // Composite indexes for common search patterns
    namePostcodeIdx: index('idx_customer_search_name_postcode').on(
      table.customerName,
      table.postcode
    ),
    salesOfficeStatusIdx: index('idx_customer_search_office_status').on(
      table.salesOffice,
      table.status
    )
  })
)

export type CustomerSearch = typeof customerSearch.$inferSelect
export type NewCustomerSearch = typeof customerSearch.$inferInsert