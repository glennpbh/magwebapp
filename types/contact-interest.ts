/**
 * Customer/Prospect area of interest
 */
export interface ContactInterest {
  /** Prospect reference or customer account */
  prospectCustomer: string
  /** Customer contact identified */
  contactId: number
  /** 0=customer ; 1= prospect */
  prospectCustType: number
  /** product interest */
  interestCode: string
  /** Free format text */
  commentText?: string
  /** Date record was last updated */
  changeDate?: number
  /** The user entering or last updating the record */
  changeUser?: string
  /** unique contact identifier */
  contactKey?: number
}
