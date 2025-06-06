/**
 * Cash payment information - data held in encrypted form.
 */
export interface SalesPayment {
  /** Document number */
  salesDocumentNum: number
  /** Uniquely identifies a Sales Order Invoice */
  soInvoiceNum?: number
  /** 0=credit card, 1=devit card, 2=manual, 3=cheque, 4=leasing */
  paymentMethod: string
  /** Credit card number etc. */
  cardNumber?: string
  /** Batches and Quotations are valid until the expiry date. */
  expiryDate?: string
  /** Issue number, for Switch */
  issueNumber?: string
  /** Name of the bank issuing card */
  issueBank?: string
  /** name of card holder */
  cardholder?: string
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
  /** Unique identifier of a country */
  countryCode?: string
  /** Payment value */
  paymentValue?: number
  /** Payment date */
  paymentDate?: number
  /** Credit card authorisation code or cheque number or Coms XL code or voucher number */
  authorisation?: string
  /** The user entering or last updating the record */
  changeUser?: string
  /** Date record was last updated */
  changeDate?: number
  /** 0=Order; 1=Quote; 2=stand a lone cash payment; 3=Works Order;  4=transfer 5=call off */
  orderType?: number
  /** 1=Open, 2=Authorised, 3=Manually Charged, 4=Ready to collect, 5=Charge to be collected, 6=Charged, 7=Charge failed, 8=Charge owing, 9=Cancelled 10=Provisional cash payment for a quote. */
  status?: number
  /** User entering payment details */
  chargingUser?: string
  /** 0=not interfaced,1=interfaced,2=extraceted notinterfaced */
  interfaceStatus?: number
  /** Dream document number */
  dreamDocnum?: number
  /** Unique identifier of a customer */
  customerAccount?: string
  /** Interface reference */
  interfaceRef?: number
  /** Credit card start date */
  cardStartDate?: string
  /** Authorisation date */
  authoriseDate?: number
  /** Authorise message returned from interface */
  authoriseMessage?: string
  /** Financial transaction type - allows several differnt payment methods to be interfaced to the same transaction type in accounts system */
  finTransactionType?: string
  stugad?: string
  /** 1 - immediate charge payment, 0 - normal cash payment.  */
  immediateCharge?: number
  /** Document number from financial system */
  ledgerDocnum?: number
  /** 1=automatic refund required */
  automaticRefund?: number
  /**  Number of copies printed */
  printCount?: number
  refundSource?: number
  /** Refund reason */
  refundReason?: string
  /** user name */
  refundUser?: string
  refundDocumentNum?: number
  /** User that entered the credit card details originally */
  originalUser?: string
  /** Stores an encrypted version of the card number.  Used to allow search by card number */
  cardNumberLookup?: string
  /** Sequential number within each SALES_DOCUMENT_NUM, used in conjunction with this to form a unique key. */
  paymentNum?: number
  /** Cheque number for automatic cheque refunds. */
  refundChequeNum?: number
  /** Reference field. */
  reference?: string
  /** Credit Card Signature Id. */
  signatureId?: number
  /** Voucher Number. */
  voucherNum?: number
  /** Currency of payment */
  currencyCode?: string
  /** Payment value in base currency */
  basePaymentValue?: number
  /** Sales Office */
  salesOffice?: string
  cardId?: string
  refundStatus?: number
  mergeAccount?: string
  paymentVerified?: number
  cardEciId?: string
  cardSidId?: string
  cardVavId?: string
  cardVtsId?: string
  cardVscId?: string
  cardVsaId?: string
  cardVshId?: string
  requestReference?: string
  storageReference?: string
  obfuscationScheme?: number
  /** Authorisation Expiry Date */
  authExpiry?: number
}
