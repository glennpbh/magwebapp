/**
 * User definable field Definitions
 */
export interface FieldDefinition {
  /** User defined field entity */
  entityName: string
  /** User defined field name */
  fieldName: string
  /** sequence */
  sequenceNo: number
  /** type of data to be held in field e.g. e-mail address */
  dataType: string
  /** 1=dependent field, 0=non-dependent */
  dependent: number
  /** maximum number of field segments allowed */
  maxSegments: number
  /** 1=withdrawn, 0=active */
  withdrawn: number
  /** withdrawn date */
  withdrawnDate: number
  labelId: number
  toolTipId: number
  /** 1=mandatory, 0=optional */
  mandatory: number
  /** Date record was last updated */
  changeDate: number
  /** The user entering or last updating the record */
  changeUser: string
}
