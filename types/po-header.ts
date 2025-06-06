/**
 * Purchase order header details
 */
export interface PoHeader {
  /** Unique identifier of a purchase order */
  orderNumber: number
  /** Unique identifier of a warehouse */
  warehouseCode?: string
  /** Uniquely identifies a supplier */
  supplierAccount?: string
  /** User defined reference. */
  reference?: string
  /** Unique identifier of a buyer */
  buyerId?: string
  /** Date of an order */
  orderDate?: number
  /** 0=standard; 1=blanket; 2=back to back */
  orderType?: number
  /** 0=Unauthorised, 1=Authorised, 2=Cancelled, 3=Complete */
  status?: number
  /** Total order value */
  orderValue?: number
  /** Name of a customer/supplier contact */
  contactName?: string
  /** Unique identifier of a text storage record. */
  textNumber?: number
  /** Document number */
  salesDocumentNum?: number
  /** Method of sending an order ie 1=fax,2=EDI,3=paper, 4=e-mail */
  orderMethod?: number
  /** FAX number */
  fax?: string
  /** 0 = Send document, 1 = Do not send document */
  sendRequired?: number
  /** Number of times order has been printed */
  printNumber?: number
  /** Number of copies printed */
  printCount?: number
  /** Date record was last updated */
  changeDate?: number
  /** The user entering or last updating the record */
  changeUser?: string
  /** Last print date */
  printDate?: number
  /** Currency code */
  currencyCode?: string
  /** Unique identifier for a payment term */
  paymentTerm?: string
  /** Order confirmation date */
  confirmedDate?: number
  /** Associated sales order number */
  salesOrderLink?: number
  /** Order value in base currency */
  baseOrderValue?: number
  /** An exchange rate */
  exchangeRate?: number
  /** Total order weight */
  orderWeight?: number
  /** Percentage discount. */
  discountPerc?: number
  /** linked purchase order number */
  linkedPo?: number
  /** Supplier account to which goods are to be delivered. Null if delivering to warehouse */
  deliverTo?: string
  /** Delivery contact name */
  deliveryContact?: string
  /** Unique id of a carrier */
  carrierCode?: string
  /** Agent */
  agent?: string
  /** E-mail address */
  email?: string
  /** 1=value, 2=supplier, 3=Value/Supplier, 0=authorised */
  unauthoriseReason?: number
  campaignCode?: string
  issueType?: string
  routeId?: number
  /** 0=not interfaced, 1=interfaced, 2=in progress */
  interfaceStatus?: number
  webStatus?: number
}
