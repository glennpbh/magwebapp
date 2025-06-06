/**
 * Stores the level of stock in a physical location
 */
export interface Stock {
  /** Uniquely identifies a product */
  productCode: string
  /** Unique identifier of a warehouse */
  warehouseCode: string
  /** Unique identifier for a location within a warehouse */
  locationCode?: string
  /** Uniquely identifies a stock status */
  stockStatus?: string
  /** Uniquely identifies a batch */
  batchId?: string
  /** uniquely identifies a serial record within a product */
  serialNum?: string
  /** Cost of a single unit of stock */
  unitCost?: number
  /** Quantity in unit of document if available else in stock unit */
  quantity: number
  /** Date used for FIFO costing purposes */
  fifoDate?: number
  /** GRN, RMA num/item or stock movement depending on supply_type */
  sourceOfSupply?: string
  /** Date record was last updated */
  changeDate?: number
  /** The user entering or last updating the record */
  changeUser?: string
  stugad?: string
  /** 0=GRN number;1=RMA number;2=Stock movement;3=customer spec;4=manufactured */
  supplyType?: number
  /** Document number */
  salesDocumentNum?: number
  /** 0=Order; 1=Quote; 3=Works Order;  4=transfer 5=call off */
  orderType?: number
  /** Sales Order Item Number */
  salesItemNum?: number
  /** Picking list number - uniquely identifies a picking list */
  pickListNum?: number
  /** The date the goods are required by. */
  requiredDate?: number
  /** The date and time the item was picked. */
  pickTime?: number
  /** 1=Charges included,0=charges not included */
  includedCharges?: number
  /** Date stock was last revalued */
  revaluationDate?: number
  /** 0=Bonded stock  1=Duty paid stock */
  dutyPaid?: number
  /** Number of stock units in bulk unit (may differ from standard conversion rate) - eg bottles per case */
  bulkConversion?: number
  /** Unique identifier of a customer */
  customerAccount?: string
  /** Invoice register number */
  invoiceNumber?: number
  handlingId?: number
  stockSubstatus?: string
  handlingIdSize?: string
}
