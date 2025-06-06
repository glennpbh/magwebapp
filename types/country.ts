/**
 * Countries
 */
export interface Country {
  /** Unique identifier of a country */
  countryCode: string
  /** Default currency code - Relates to currency table */
  defaultCurrency?: string
  /** Default language code (relates to language table) */
  defaultLanguage?: string
  /** 0 = Not part of Europe; 1= Part of European community */
  ecMember?: number
  /** The user entering or last updating the record */
  changeUser?: string
  /** Date record was last updated */
  changeDate?: number
  /** An abbreviation of a currency description */
  shortName?: string
  /** Name of a country */
  countryName?: string
  stugad?: string
  /** Standard intrastat codes:FR;NL;DE;IT;GB;IE;DK;ES;PT;BL;GR */
  intrastatCode?: string
  /** International telephone dialling code */
  diallingCode?: string
  /** Label for 1st line of address */
  address1Text?: string
  /** Label for 2nd line of address */
  address2Text?: string
  /** Label for 3rd line of address */
  address3Text?: string
  /** Label for 4th line of address */
  address4Text?: string
  /** Label for 5th line of address */
  address5Text?: string
  /** Label for 6th line of address */
  address6Text?: string
  /** 0= 1st address line in use  0= 1st address line not in use */
  address1InUse?: number
  /** 0= 2nd address line in use  0= 2nd address line not in use */
  address2InUse?: number
  /** 0= 3rd address line in use  0= 3rd address line not in use */
  address3InUse?: number
  /** 0= 4th address line in use  0= 4th address line not in use */
  address4InUse?: number
  /** 0= 5th address line in use  0= 5th address line not in use */
  address5InUse?: number
  /** 0= 6th address line in use  0= 6th address line not in use */
  address6InUse?: number
  /** Not used */
  address1Validate?: number
  /** Not used */
  address2Validate?: number
  /** Not used */
  address3Validate?: number
  /** Not used */
  address4Validate?: number
  /** Not used */
  address5Validate?: number
  /** Not used */
  address6Validate?: number
  /** Name of postcode field - e.g. postcode or zip code */
  postcodeText?: string
  /** 0=post codes not used 1=postcodes used */
  postcodeInUse?: number
  /** Primary address line number for outputting onto reports */
  primeAddressLine?: number
  /** Langdon country code */
  langdonCountry?: string
  /** 0 - Use countries address labels/options1 - Use system address labels/options */
  useAddressDefault: number
  /** The Countries postcode format */
  postcodeFormat?: string
  applyTermsToVat?: number
  blacklist?: number
  euIntrastat?: number
}
