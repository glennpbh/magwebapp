/**
 * Segments comprising a user defined field
 */
export interface FieldSegment {
  /** User defined field entity */
  entityName: string
  /** User defined field name */
  fieldName: string
  /** segment identifier */
  segmentId: number
  /** number of characters */
  segmentLength: number
  validationType: number
  formatMask?: string
  /** Default value */
  defaultValue?: string
  /** The user entering or last updating the record */
  changeUser: string
  /** Date record was last updated */
  changeDate: number
}
