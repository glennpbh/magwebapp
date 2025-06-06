/**
 * Maginus audit trail of table amendments. See audit_detail for the actual values amended.
 */
export interface AuditHeader {
  /** Unique identifier of an audited transaction (system generated) */
  auditId?: number
  /** Operating system username */
  pcLogin?: string
  /** Date record was last updated */
  changeDate?: Date
  /** IP address of terminal performing transaction */
  terminal?: string
  /** Oracle Table name */
  tableName?: string
  /** I=Insert U=Update D=Delete */
  action?: string
  /** First part of primary key for table being audited */
  primaryKey1?: string
  /** second part of primary key for table being auditied (optional) */
  primaryKey2?: string
  /** Application performing transaction (if null refer to program column) */
  module?: string
  /**  Unique identifier of a program */
  program?: string
}
