/**
 * Price list for a product group/customer group combination
 */
export interface PriceMatrix {
  /** Together with the system parameter class identifies a group */
  productGroup?: string
  /** Together with the system parameter class identifies a group */
  customerGroup: string
  /** Unique identifier of a price list */
  priceList: string
  /** Date record was last updated */
  changeDate?: number
  /** The user entering or last updating the record */
  changeUser?: string
  stugad?: string
  /** Guide proice list code */
  guidePriceList?: string
}
