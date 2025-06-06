/**
 * Record of products that have been superseded
 */
export interface ProductSupersession {
  /** Product code */
  productCode: string
  /** Product which this item supersedes */
  supersedingProduct?: string
  /** Latest product */
  topSupersedingProduct?: string
  /** Product which has superseded this item */
  supersededProduct?: string
  /** Date of supersession */
  supersessionDate?: number
  /** The user entering or last updating the record */
  changeUser: string
  /** Date record was last updated */
  changeDate: number
}
