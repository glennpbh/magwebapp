/**
 * Method of paying for sales order
 */
export interface SalesPayMethod {
  /** 0=credit card, 1=devit card, 2=manual, 3=cheque, 4=leasing */
  paymentMethod: string
  /** 1=card number required , 0=no card number required */
  cardNumberReq?: number
  /** 1= date required,0 = no date required */
  expiryDateReq?: number
  /** 1=issue number required, 0 = no issue number required */
  issueNumberReq?: number
  /** 1=issue bank required, 0 = bank not required */
  issueBankReq?: number
  /** 1=card holder requried, 0 = no card holder required */
  cardholderReq?: number
  /** 1= authorisation required , 0 = no authorisation required */
  authorisationReq?: number
  /** The user entering or last updating the record */
  changeUser?: string
  /** Date record was last updated */
  changeDate?: number
  /** Credit card floor limit - payments above this limit require authorisation */
  floorLimit?: number
  /** 0=credit card, 1=debit card, 2=manual,3=cheque, 4=lease, 5=voucher */
  paymentType?: number
  /** 1=start date must be entered 0=start date not required */
  startDateReq?: number
  /** Leasing account */
  accountCode?: string
  /** Number of months */
  leaseTerm?: number
  paymentFrequency?: number
  /** Charge code */
  chargeCode?: string
  /** Description   */
  chargeDescription?: string
  /** Charge percentage */
  chargePerc?: number
  /** Initial authorisation - leasing */
  initialMessage?: string
  /** Amended authorarisation - leasing */
  amendMessage?: string
  /** Final authorisation - leasing */
  finalMessage?: string
  /** Cancellation message - leasing */
  cancelMessage?: string
  /** 1=WEB enabled */
  webEnabled?: number
  /** 1=refunds allowed */
  refundsAllowed?: number
  voucher?: number
  accumBonusPoints?: number
  cardMask?: string
  /** Set to 1 if the refund cheque number is to be entered for this payment method, 0 if it is not. */
  refundChequeNumReq?: number
  /** Set to 1 if the credit card signature id field is required, 0 if it is not. */
  signatureIdReq?: number
  cardIdLength?: number
  chipAndPin?: number
  futuraGift?: number
  soeMessage?: number
  cccaLink?: number
  verifonePaypageScheme?: number
  sagepayPaypageScheme?: string
  tnspayPaypageScheme?: string
  encodedPaypageScheme?: string
  bluefinPaypageScheme?: string
  /** Braintree Payment Card Scheme */
  braintreePaypageScheme?: string
}
