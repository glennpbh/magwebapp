/**
 * Product prices comprising a price list
 */
export interface ProductPrice {
  /** Unique identifier of a price list */
  priceList: string
  /** Uniquely identifies a product */
  productCode: string
  /** Uniquely identifies a unit (Pricing Unit) */
  unitCode: string
  /** Prices apply upto and including this quantity. */
  quantityBreak: number
  /** First discount/surcharge percentage */
  discountPerc1?: number
  /** 0=Net price, 1=standard price, 2=standard cost, 3=supplier_cost,4=manual,5=average cost, 6=VPA
   */
  priceBasis: number
  /** Price net of VAT (document currency) */
  netPrice?: number
  /** Date record was last updated */
  changeDate?: number
  /** The user entering or last updating the record */
  changeUser?: string
  stugad?: string
  /** 0=Product, 1=product group */
  codeType?: number
  /** Currency code */
  currencyCode?: string
  /** 0=no warning 1=warn if price list and order currency differ */
  neutralCurrency?: number
  /** Uniquely identifies a supplier */
  supplierAccount?: string
  /** 0=product to be priced in price unit,1=price in any unit */
  anyPriceUnit?: number
  /** 1=combination pricing applies 0=no combination pricing */
  combinationPricing?: number
  combinationQuantity?: number
  /** Minimum margin percentage */
  minMarginPercent?: number
  /** Discount percentage. Zero if row created from product price agreement; where it will use the COST instead. */
  costDiscount?: number
  /**  Cost per document unit */
  cost?: number
  /** Suppliers currency in which the cost is entered. Only present if COST is non-zero. */
  costCurrency?: string
  /**  Quote reference */
  quoteReference?: string
  /**  End of range/time */
  endDate?: number
  /**  Unique identifier of a text storage record. */
  textNumber?: number
  /** Number of bonus points that can be earned by buying this product from this price list in the pricing unit and quantity break specified. */
  bonusEarned?: number
  /** Number of bonus points required to obtain this product for free from this price list in the pricing unit and quantity break specified. */
  bonusRedeemed?: number
  /** Used to store a catalogue page number for the purpose of analysing sales statistics */
  trackingCode?: string
  /** 1=exempt 0=not exempt */
  exempt?: number
  /** Discount or surcharge in value of the sum of component prices. */
  discountValue?: number
  startDate?: number
  expiryDate?: number
  discountType?: number
  manuallyUpdated?: number
  previousQuantityBreak?: number
}
