/**
 * Obsolete table
 */
export interface AuditCorrection {
  correctionType: number
  customerAccount: string
  documentNumber?: number
  itemNumber: number
  orderType?: number
  soInvoiceNum?: number
  oldUnitCost?: number
  newUnitCost?: number
  oldLineWeight?: number
  newLineWeight?: number
  auditText?: string
  changeUser: string
  changeDate: number
}
