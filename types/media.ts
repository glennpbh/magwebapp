/**
 * Means of providing a customer with a catalogue.
 */
export interface Media {
  /** Uniquely identifies a media source */
  mediaCode: string
  /** Description */
  description: string
  /** User definable field */
  definedKey1?: string
  /** User definable field */
  definedKey2?: string
  /** User definable field */
  definedKey3?: string
  /** User definable field */
  definedKey4?: string
  /** User definable field */
  definedKey5?: string
  /** User definable field */
  definedKey6?: string
  /** Price list code */
  priceList?: string
  /** Promotion code */
  promotionCode?: string
  /** The user entering or last updating the record */
  changeUser: string
  /** Date record was last updated */
  changeDate: number
  /** 1=withdrawn 0=not wiothdrawn */
  withdrawn?: number
  /** Withdrawn date */
  withdrawnDate?: number
  /** User defined field */
  definedKey7?: string
  /** User defined field */
  definedKey8?: string
  /** User defined field */
  definedKey9?: string
  /** User defined field */
  definedKey10?: string
  /** User defined field */
  definedKey11?: string
  /** User defined field */
  definedKey12?: string
  /** User defined field */
  definedKey13?: string
  /** User defined field */
  definedKey14?: string
  /** User defined field */
  definedKey15?: string
  /** User defined field */
  definedKey16?: string
  /** User defined field */
  definedKey17?: string
  /** User defined field */
  definedKey18?: string
  /** Campaign code to which media is attached (formerly known as prospect_source) */
  campaignCode: string
  startOffset?: number
  productPromotionCode?: string
}
