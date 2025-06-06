/**
 * Maginus audit trail of column changes
 */
export interface AuditDetail {
  /** Unique identifier of an audited transaction (system generated) */
  auditId?: number
  /** Name of column being auditied */
  columnName?: string
  /** Value of column before transaction started */
  oldValue?: string
  /** Value of column after transaction completed  */
  newValue?: string
}
