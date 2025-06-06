/**
 * Segments comprising a product code
 */
export interface ProductFormat {
  /** Uniquely defines a segment */
  segmentNum?: number
  /** The number of characters comprising a segment */
  segmentLength?: number
  /** Indicates special character for segment */
  specialCharacter?: string
  /** Indicates whether validation of the segment is required */
  validation?: number
  /** Required format for a segment */
  characterMask?: string
  /** The user entering or last updating the record */
  changeUser?: string
  /** Date record was last updated */
  changeDate?: number
  stugad?: string
  /** 0=product code, 1-6 relate to the product keys. */
  keyNumber?: number
  /** Product key name */
  keyName?: string
  /** 0=not inuse,1=in use but optional, 2 = in use and mandatory */
  keyInUse?: number
  productIdKey?: number
}
