/**
 * Customer address
 */
export interface CustomerAddress {
  /** Unique identifier of a customer */
  customerAccount: string
  /** Together with customer account identifies a customer address */
  addressId: number
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
  primeAddressLine: number
  /** Postcode */
  postcode?: string
  /** Unique identifier of a country */
  countryCode: string
  /** Normal method of despatch - foreign key to despatch type */
  normalDespatch: string
  /** Despatch route sequence */
  route?: number
  /** Date record was last updated */
  changeDate: number
  /** The user entering or last updating the record */
  changeUser: string
  /** 0=customer ; 1= prospect */
  prospectCustType: number
  /** reference to text storage table */
  deliveryTextNum?: number
  /** Warehouse to which goods are to be delivered */
  deliveryWarehouse?: string
  /** EDI location reference */
  locationRef?: string
  /** E.G. House Name */
  addressName?: string
  validationStatus?: number
}
