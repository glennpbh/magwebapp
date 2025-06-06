/**
 * Contact source
 */
export interface ContactSource {
  /** Unique identifier of a customer */
  customerAccount: string
  /** 0=customer ; 1= prospect */
  prospectCustType: number
  /** Customer contact identified */
  contactId: number
  /** Defines a prospect source from prospect source table */
  prospectSource?: string
  /** Date/time of contact */
  contactDate?: number
  /** Date record was last updated */
  changeDate?: number
  /** The user entering or last updating the record */
  changeUser?: string
  /** Campaign code to which media is attached (formerly known as prospect_source) */
  campaignCode?: string
  /** Media code */
  mediaCode?: string
  /** 0 = initial action, 2 = sales order received */
  status?: number
  /** Unique identifier of a customer contact */
  contactKey?: number
  mergeAccount?: string
}
