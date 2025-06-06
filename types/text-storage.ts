/**
 * Stores text data
 */
export interface TextStorage {
  /** Unique identifier of a text storage record. */
  textNumber?: number
  /** Free format text data stored in a LONG column format */
  textData?: unknown
  /** Date record was last updated */
  changeDate?: number
  /** The user entering or last updating the record */
  changeUser?: string
  stugad?: string
}
