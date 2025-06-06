/**
 * Stock status codes
 */
export interface StockStatus {
  /** Uniquely identifies a stock status */
  stockStatus: string
  /** Description */
  description?: string
  /** 0=user defined,1=system def - user may use,2=system use only */
  system?: number
  /** Date record was last updated */
  changeDate?: number
  /** The user entering or last updating the record */
  changeUser?: string
  stugad?: string
  /** 0=exclude stock from average cost calculation,1=include */
  averageCostStatus?: number
  /** 1=include in replenishment; 0=exclude */
  replenishmentStatus?: number
  /** 1=include in stock valuation; 0=exclude */
  valuationStatus?: number
  /** 1=Include in stock counts 0=exclude from stock counts */
  countStatus?: number
  includeInDateavail?: number
}
