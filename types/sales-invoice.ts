/**
 * Sales invoice header
 */
export interface SalesInvoice {
  /** Uniquely identifies a Sales Order Invoice */
  soInvoiceNum: number
  /** Invoice date */
  invoiceDate?: number
  /** Unique identifier of a customer */
  customerAccount?: string
  /** Currency code */
  currencyCode?: string
  /** Total sales value */
  value?: number
  /** Total cost including charges */
  cost?: number
  /** 1=Deferred delete,2 = keep */
  printStatus?: number
  /** 0=not interfaced,1=interfaced,2=extraceted notinterfaced */
  interfaceStatus?: number
  /** The user entering or last updating the record */
  changeUser?: string
  /** Date record was last updated */
  changeDate?: number
  stugad?: string
  /** Number of copies printed */
  printCount?: number
  /** Unique identifier for a payment term */
  paymentTerm?: string
  /** Unique identifier of a text storage record. */
  textNumber?: number
  /** Unique identifier of a sales office */
  salesOffice?: string
  /** 0=Normal invoice, 1=Manually input invoice */
  manualInvoice?: number
  /** Uniquely identifies a Maginus user */
  username?: string
  /** Customer order number or enterable reference on manual invoices
   */
  yourRef?: string
  /** Reference for manual invoicing */
  ourRef?: string
  /** sales office of the customer */
  custSalesOffice?: string
  repCode?: string
  transactionDate?: number
  invoiceConsolidation?: number
  ediFlgn?: number
  /** Sales representative */
  ledgerDocnum?: number
  mergeAccount?: string
}
