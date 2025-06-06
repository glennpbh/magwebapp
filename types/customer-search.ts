/**
 * Customer search result from PostgreSQL optimised search table
 */
export interface CustomerSearch {
  /** Unique identifier of a customer */
  customerAccount: string
  /** Name of the customer */
  customerName: string
  /** Unique identifier of a sales office */
  salesOffice: string
  
  /** First line of address */
  address1?: string
  /** Second line of address */
  address2?: string
  /** Third line of address */
  address3?: string
  /** Fourth line of address */
  address4?: string
  /** Fifth line of address */
  address5?: string
  /** Sixth line of address */
  address6?: string
  /** Postcode */
  postcode?: string
  /** Country code */
  countryCode?: string
  
  /** Name of primary contact */
  contactName?: string
  /** Primary telephone number */
  telephone?: string
  /** Mobile telephone number */
  mobile?: string
  /** Email address */
  email?: string
  
  /** VAT registration number */
  vatRegNum?: string
  /** Company registration number */
  companyRegNum?: string
  /** Sales representative code */
  repCode?: string
  
  /** Customer status */
  status: string
  /** Customer or prospect type */
  prospectCustType: string
  /** Withdrawn status */
  withdrawn: string
  
  /** Full-text search vector (automatically maintained) */
  searchVector?: string
  
  /** Last synchronisation timestamp */
  lastSynced: string
  /** Source system */
  syncedFrom: string
}

/**
 * Customer search API response
 */
export interface CustomerSearchResponse {
  success: boolean
  data: CustomerSearch[]
  count: number
  searchTerm: string
}

/**
 * Customer sync API response
 */
export interface CustomerSyncResponse {
  success: boolean
  message: string
  synced?: number
  errors?: number
}