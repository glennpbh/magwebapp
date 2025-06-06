/**
 * User defined classes for products
 */
export interface ProductClass {
  /** Name of classification.. */
  className?: string
  /** 0 = Optional; 1 = Mandatory - a group must always be entered */
  mandatoryClass?: number
  /** The user entering or last updating the record */
  changeUser?: string
  /** Date record was last updated */
  changeDate?: number
  /** Unique identifier of a classification */
  classCode?: string
  /** 1 = Withdrawn from use, 0 = Not withdrawn */
  withdrawn?: number
  stugad?: string
  /** 1=maximum number of groups exceeded */
  maxGroupsExceeded?: number
  bi?: number
}
