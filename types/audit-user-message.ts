/**
 * Audit of user message table used for support purposes
 */
export interface AuditUserMessage {
  /** User to which message has been sent */
  toUser: string
  /** User who sent message */
  fromUser: string
  /** See list of alert types in maginus schema */
  messageType?: number
  /** Message */
  messageText: string
  /** Obsolete */
  status?: number
  /** date alert was originally created */
  creationDate: number
  /** Last date message was viewed */
  lastAccessDate?: number
  /** Reference to original document */
  reference?: string
  /** 1=sales order/quote, 2=credit note, 3=RMA, 4=Fax job */
  documentType?: number
  /** Date record was last updated */
  changeDate: number
  /** The user entering or last updating the record */
  changeUser: string
  /** Value */
  value?: number
  /** additional reference */
  reference2?: string
  /** 1=post dated alert unprocessed, 2=post dated alert processed 0=not post dated */
  postDated?: number
  /** DELETE, INSERT or UPDATE */
  transType?: string
  /** Time message was created */
  transTime?: Date
  /** transaction_date */
  transDate?: Date
}
