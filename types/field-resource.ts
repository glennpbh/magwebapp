/**
 * Tools tips displayed against user defined fields
 */
export interface FieldResource {
  resourceId: number
  /** Language identifier */
  languageId: number
  resourceText: string
  /** The user entering or last updating the record */
  changeUser: string
  /** Date record was last updated */
  changeDate: number
}
