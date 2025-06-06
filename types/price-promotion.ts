/**
 * Price list promotions
 */
export interface PricePromotion {
  /**  Unique identifier of a price list */
  priceList: string
  /** Unique code within this price list by which the promotion is identified. */
  promotionCode: string
  /**  The description of a code or, text regarding a record. */
  description?: string
  /** 0  Order level promotion; 1= 1  Product level promotion */
  promotionType: number
  /**  The starting date/time */
  startDate?: number
  /**  End of range/time */
  endDate?: number
  /** For a product level promotion; the number of items that have to be purchased from the qualifying list of products in order to receive something out of the promotional list of products. */
  qualifyingQuantity?: number
  /** Promotion quantity */
  promotionQuantity?: number
  /**  Unique identifier of a text storage record. */
  textNumber?: number
  /**  The user entering or last updating the record */
  changeUser: string
  /** Date record was last updated */
  changeDate: number
  /**  1 = Withdrawn from use, 0 = Not withdrawn */
  withdrawn?: number
  /**  The date the record was withdrawn from service */
  withdrawnDate?: number
  /** Order value threshold.  */
  valueThreshold?: number
  /** The tolerance percentage.  */
  tolerance?: number
  /** Specifies whether this is an optional order promotion. 1- Optional; 0  Mandatory (default). */
  optional?: number
  /**  Charge code */
  chargeCode?: string
  /**  Uniquely identifies a despatch type */
  despatchType?: string
  /**  Charge to be made */
  charge?: number
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
  /** The total price of a product level promotion. */
  totalPrice?: number
  /** The total bonus points earned on a product level promotion. */
  totalEarned?: number
  /** The total bonus points redeemed on a product level promotion. */
  totalRedeemed?: number
  /** 1=exempt 0=not exempt */
  exempt?: number
}
