/**
 * Categorisation of a product within a class
 */
export interface ProductGroup {
  /** Unique identifier of a classification */
  classCode: string
  /** Unique identifier of a group within a class */
  groupCode: string
  /** Name of a group */
  groupName: string
  /** Lowest group in a group hierachy. Group has no children. */
  terminateGroup?: number
  /** The group directly above this group in a group hierachy. */
  parentGroup?: string
  /** The user entering or last updating the record */
  changeUser?: string
  /** Date record was last updated */
  changeDate?: number
  /** 1 = Withdrawn from use, 0 = Not withdrawn */
  withdrawn?: number
  stugad?: string
  /** A class usage break point */
  abcBreakA?: number
  /** B Class usage break point */
  abcBreakB?: number
  /** C Class usage break point */
  abcBreakC?: number
  /** D Class usage break point */
  abcBreakD?: number
  /** 0 =exclude from group costing, 1= include in group costing */
  groupCosting?: number
  /** Allocation horizon days */
  horizonDays?: number
  /** Allocation horizon date */
  horizonDate?: number
  /** Date the allocation was updated */
  horizonUpdate?: number
  /** min profit margin percentage - if set to -1 use sysparam 43 */
  minMarginPercent?: number
  /** 1=exclude , 0=include */
  excludeCustDiscount?: number
  /** Price per tonne */
  pricePerTonne?: number
  /** Last user to update the price */
  priceChangeUser?: string
  /** Date price was last updated */
  priceChangeDate?: number
  /** Currency for price per tonne */
  priceCurrency?: string
  /** text storage reference number for special text */
  specialText?: number
  /** 1=web enabled */
  webEnabled?: number
  /** Reference to text storage table */
  commentsText?: number
  messageType?: number
  messageStartDate?: number
  messageEndDate?: number
}
