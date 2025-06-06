export interface SalesHeader {
  /** The user entering or last updating the record */
  changeUser?: string
  /** Document number */
  salesDocumentNum: number
  /** Unique identifier of a customer */
  customerAccount?: string
  /** Name of the customer */
  customerName?: string
  /** Unique identifier of a sales office */
  salesOffice?: string
  /** 0=Order; 1=Quote; 3=Works Order; 4=transfer 5=call off */
  orderType?: number
  /** Uniquely identifies a Maginus user */
  username?: string
  /** 0=Incomplete, 1=Held, 2=Complete, 3=Cancelled, 4=Provisional (quotes with status 4 may not be converted into orders) */
  status?: number
  /** 1=total delivery only; 0=part shipment allowed */
  totalDelivery?: number
  /** User defined reference. */
  reference?: string
  /** Currency code */
  currencyCode?: string
  /** Unique identifier of a text storage record. */
  textNumber?: number
  /** Primary address line number for outputting onto reports */
  primeAddressLine?: number
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
  /** Postcode */
  postcode?: string
  /** FAX number */
  fax?: string
  /** Used to analyse sales documents */
  marketingRef?: string
  /** 0=Manual;1=Enq to Ord;2= EDI;3=System gen.A class,4=C Class, 5=copy */
  source?: number
  /** 1=Fax, 2=EDI, 3=paper, 4=E-mail, 5=None */
  acknowlMethod?: number
  /** 0=No acknowledgement , 1= acknowledgement required */
  acknowlRequired?: number
  /** 0=non-export order , 1= export order */
  export?: number
  /** Indicates whether a proforma invoice is required(0=NO,1=YES) */
  proforma?: number
  /** Date record was last updated */
  changeDate?: number
  /** Date of an order */
  orderDate?: number
  /** Name of a customer/supplier contact */
  contactName?: string
  /** The job title assigned to an individual */
  jobTitle?: string
  /** A contacts department */
  department?: string
  /** Telephone Number */
  telephone?: string
  /** Telephone extension number */
  extension?: string
  /** Batches and Quotations are valid until the expiry date. */
  expiryDate?: number
  /** Quotation or EDI reference */
  sourceReference?: string
  /** Total order value */
  orderValue?: number
  /** Number of copies printed */
  printCount?: number
  /** 1 = Send document, 0 = Do not send document */
  sendRequired?: number
  /** Unique identifier of a country */
  countryCode?: string
  /** Date for marking a document as complete */
  completionDate?: number
  /** 0= credit, 1=cash */
  paymentType?: number
  /** Sales representative */
  repCode?: string
  /** Uniquely identifies a reason code */
  reasonCode?: string
  /** Value of VAT */
  vatValue?: number
  /** sales office of the customer */
  custSalesOffice?: string
  /** Text storage number for acknowledgement text */
  acknowlText?: number
  /** Text storage number for despatch not text */
  despatchText?: number
  /** text storage number for invoice text */
  invoiceText?: number
  /** 0=prep sheet not required, 1= prep sheet required */
  prepSheetRequired?: number
  /** number of times prep sheet has been printed */
  prepSheetCount?: number
  /** 1= prep sheet sent 0=not sent */
  prepSheetSent?: number
  /** A division used to group sales offices */
  salesDivision?: string
  /** 1=Fax, 2=EDI, 3= Paper */
  proformaMethod?: number
  /** Number of times proforma invoice has been printed */
  proformaCount?: number
  /** 0=proforma invoice not sent, 1= send */
  proformaSent?: number
  /** E-Mail address */
  email?: string
  /** User defined product fileds */
  definedAnalysis1?: string
  /** User defined product fileds */
  definedAnalysis2?: string
  /** User defined product fileds */
  definedAnalysis3?: string
  /** User defined product fileds */
  definedAnalysis4?: string
  /** User defined product fileds */
  definedAnalysis5?: string
  /** User defined product fileds */
  definedAnalysis6?: string
  /** 0=customer ; 1= prospect */
  prospectCustType?: number
  /** EDI location reference */
  locationRef?: string
  /** Code for lost order reason */
  lostReason?: string
  carrierDelivery?: string
  /** reference to text storage table */
  lostReasonText?: number
  /** 0=not released by credit control, 1=released */
  released?: number
  /** 1= Sample requested 0=no sample required */
  sampleRequest?: number
  /** Locat warehouse code */
  localWarehouse?: string
  ediAckFlgn?: number
  /** Movement type used to issue the item of stock from stores. */
  issueType?: string
  /** 1=opening offier 0=none opening offer */
  openingOffer?: number
  /** Date advice note produced */
  adviceNoteDate?: number
  finalAuthorisation?: number
  leaseCustomer?: string
  /** Amount authorised */
  leaseAuthAmount?: number
  leaseRepayAmount?: number
  stugad?: string
  /** obsolete */
  twsGiftOrder?: number
  /** Customer contact identified */
  contactId?: number
  /** Percentage probablility that quote will be converted into an order */
  quoteProbability?: number
  /** Total cost of sales order (I.e. cost price not selling price) */
  orderCost?: number
  /** The number of bonus points redeemed against despatch charges. */
  bonusRedeemed?: number
  /** The first order indicator. This will only be set to 1 on the first order created for a customer or converted from a quotation. */
  firstOrder?: number
  /** 1=refund required 0=no refund required */
  refundRequired?: number
  /** Reason for refund */
  refundReason?: string
  /** 1=refund issued; 0=refund not issued */
  refundIssued?: number
  /** Link to text storage for refund comments */
  refundComment?: string
  /** Authorisation Number */
  authNum?: string
  /** Stores the recipient name for gift orders */
  deliveryName?: string
  /** Bonus points adjusted */
  bonusPointsAdj?: number
  /** Manual discount percentage */
  manualDiscPerc?: number
  /** Catalogue media code */
  mediaCode?: string
  /** Promotion code */
  promotionCode?: string
  /** Sales Contract number */
  contractNum?: number
  savingValue?: number
  salesOrderType?: string
  totalBonusPoints?: number
  udfGroupHeader?: string
  invAddress1?: string
  invAddress2?: string
  invAddress3?: string
  invAddress4?: string
  invAddress5?: string
  invAddress6?: string
  invPostcode?: string
  invCountryCode?: string
  invContactId?: number
  invContactName?: string
  invContactFax?: string
  invContactEmail?: string
  invContactJobTitle?: string
  invContactDepartment?: string
  invContactTelephone1?: string
  invContactTelephone2?: string
  invContactMobile?: string
  invContactExtension?: string
  telephone2?: string
  mobileTelephone?: string
  associateAllLines?: number
  quoteUser?: string
  paymentTerm?: string
  shipmentOption?: number
  multiShipmentDays?: number
  shipmentDeadlineDate?: number
  mergeAccount?: string
  salesTax?: number
  /** 0-EDI Incomplete, 1-Allow SOE Access */
  bbedi?: number
  /** The system calculated Despatch Type for the Sales Order (only when including a Service product) */
  origDespatchType?: string
}
