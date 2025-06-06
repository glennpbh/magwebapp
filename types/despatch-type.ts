/**
 * Method of despatching stock
 */
export interface DespatchType {
  /** Uniquely identifies a despatch type */
  despatchType: string
  /** Description */
  description: string
  /** 0= No dly confirmation required, 1=confirm delivery */
  confirmDelivery?: number
  /** The user entering or last updating the record */
  changeUser?: string
  /** Date record was last updated */
  changeDate?: number
  stugad?: string
  /** 1 = Withdrawn from use, 0 = Not withdrawn */
  withdrawn?: number
  /** The date the record was withdrawn from service */
  withdrawnDate?: number
  /** 0 = Routing not applicable, 1 = Routing applicable. */
  routingApplicable?: number
  /** 0= User defined; 1= System defined */
  userDefined?: number
  /** Standard intrastat transport codes - see detail report */
  transportMode?: number
  /** Charge description */
  chargeDescription?: string
  /** Charge code */
  chargeCode?: string
  /** Rate per kilo */
  rate?: number
  /** Minimum value or number of characters. */
  minimum?: number
  /** Maximum value or number of characters. */
  maximum?: number
  /** 0=Not customer paid stock  1=customer paid stock */
  customerPaid?: number
  /** Movement of customer paid stock */
  paidMovement?: number
  /** TNT service level */
  tntServiceLevel?: string
  /** 1=TNT despatch type 0=non TNT despatch type */
  tntIndicator?: number
  /** TNT service code */
  tntServiceCode?: string
  /** Despatch type used for WEB orders */
  webDespatchType?: string
  /** Description to display on WEB interface */
  webDescription?: string
  /** Label Type bulk picks */
  labelType?: number
  /** Unique id of a carrier */
  carrierCode?: string
  /** Consignment Number */
  consignmentNumber?: string
  /** 0=not interfaced,1=interfaced,2=extraceted notinterfaced */
  interfaceStatus?: number
  /** Date document interfaced */
  interfaceDate?: number
  /** Label type for item picks */
  labelTypeItem?: number
  /** Label type for despatch notes */
  labelTypeDesp?: number
  /** 1= single pick/despatch per sales order */
  singleDespatch?: number
  textNumber?: number
  packageWeightRequired?: number
  lcbAlias?: string
  splitDespatch?: number
  warehouseCode?: string
}
