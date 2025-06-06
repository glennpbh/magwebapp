/**
 * Components of a kit on a sales order
 */
export interface SalesPartsList {
  /** Document number */
  salesDocumentNum?: number
  /** Sales Order Item Number */
  salesItemNum?: number
  /** 0=Order; 1=Quote; 3=Works Order;  4=transfer 5=call off */
  orderType?: number
  /** Uniquely identifies a product */
  productCode?: string
  /** Identifies a product which is part of the main product */
  partCode?: string
  /** Required quantity based in sales pricing units */
  salesRqdQuantity?: number
  parentAssembly?: number
  /** part of unique id for sub assembly */
  assemblyCount?: number
  /** Pro-rata component price */
  price?: number
  /** Component margin in percentage */
  margin?: number
}
