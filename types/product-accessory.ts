/**
 * Accessory product
 */
export interface ProductAccessory {
  /** Uniquely identifies a product */
  productCode?: string
  /** accessory product code */
  accessoryProduct?: string
  /** Sequence number completes a key to a table. */
  sequenceNum?: number
  /** The user entering or last updating the record */
  changeUser?: string
  /** Date record was last updated */
  changeDate?: number
  /** 1=mandatory 0=optional */
  mandatoryOptional?: number
  /** 1=one accessory per order 0=one accessory per main product orders */
  quantityOne?: number
}
