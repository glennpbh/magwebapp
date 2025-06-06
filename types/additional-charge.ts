/**
 * Additional charges applicable to a sales order
 */
export interface AdditionalCharge {
  /** Document number */
  salesDocumentNum?: number
  /** 0=Order;1=Quote 5=call off */
  orderType?: number
  /** Uniquely identifies a Sales Order Invoice */
  soInvoiceNum?: number
  /** Identifies a despatch */
  despatchNum?: number
  /** Cost per document unit */
  cost: number
  /** 0=Original charge from order, 1=charged, 2=Original charge over ridden by despatch */
  status: number
  /** Description */
  description?: string
  /** Charge code */
  chargeCode?: string
  /** Posting group 1 */
  postingGroup_1?: string
  /** Posting group for accounts interface */
  postingGroup_2?: string
  /** Posting group for accounts interface */
  postingGroup_3?: string
  /** Posting group for accounts interface */
  postingGroup_4?: string
  /** Posting group for accounts interface */
  postingGroup_5?: string
  /** Posting group for accounts interface */
  postingGroup_6?: string
  /** Posting group for accounts interface */
  postingGroup_7?: string
  /** Posting group for accounts interface */
  postingGroup_8?: string
  /** Posting group for accounts interface */
  postingGroup_9?: string
  /** Account within financial system used for posting */
  postingAccount?: string
  /** The user entering or last updating the record */
  changeUser?: string
  /** Date record was last updated */
  changeDate?: number
  stugad?: string
  /** VAT code */
  vatCode?: string
  /** Uniquely identifies a despatch type */
  despatchType?: string
  /** Value of default charge */
  defaultValue?: number
  /** 1=VAT inclusive 0=VAT exclusive */
  vatInclusive?: number
  /** VAT amount */
  vatAmount?: number
  /** The promotional price list used on this charge. */
  promotionCode?: string
  /** 1=This charge/discount is the result of a promotion 0=not a promotion */
  promotion?: number
  /** Vat amount in base currency */
  baseVatAmount?: number
  /** Cost in base currency */
  baseCost?: number
  /** charge identifier */
  chargeNum?: number
  netLineValue?: number
  percentage?: number
  baseNetLineValue?: number
  carrierCode?: string
  deliveryGroup?: number
  actualPercent?: number
  ediFixed?: number
  salesTax?: number
  salesTaxId?: number
  /** Used when Charge split over multiple rows */
  chargeGroup?: number
  linkedSoNum?: number
}
