export interface HeldOrderReason {
  /** Uniquely identifies a reason code */
  reasonCode?: string
  /** Description */
  description?: string
  /** 1=leave stock allocated, 0=do not allocate stock */
  allocated?: number
  /** The user entering or last updating the record */
  changeUser?: string
  /** Date record was last updated */
  changeDate?: number
  /** 0=user defined,1=system def - user may use,2=system use only */
  system?: number
  /** 0= not in use, 1= in use */
  inUse?: number
  /** Role description */
  roleDescription?: string
  /** 1=report title,2=section head,3=page head,4=grp. head,5=text */
  messageType?: number
}
