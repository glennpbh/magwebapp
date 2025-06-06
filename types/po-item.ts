/**
 * Details of items to be included in an order
 */
export interface PoItem {
  /** Unique identifier of a purchase order */
  orderNumber: number
  /** Uniquely defines an item within a document */
  itemNumber: number
  /** Uniquely identifies a supplier */
  supplierAccount: string
  /** Unique identifier of a warehouse */
  warehouseCode?: string
  /** 0= Non-direct; 1 = Deliver direct to customer */
  directIndicator?: number
  /** Uniquely identifies a product */
  productCode: string
  /** Quantity required based in pricing unit */
  requiredQuantity?: number
  /** Received quantity based in pricing unit */
  receivedQuantity?: number
  /** Uniquely identifies a unit (Pricing Unit) */
  unitCode?: string
  /** Cost per unit prior to disc/surch. in document units */
  grossCost?: number
  /** The date the goods are required by. */
  requiredDate?: number
  /** First discount/surcharge percentage */
  discountPerc1?: number
  /** Second discount/surcharge percentage */
  discountPerc2?: number
  /** Third discount/surcharge percentage */
  discountPerc3?: number
  /** Fourth discount/surcharge percentage */
  discountPerc4?: number
  /** 0=Open, 1=Cancelled, 2=Complete */
  status?: number
  /** Current promise delivery date */
  promiseDate?: number
  /** Unique identifier of a text storage record. */
  textNumber?: number
  /** Identifies a blanket order */
  blanketItemNum?: number
  /** Number of times item has been printed */
  printNumber?: number
  /** 0 = Send document, 1 = Do not send document */
  sendRequired?: number
  /** Number of copies printed */
  printCount?: number
  /** Detailed description  (first line) */
  longDescription_1?: string
  /** Detailed description of a product (second line) */
  longDescription_2?: string
  /** The user entering or last updating the record */
  changeUser?: string
  /** Date record was last updated */
  changeDate?: number
  /** Original promise date */
  firstPromise?: number
  /** Number of promise updates */
  promiseUpdates?: number
  /** Gross cost in base currency */
  baseGrossCost?: number
  /** Quantity in ordered units */
  orderRequired?: number
  /** Received quantity in ordered units */
  orderReceived?: number
  /** Unit in which the order has been placed */
  orderUnit?: string
  /** 1=Retro rebate available , 0 = retro rebate not applicable */
  retroRebate?: number
  /** Discount value for bulk purchase */
  bulkDiscount?: number
  /** 0= No bulk discount  1=bulk discount */
  bulkDiscountInd?: number
  /** Price net of discount in purchase order currency
   */
  netPrice?: number
  /** Net price in system base currency (pricing unit) */
  baseNetPrice?: number
  /** Order line weight */
  lineWeight?: number
  /** Uniquely identifies a batch */
  batchId?: string
  /** Batch reference (free text) */
  batchReference?: string
  shipmentNum?: string
  availableDate?: number
}
