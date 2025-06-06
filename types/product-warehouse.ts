/**
 * A product which may be stored in a warehouse
 */
export interface ProductWarehouse {
  /** Unique identifier of a warehouse */
  warehouseCode: string
  /** Uniquely identifies a product */
  productCode: string
  /** Obsolete column - now in view_free_stock */
  allocatedQuantity: number
  /** Obsolete column - now in view_free_stock  */
  storesStock: number
  /** The user entering or last updating the record */
  changeUser: string
  /** Date record was last updated */
  changeDate: number
  stugad?: string
  /** Average daily useage */
  adu: number
  /** Location from which an item was picked */
  pickingLocation?: string
  /** The date the record was withdrawn from service */
  withdrawnDate?: number
  /** 1 = Withdrawn from use, 0 = Not withdrawn */
  withdrawn: number
  /** Temporary allocated quantity */
  tempAllocated?: number
  /** Determines the ease of access to the location */
  abcClass?: string
  /** Alpha smoothing factor */
  alphaFactor?: number
  /** Single smoothing factor quantity */
  singleSmoothQty?: number
  /** Double smoothed quantity */
  doubleSmoothQty?: number
  /** Update alpha factor */
  updateAlphaFact?: number
  /** Cost of last unit of stock received into warehouse */
  lastInCost?: number
  /** Date of last stock count */
  lastCountDate?: number
  /** 1= Frozen for stock counting 0 = Not frozen */
  frozen: number
  /** Number of days for forecast horizon */
  forecastHorizon?: number
  /** Quantity due in excluding back to backs and directs */
  dueInBalance?: number
  /** Average unit cost per stock unit */
  averageCost?: number
  /** 0=No stock contention,1=stock contention */
  contention?: number
  /** Qty allocated to back to back order */
  allocatedToBack?: number
  /** Location code for repair items */
  repairLocation?: string
  /** Location code for reject items */
  rejectLocation?: string
  /** Buffer Stock quantity, in stock units */
  bufferStockQty?: number
  /** Buffer Stock number of days */
  bufferStockDays?: number
  /** Buffer Stock quantity is calculated from days x ADU (=0), or is held as quantity (=1) */
  bufferStockInd?: number
  /** Re-order Point quantity, in stock units : reorder when stock falls below this quantity  */
  reorderPointQty?: number
  /** Re-order Point number of days  */
  reorderPointDays?: number
  /** Reorder Point quantity is calculated from days x ADU (=0), or is held as quantity (=1) */
  reorderPointInd?: number
  /** Re-order To quantity, in stock units : reorder upto this quantity */
  reorderQuantity?: number
  /** Re-order To number of days  */
  reorderDays?: number
  /** Re-order To quantity is calculated from days x ADU (=0), or is held as quantity (=1) */
  reorderInd?: number
  /** Annual stock turns */
  stockTurns?: number
  /** Average daily usage recalculated */
  aduRecalc?: number
  /** Date average daily usage last calculated */
  aduRecalcDate?: number
  /** 1=supplier 2=manufacturing 3=warehouse */
  replenishFrom?: number
  /** warehouse used for replenishment */
  replenFromWhse?: string
  /** Minimum transfer quantity - stock units */
  minXferQty?: number
  /** Obsolete */
  reorderFrom?: string
  /** Time to transfer stock in days */
  whseTransferTime?: number
  /** Transfers must be in multiples of this quantity */
  xferMultipleQty?: number
  /** Bulk Location code */
  bulkPick?: string
  aduRecalcDays?: number
  innerLocation?: string
  smegSerialOnIssue?: number
}
