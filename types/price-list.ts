/**
 * Price list header
 */
export interface PriceList {
  /** Unique identifier of a price list */
  priceList: string
  /** Currency code */
  currencyCode?: string
  /** 1 = Withdrawn from use, 0 = Not withdrawn */
  withdrawn?: number
  /** The date the record was withdrawn from service */
  withdrawnDate?: number
  /** Date record was last updated */
  changeDate?: number
  /** The user entering or last updating the record */
  changeUser?: string
  stugad?: string
  /** Description */
  description?: string
  /** 0 = price by product, 1= price by product group */
  listType?: number
  /** 1=VAT inclusive 0=VAT exclusive */
  vatInclusive?: number
  /** Default minimum margin percentage */
  minMarginDefault?: number
  /** 1; limit web sales; or 0; do not limit web sales */
  limitWebSales?: number
  /**  Unique identifier of a text storage record. */
  textNumber?: number
  /**  1st prospect key - a means of categorising prospects */
  definedKey1?: string
  /**  2nd prospect key - a means of categorising prospects */
  definedKey2?: string
  /**  3rd prospect key - a means of categorising prospects */
  definedKey3?: string
  /**  4th prospect key - a means of categorising prospects */
  definedKey4?: string
  /** Fifth defined field  */
  definedKey5?: string
  /** Sixth defined field  */
  definedKey6?: string
  /** 1=exempt 0=not exempt */
  exempt?: number
  startDate?: number
  expiryDate?: number
  amendable?: number
  thisCurrencyOnly?: number
  exemptFromDiscount?: number
  cataloguePageSize?: number
}
