/**
 * Sales office
 */
export interface SalesPoint {
  /** Unique identifier of a sales office */
  salesOffice: string
  /** Sales office name */
  officeName: string
  /** Name of the individual responsible for credit control */
  creditController?: string
  /** The user entering or last updating the record */
  changeUser?: string
  /** Date record was last updated */
  changeDate?: number
  /** First line of address */
  address1?: string
  /** Second line of address */
  address2?: string
  /** third line of an address */
  address3?: string
  /** fourth line of address */
  address4?: string
  /** Fifth line of address */
  address5?: string
  /** Sixth line of address */
  address6?: string
  /** Primary address line number for outputting onto reports */
  primeAddressLine?: number
  stugad?: string
  /** Telephone Number */
  telephone?: string
  /** FAX number */
  fax?: string
  /** Redundant field - do not use */
  telex?: string
  /** Postcode */
  postcode?: string
  /** Default price list for a sales office -Relates to PRICE_LIST */
  defaultPriceList?: string
  /** Unique identifier of a text storage record. */
  textNumber?: number
  /** Price list */
  guidePriceList?: string
  /** A division used to group sales offices */
  salesDivision?: string
  /** Unique identifier of a country */
  countryCode?: string
  /** Description */
  description?: string
  /** 1=trade counter  0=non-trade counter */
  tradeCounter?: number
  /** 1 = Withdrawn from use, 0 = Not withdrawn */
  withdrawn?: number
  /** The date the record was withdrawn from service */
  withdrawnDate?: number
  /** Movement type used to issue the item of stock from stores. */
  issueType?: string
  /** Product code */
  welcomePackProduct?: string
  /** Contact action */
  welcomeAction?: string
  /** product code */
  reminderPackProduct?: string
  /** Contact action */
  reminderAction?: string
  /** Number of days until reminder action invoked */
  reminderPeriod?: number
  /** 1=internat office */
  internetOffice?: number
  email?: string
  ipAddress?: string
  invoiceConsolidation?: number
  salesMinMargin?: number
  multiShipmentDays?: number
  welcomePackOption?: number
  advertisingPackProduct?: string
  advertisingPackAction?: string
  advertisingPackPeriod?: number
  advertisingPackOption?: number
  suppressOrderRef?: number
}
