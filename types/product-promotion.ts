/**
 * Products included on a price promotion
 */
export interface ProductPromotion {
  /**  Unique identifier of a price list */
  priceList: string
  /** Unique identifier of a promotion */
  promotionCode: string
  /**  1=sales order; 2=invoices; 3= credit notes */
  type: number
  /**  Uniquely identifies a product */
  productCode?: string
  /**  Quantity in unit of document if available else in stock unit */
  quantity?: number
  /** The price that the product will be received at in the main pricing unit if the promotions requirements are met. */
  price?: number
  /**  Price unit */
  priceUnit?: string
  /** The quantity unit is the default sales order unit for this product. */
  salesUnit?: string
  /**  The user entering or last updating the record */
  changeUser: string
  /** Date record was last updated */
  changeDate: number
  /** Number of bonus points that can be earned by buying this product as part of this promotion.  */
  bonusEarned?: number
  /** Number of bonus points required to obtain this product for free from as part of this promotion. */
  bonusRedeemed?: number
  /** 1=exempt 0=not exempt */
  exempt?: number
  equivalentQuantity?: number
  groupCode?: string
}
