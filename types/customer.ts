export interface Customer {
  /** Unique identifier of a customer */
  customerAccount: string
  /** Name of the customer */
  customerName: string
  /** 0 = Not an exporter; 1 = exporter of goods */
  exportCustomer: number
  /** Unique identifier of a country */
  countryCode?: string
  /** The normal language code for the record */
  languageCode: string
  /** Currency code */
  currencyCode: string
  /** Unique identifier of a sales office */
  salesOffice: string
  /** 1=VAT applicable, 0=VAT exempt */
  vatApplicable: number
  /** VAT registration number */
  vatRegNum?: string
  /** 1=Statement, 2 = Invoice, 3 = Delivery account,4=cash */
  accountType: number
  /** 1 = Fax; 2 = EDI; 3 = Paper */
  invoiceMethod: number
  /** 1 = Fax; 2 = EDI; 3 = Paper, 4= EDI, 5=None */
  acknowlMethod: number
  /** Sales representative */
  repCode?: string
  /** Account code for invoicing purposes */
  invoiceAccount?: string
  /** Account code to which statements are sent */
  statementAccount?: string
  /** Primary address line number for outputting onto reports */
  primeAddressLine?: number
  /** Credit limit in account currency */
  creditLimit?: number
  /** Unique identifier for a payment term */
  paymentTerm?: string
  /** Total value of unpaid invoices */
  unpaidBalance?: number
  /** Balance of outstanding orders which have been allocated */
  uninvoicedBalance?: number
  /** The user entering or last updating the record */
  changeUser: string
  /** Date record was last updated */
  changeDate: number
  /** 1 = Withdrawn from use, 0 = Not withdrawn */
  withdrawn: number
  /** The date the record was withdrawn from service */
  withdrawnDate?: number
  /** The date the entity was last used */
  lastUsed?: number
  /** Cust/Whouse=priority level,printer_map- 1=normal,else lower */
  priority?: number
  /** Obsolete column - replaced by main_contact_id */
  mainContact?: string
  /** 1st customer key - A means of categorising customers */
  customerKey1?: string
  /** 2nd customer key - A means of categorising customers */
  customerKey2?: string
  /** 3rd customer key - A means of categorising customers */
  customerKey3?: string
  /** 4th customer key - A means of categorising customers */
  customerKey4?: string
  /** 0 =  not inter company; 1 = inter company */
  interCompany?: number
  /** Date on which the record was first created */
  creationDate: number
  /** Datrontech only */
  draftLimit?: number
  /** unique identifier for delivery terms */
  deliveryTerm: string
  /** Identifies a set of exchange rates */
  exchangeRateId: string
  /** Unique identifier of a text storage record. */
  textNumber?: number
  /** 0=never accept substitutes 1=always accepts substitutes 2=ask if substitute accepted */
  autoSubstitution: number
  /** Together with customer account identifies a customer address */
  addressId: number
  /** Financial ledger code */
  ledger?: string
  /** Nominal account code within financials */
  nominal?: string
  /** Factor ledger within financials */
  factorLedger?: string
  /** Factor account within financials */
  factorAccount?: string
  /** Value of uninvoiced VAT for stock which has been allocated */
  uninvoicedVat?: number
  /** 0=Open, 1=Refer to Credit Controller, 2=Stop */
  status: number
  /** Identifier of the main customer contact */
  mainContactId: number
  /** User defined field */
  definedKey1?: string
  /** User defined field */
  definedKey2?: string
  /** User defined field */
  definedKey3?: string
  /** User defined field */
  definedKey4?: string
  /** User defined field */
  definedKey5?: string
  /** User defined field */
  definedKey6?: string
  /** Indicates whether a proforma invoice is required(0=NO,1=YES) */
  proforma: number
  /** 0=customer ; 1= prospect */
  prospectCustType: number
  /** Defines a prospect status from prospect status table. */
  prospectStatus?: string
  /** Obsolete */
  prospectSource?: string
  /** Name in upper case and without unnecessary spacing */
  unformattedName?: string
  /** text storage number for sales comments */
  salesText?: number
  /** 0=allow customers to buy products in exclusion group 1= prevent customers from buying products in group */
  includeExclude?: number
  /** Balance of orders in status of picking/picked/despatched */
  warehouseBalance?: number
  /** Vat value for orders being picked/picked/despatched */
  warehouseVat?: number
  /** Product discount */
  productDiscount?: number
  /** Reference for EDI location */
  ediLocationRef?: string
  /** EDi Password */
  ediTransPasswd?: string
  /** Our EDI idnetifier */
  ediOurId?: string
  /** Customers EDI identifier */
  ediCustId?: string
  /** 1=Retro rebate available , 0 = retro rebate not applicable */
  retroRebate?: number
  /** EDI password */
  ediTransPassword?: string
  ediInvoiceGenNum?: number
  /** Datrontech only */
  ediPriceGenNum?: number
  /** 0=No print,1=Open items only,2=Items in period + open items */
  statementPrintType?: number
  /** 0 = One invoice per despatch, 1 = Consolidate by customer account, 2 = Cosilidate by delivery address, 3 = Cosolidate by customer order number */
  invoiceConsolidation?: number
  /** 0=daily  1=weekly   2=monthly */
  invoiceFrequency?: number
  /** Post office mail sort code */
  mailsortCode?: number
  /** 1=VAT inclusive 0=VAT exclusive */
  vatInclusive?: number
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
  /** 1=Allocate stock from a single batch , 0= multiple batches allowed */
  singleBatchAlloc?: number
  /** Datrontech only */
  ediAckFlgn?: number
  /** 1=total delivery only; 0=part shipment allowed */
  totalDelivery?: number
  /** reference to text comments held on text storage table */
  pickListText?: number
  /** 1=print recommended retail price on documents, 0= do not print RRP */
  printRrp?: number
  /** 1=print values on despatch not, 0= do not print values */
  printDespatchValues?: number
  /** Registration Number */
  companyRegNum?: string
  /** Default minimum margin allowed for customer */
  minMarginDefault?: number
  /** User who originally created customer */
  creationUser?: string
  voucherValueBonus?: number
  bonusPoints?: number
  messageType?: number
  /** The number of bonus points earned by the customer. */
  messageStartDate?: number
  /** Determines how the sales message should be displayed for the customer - 0 = permanently, 1= once only 2 = only between the start and end dates */
  messageEndDate?: number
  /** Can only be entered if the MESSAGE_TYPE is set to 2. The start date must be entered; if this is set. */
  firstOrderDate?: number
  /** Can only be entered if the MESSAGE_TYPE is set to 2. the end date must be entered; if this is set. */
  firstOrderNumber?: number
  /** Date of first order  */
  lastOrderDate?: number
  /** First order placed */
  lastOrderNumber?: number
  /** Date of last order */
  firstMediaCode?: string
  /** Last order placed */
  contracts?: number
  /** Media code from first order */
  priceList?: string
  lessorAccount?: number
  orderNumberUnique?: number
  origProspect?: string
  maximumOrderValue?: number
  suppressWelcomePack?: number
  mergeAccount?: string
  statementEmail?: string
  creditEmail?: string
  invoiceEmail?: string
  returnMethod?: number
  statementMethod?: number
  finAddressId?: number
  defaultDeliveryAddressId?: number
  lastAdvertisingPack?: number
  suppressAdvertisingPack?: number
  /** Name of External system for data source */
  lastExternalChange?: string
  /** Date the New DP Statement was created or last updated */
  dpStatementDate?: number
  anonymiseStatus?: number
  anonymiseRequestDate?: number
  anonymiseRequestUser?: string
  anonymiseCompletionDate?: number
  teamName?: string
  horizonDays?: number
  horizonDate?: number
  horizonUpdate?: number
}