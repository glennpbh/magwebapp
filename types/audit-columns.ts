/**
 * Tables and columns to be included in automatic generation of audit triggers.
 */
export interface AuditColumns {
  /** Oracle Table name */
  tableName?: string
  /** Column to be audited */
  columnName?: string
  /** First part of primary key for table being audited */
  key1?: string
  /** second part of primary key for table being auditied (optional) */
  key2?: string
  /**  0= not in use, 1= in use */
  inUse?: number
}
