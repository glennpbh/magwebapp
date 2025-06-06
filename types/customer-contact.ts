export interface CustomerContact {
  /** Unique identifier of a customer */
  customerAccount: string
  /** Name of a customer/supplier contact */
  contactName?: string
  /** The job title assigned to an individual */
  jobTitle?: string
  /** A contacts department */
  department?: string
  /** FAX number */
  fax?: string
  /** Telephone Number */
  telephone?: string
  /** The user entering or last updating the record */
  changeUser: string
  /** Date record was last updated */
  changeDate: number
  /** Telephone extension number */
  extension?: string
  /** Together with customer account identifies a customer address */
  addressId: number
  /** Name of a file containing a picture */
  picture?: string
  /** Job function code from job_function table */
  jobFunction: string
  /** Customer contact identified */
  contactId: number
  /** Mr/Mrs/Dr etc. */
  contactTitle?: string
  /** Initials */
  contactInitials?: string
  /** First name */
  contactFirstname?: string
  /** E-Mail address */
  email?: string
  /** Salutation for mailing-ie text following Dear eg.Dear Jo */
  contactDear?: string
  /** Unique identifier of a text storage record. */
  textNumber?: number
  /** 0=customer ; 1= prospect */
  prospectCustType: number
  /** 0=contact known, 1=contact unknown */
  contactUnknown: number
  /** phone number with all alpha characters removed. */
  numericPhoneNo?: number
  /** Alternative telephone number */
  telephoneNumber2?: string
  /** Mobile telephone number */
  mobileTelephone?: string
  /** Alternate telephone number stored in numeric format */
  numericTelephone2?: number
  /** Mobile telephone number held in numeric format */
  numericMobile?: number
  /** Unique contact identification number */
  contactKey?: number
  /** fax number with all alpha numeric characters removed */
  numericFax?: number
  /** Contacts full name */
  contactFullName?: string
  /** Contacts middle names */
  contactMiddleNames?: string
  emailDespatchConfirm?: number
  preferredContactMethod?: number
  urlDespatchConfirm?: string
  mergeContactId?: number
}