/**
 * Used to display next promise date within sales order entry
 */
export interface ProductWarehousePromdate {
  /** Product Code */
  productCode: string
  /** Warehouse code */
  warehouseCode: string
  /** Delivery promise date */
  promisedDate?: number
  /** Date record was last updated */
  changeDate?: number
  /** The user entering or last updating the record */
  changeUser?: string
}
