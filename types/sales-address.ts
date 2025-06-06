export interface SalesAddress {
  salesDocumentNum: number
  orderType: number
  salesAddressNum: number
  countryCode: string
  address1?: string
  address2?: string
  address3?: string
  address4?: string
  address5?: string
  address6?: string
  postcode?: string
  deliveryTextNum?: number
  changeDate: number
  changeUser: string
  deliveryName?: string
}
