/**
 * Sales offices may be grouped into divisions
 */
export interface SalesDivision {
  /** A division used to group sales offices */
  salesDivision?: string
  /** Date record was last updated */
  changeDate?: number
  /** The user entering or last updating the record */
  changeUser?: string
  /** Description */
  description?: string
  /** Product class holding minimum margin % */
  marginClass?: string
  /** Minimum profit margin allowed in SOE */
  minimumMargin?: number
  /** 0=prep sheet not required, 1= prep sheet required */
  prepSheetRequired?: number
  /** address line */
  address1?: string
  /** address line */
  address2?: string
  /** address line */
  address3?: string
  /** address line */
  address4?: string
  /** address line */
  address5?: string
  /** address line */
  address6?: string
  /** post code */
  postcode?: string
  /** country code */
  country?: string
  /** telephone */
  telephone?: string
  /** prime address line */
  primeAddressLine?: number
  /** date of last intrastat run */
  intrastatRun?: number
  /** VAT registration number */
  vatRegNum?: string
  /** 1="To Follow" message printed on despatch note, 0=No message printed */
  printToFollow?: number
  email?: string
  distanceSelling?: number
  validityPeriod?: number
  quickAddressInUse?: number
  address1QaElement?: number
  address2QaElement?: number
  address3QaElement?: number
  address4QaElement?: number
  address5QaElement?: number
  address6QaElement?: number
  quotationValid?: number
}
