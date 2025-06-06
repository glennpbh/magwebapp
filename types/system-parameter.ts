/**
 * System wide parameters regarding user organisation
 */
export interface SystemParameter {
  /** Uniquely identifies a system or report parameter */
  parameterNum: number
  /** Name of the system parameter */
  parameterName: string
  /** Number; string or date (NUM, STR, DAT) */
  dataType: string
  /** Actual value of a numeric or date parameter eg VAT number */
  numericValue?: number
  /** Actual value of a character parameter eg Company name */
  stringValue?: string
  /** Minimum value or number of characters. */
  minimum?: number
  /** Maximum value or number of characters. */
  maximum?: number
  /** Indicates the number of decimal places used */
  decimalPlaces?: number
  /** Date record was last updated */
  changeDate?: number
  /** The user entering or last updating the record */
  changeUser?: string
  stugad?: string
  /** Detailed description  (first line) */
  longDescription_1?: string
  /** 0=user may update; 1=only MANCOS may update;2=not shown */
  userUpdateable?: number
  /** Used to give a sort sequence for system parameters */
  parameterType?: string
  /** Used to order parameters in system parameter display */
  parameterSequence?: number
  /** 1=Always reread parameter, 0 = read once only */
  alwaysRead?: number
}
