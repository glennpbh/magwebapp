/**
 * Details of parts required to comprise another product
 */
export interface PartsList {
  /** Uniquely identifies a product */
  productCode: string
  /** Identifies a product which is part of the main product */
  partCode: string
  /** Quantity in unit of document if available else in stock unit */
  quantity: number
  /** The user entering or last updating the record */
  changeUser?: string
  /** Date record was last updated */
  changeDate?: number
  stugad?: string
}
