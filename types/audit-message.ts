/**
 * Audit messages generated from Maginus applications.
 */
export interface AuditMessage {
  /** Uniquely identifies a run */
  runId: number
  /** Program name/run type */
  runType?: string
  /** Indicates the severity of the message eg Warning, Help etc. */
  severity?: number
  /** A message to be displayed as a result of an action. */
  messageText?: string
  /** 1=report title,2=section head,3=page head,4=grp. head,5=text */
  messageType?: number
  /** The user entering or last updating the record */
  changeUser?: string
  /** same as change date but accurate to millionth of a second */
  changeTime?: number
  stugad?: string
}
