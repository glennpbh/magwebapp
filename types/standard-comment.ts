/**
 * Standard prurchase order comments
 */
export interface StandardComment {
  /** 1=P.O. notes;2=Sales order notes;3=credit note notes */
  commentType?: number
  /** Uniquely identifies a comment */
  commentId?: string
  /** Free format text */
  commentText?: string
  /** The user entering or last updating the record */
  changeUser?: string
  /** Date record was last updated */
  changeDate?: number
  stugad?: string
}
