/**
 * Pick/Desp item detail-all costs/prices in sales currency
 */
export interface PickDespatchItem {
  /** Picking list number - uniquely identifies a picking list */
  pickListNum?: number
  /** The date and time the item was picked. */
  pickTime?: number
  /** Unique identifier of a warehouse */
  warehouseCode?: string
  /** Document number */
  salesDocumentNum?: number
  /** Sales Order Item Number */
  salesItemNum?: number
  /** 0=Order; 1=Quote; 3=Works Order;  4=transfer 5=call off */
  orderType?: number
  /** Purchase order number (used on sales requirement table) */
  poOrderNumber?: number
  /** purchase item number (only used in sales_requirement table) */
  poItemNumber?: number
  /** Uniquely identifies a Sales Order Invoice */
  soInvoiceNum?: number
  /** 0=Non stock despatch, 1=Being Picked, 2=Picked, 3=Despatched, 4=Invoiced, 5= Delivered, 6=Cancelled 7=issued W.O. order component; 8=complete W.O.; 9=built and despatched worksorder; 10=complete W.O. */
  status?: number
  /** Uniquely identifies a product */
  productCode?: string
  /** The date the goods are required by. */
  requiredDate?: number
  /** Delivery date */
  deliveryDate?: number
  /** Date record was last updated */
  changeDate?: number
  /** The user entering or last updating the record */
  changeUser?: string
  /** 0=update required, 1=updated, 2=no update of sales demand */
  demandUpdate?: number
  stugad?: string
  /** unique identifier for delivery terms */
  deliveryTerm?: string
  /** Quantity to be picked- stock units */
  targetQuantity?: number
  /** Actual quantity picked - stock units */
  actualQuantity?: number
  /** despatch quantity in pricing units */
  despatchQuantity?: number
  /** Identifies a despatch */
  despatchNum?: number
  /** Gross price  (before discount/surcharge) per pricing unit in document currency */
  unitPrice?: number
  /** cost of a single unit of stock in pricing unit */
  unitCost?: number
  /** Uniquely identifies a unit (Pricing Unit) */
  unitCode?: string
  /** Percentage discount. */
  discountPerc?: number
  /** VAT code */
  vatCode?: string
  /** VAT amount */
  vatAmount?: number
  /** Unique identifier of a text storage record. */
  textNumber?: number
  /** Number of packages within a goods receipt */
  packageQuantity?: number
  package?: string
  /** First marks and numbers field */
  marks_1?: string
  /** 2nd Marks an numbers field */
  marks_2?: string
  /** Detailed description  (first line) */
  longDescription_1?: string
  /** Detailed description of a product (second line) */
  longDescription_2?: string
  /** Original promise date */
  firstPromise?: number
  /** Current promise delivery date */
  promiseDate?: number
  /** Number of updates to the promised date */
  numPromiseUpdates?: number
  /** name of kit for which item is a component (if any) */
  kitProductCode?: string
  grossCost?: number
  /** 0=no substitution,1=Allow substitution,2=Already substituted */
  autoSubstitution?: number
  averageCost?: number
  associate?: number
  orderDespatchQuantity?: number
  /** Cost per unit prior to disc/surch. in document units */
  orderUnit?: string
  netPrice?: number
  baseNetPrice?: number
  /** Warehouse transfer number */
  transferNumber?: number
  /** Average unit cost per stock unit */
  grnOrderSequence?: number
  /** 0=no line assoc. else sequential no. for each group of items */
  worksInvoiceNum?: number
  /** Despatch quantity in sales units */
  lineWeight?: number
  /** Unit in which the order has been placed */
  routeId?: string
  /** price per pricing unit after discount/surcharge in document currency */
  transportCharge?: number
  /** Net price in system base currency (pricing unit) */
  messageEntryTime?: number
  /** Warehouse transfer number */
  retroDiscountPerc?: number
  /** Sequence on which items were added to GRN */
  vatInclusive?: number
  registerNumber?: number
  /** Order line weight */
  dutyPaid?: number
  /** Delivery route identifier */
  intrastatStatus?: number
  /** Transport Charge */
  intrastatPeriod?: number
  intrastatDivision?: string
  /** Retrospective rebate percentage */
  sequenceNum?: number
  /** 1=VAT inclusive 0=VAT exclusive */
  netLineValue?: number
  dfailReasonCode?: string
}
