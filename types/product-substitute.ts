/**
 * Product which may be used as an alternative.
 */
export interface ProductSubstitute {
  /** Uniquely identifies a product */
  productCode?: string
  /** Product code which is an alternative to the required product */
  substituteProduct?: string
  /** Order of choice for substitutes (1=first choice)
   */
  sequenceNum?: number
  stugad?: string
  /** The user entering or last updating the record */
  changeUser?: string
  /** Date record was last updated */
  changeDate?: number
  /** 1=product may be substituted in sales order entry, 0=product may not be substituted in SOE
   */
  salesSubstitute?: number
  /** 1=product may be substituted by allocation, 0=product may not be substituted by allocation
   */
  stockSubstitute?: number
}
