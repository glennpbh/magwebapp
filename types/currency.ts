/**
 * Currency details
 */
export interface Currency {
  /** Currency code */
  currencyCode: string
  /** The name describing a currency */
  currencyName?: string
  /** An abbreviation of a currency description */
  shortName?: string
  /** The user entering or last updating the record */
  changeUser?: string
  /** Date record was last updated */
  changeDate?: number
  /** number of decimal places to which unit prices are entered */
  unitDecPlace?: number
  /** Number of decimal places to which calculations are displayed */
  valueDecPlace?: number
  stugad?: string
  /** 1 = Withdrawn from use, 0 = Not withdrawn */
  withdrawn?: number
  /** The date the record was withdrawn from service */
  withdrawnDate?: number
  /** currency symbol e.g. $ */
  currencySymbol?: string
  /** text to describe currency values of one e.g. pound */
  unitSingular?: string
  /** Text to describe currency values greater than one e.g. pounds */
  unitPlural?: string
  /** text to describe currency values of one e.g. penny */
  decSingular?: string
  /** Text to describe currency values greater than one e.g. pence */
  decPlural?: string
  symbolPosition?: number
  /** Symbol to indicate decimal places eg full stop or comma */
  decSymbol?: string
  /** triangulation currency I.e. EURO */
  triangulationCurrency?: string
  /** 1=fixed exchange rate 0=variable exchange rate */
  fixedRate?: number
  /** Langdon currency code */
  langdonCurrency?: string
  vatLineRule?: number
  vatTotalRule?: number
  vatDecimals?: number
  vatPrecision?: number
}
