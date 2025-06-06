/**
 * Item despatch details
 */
export interface SalesRequirement {
  /** Document number */
  salesDocumentNum: number
  /** Sales Order Item Number */
  salesItemNum: number
  /** Unique identifier of a warehouse */
  warehouseCode?: string
  /** The date the goods are required by. */
  requiredDate?: number
  /** The expected date of the next despatch */
  expectedDespatch?: number
  /** Quantity of stock allocated (based in stock units) */
  allocatedQuantity?: number
  /** Purchase order number (used on sales requirement table) */
  poOrderNumber?: number
  /** purchase item number (only used in sales_requirement table) */
  poItemNumber?: number
  /** Uniquely identifies a requisition. */
  requisitionNum?: number
  /** Date record was last updated */
  changeDate?: number
  /** The user entering or last updating the record */
  changeUser?: string
  /** Uniquely identifies a product */
  productCode?: string
  /** Required quantity based in sales pricing units */
  salesRqdQuantity?: number
  /** Required quantity converted into stocking units */
  stockRqdQuantity?: number
  /** 0=Order; 1=Quote; 3=Works Order;  4=transfer 5=call off */
  orderType?: number
  /** 0=update required, 1=updated, 2=no update of sales demand */
  demandUpdate?: number
  /** 0=Open outside of allocation horizon, 1=100% allocated, 2=Within allocation horizon but not fully allocated or direct delivery */
  status?: number
  /** Original promise date */
  firstPromise?: number
  /** Current promise delivery date */
  promiseDate?: number
  /** Number of updates to the promised date */
  numPromiseUpdates?: number
  /** part of unique id for sub assembly */
  assemblyCount?: number
  /** Kit product  */
  kitProductCode?: string
  /** 0=no substitution,1=Allow substitution,2=Already substituted */
  autoSubstitution?: number
  /** 0=not main product,1=main product -for item line association */
  mainProduct?: number
  /** 0=no line assoc. else sequential no. for each group of items */
  associate?: number
  /** Quantity in sales order units */
  orderQuantity?: number
  /** Warehouse transfer number */
  transferNumber?: number
  /** Qty allocated to back to back order */
  allocatedToBack?: number
  grossCost?: number
  substituteAlertSent?: number
  allocatedDate?: number
  stockSubstatus?: string
  stockRestrict?: number
}
