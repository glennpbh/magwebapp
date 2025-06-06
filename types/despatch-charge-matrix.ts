export interface DespatchChargeMatrix {
  /** Identifier of a Sales Office */
  salesOffice?: string
  /** Identifier of a Media Source */
  mediaCode?: string
  /** Currency Code */
  currencyCode?: string
  /** Identifier of a Despatch Type */
  despatchType?: string
  /** Value of Default Charge */
  defaultCharge?: number
}
