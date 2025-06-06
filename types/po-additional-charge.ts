/**
 * Additional charges on purchase orders
 */
export interface PoAdditionalCharge {
  /** Uniquely defines an item within a document */
  itemNumber?: number
  /** Unique identifier of a purchase order */
  orderNumber?: number
  /** 0=standard; 1=blanket; 2=back to back */
  orderType?: number
  /** Charge code */
  chargeCode?: string
  /** Description */
  description?: string
  /** Cost per document unit */
  cost: number
  /** 1=cost applied; 0=cost not yet applied */
  costApplied: number
  /** Percentage */
  percent: number
  /** Percentage of cost applied */
  percCostApplied: number
  /** 0=Open, 1=Charged */
  status: number
  /** 1=supplier related, 0 = 3rd party supplier */
  supplierRelated?: number
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
  /** supplier account of third party supplier */
  thirdPartySupplier?: string
  /** Currency code - only used for 3rd party supplier charges */
  currencyCode?: string
  /** Cost in base currency */
  baseCost?: number
  /** Base currency cost applied to goods receipts */
  baseCostApplied?: number
}
