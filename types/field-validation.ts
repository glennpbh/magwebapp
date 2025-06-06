/**
 * Validation table for user defined fields.
 */
export interface FieldValidation {
  /** User defined field entity */
  entityName: string
  /** User defined field name */
  fieldName: string
  /** segment identifier */
  segmentId: number
  /** sequence */
  sequenceNo: number
  value: string
  /** The user entering or last updating the record */
  changeUser: string
  /** Date record was last updated */
  changeDate: number
  /** description */
  description?: string
}
