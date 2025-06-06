/**
 * User defined sales order types
 */
export interface SalesOrderType {
  salesOrderType: string
  description?: string
  changeDate?: number
  changeUser?: string
  systemDefault?: number
  withdrawn?: number
  withdrawnDate?: number
}
