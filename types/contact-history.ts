/**
 * Record of all contacts with customers/prospects
 */
export interface ContactHistory {
  /** 0=customer ; 1= prospect */
  prospectCustType: number
  /** Prospect reference or customer account */
  prospectCustomer: string
  /** Identifies a contact within a customer.  This ID is only unique within a customer. */
  contactId?: number
  /** Name of a customer/supplier contact */
  contactName?: string
  /** Date/time of contact */
  contactDate?: number
  /** Types of contact eg phonecall, fax etc. */
  contactAction?: string
  /** Uniquely identifies a Maginus user */
  username?: string
  /** Free text */
  contactText?: string
  /** contact action */
  nextContactAction?: string
  /** date of next contact */
  nextContactDate?: number
  /** Contact at our end */
  nextUsername?: string
  /** Date record was last updated */
  changeDate?: number
  /** The user entering or last updating the record */
  changeUser?: string
  /** Document number */
  salesDocumentNum?: number
  /** 1=Sales order/quote, 2=Credit Note, 3=RMA, 4=Fax job */
  documentType?: number
  /** GRN number; Despatch number or RMA number -see movement_type */
  documentNumber?: number
  /** text reference to text_storage table */
  contactTextNum?: number
  /** Shows origins for reference */
  contactReference?: string
  /** System generated identifier for a contact history entry */
  contactHistKey?: number
  /** Allows several contact history entries to be linked. */
  followUpHistKey?: number
  /** Campaign code to which media is attached (formerly known as prospect_source) */
  campaignCode?: string
  /** Media code */
  mediaCode?: string
  contactType?: number
  /** 0=Open, 1=Followed Up, 9=Marked for deletion */
  status?: number
  /** file name */
  attachment?: string
  /** Unique system generated contact identifier.  This identifier is unique across all customer accounts. */
  contactKey?: number
  printCount?: number
  mergeAccount?: string
}
