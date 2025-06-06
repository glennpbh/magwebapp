/**
 * Charge categories
 */
export interface ChargeCode {
  /** 0=Sales charge, 1= Purchase charge, 2=Sales discounts */
  salesPurchase: number
  /** Charge code */
  chargeCode: string
  /** Description */
  description?: string
  /** Value of default charge */
  defaultValue?: number
  /** Default percent charged */
  defaultPercent?: number
  /** 0= not fixed, 1= fixed */
  fixedCharge?: number
  /** 0 = not fixed, 1= fixed */
  fixedDescription?: number
  /** The user entering or last updating the record */
  changeUser?: string
  /** Date record was last updated */
  changeDate?: number
  stugad?: string
  /** 0=Active, 1=Not for use in Sales Order Entry or Despatch,2=Withdrawn */
  status?: number
  /** 0=do not amortise; 1=by weight; 2= by volume; 3= by value */
  amortise?: number
  /** VAT code */
  vatCode?: string
  /** 1=supplier related, 0 = not supplier related */
  supplierRelated?: number
  thresholdValue?: number
  bandedChargeType?: number
}
