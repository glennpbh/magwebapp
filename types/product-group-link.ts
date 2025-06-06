/**
 * Each product may belong to more than one group
 */
export interface ProductGroupLink {
  /** Uniquely identifies a product */
  productCode: string
  /** Unique identifier of a group within a class */
  groupCode: string
  /** The user entering or last updating the record */
  changeUser?: string
  /** Date record was last updated */
  changeDate?: number
  /** Unique identifier of a classification */
  classCode: string
  stugad?: string
}
