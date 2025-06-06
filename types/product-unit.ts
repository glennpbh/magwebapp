/**
 * Units in which stock transactions may occur
 */
export interface ProductUnit {
  /** Uniquely identifies a unit (Pricing Unit) */
  unitCode: string
  /** Uniquely identifies a product */
  productCode: string
  /** Description */
  description: string
  /** Number of stock units */
  conversion: number
  /** Indicates whether a unit applies to sales */
  sellingUnit: number
  /** Unit of purchase order */
  purchaseUnit: number
  /** Indicates whether a unit may be applied to stock movements */
  stockingUnit: number
  stugad?: string
  /** The user entering or last updating the record */
  changeUser: string
  /** Date record was last updated */
  changeDate: number
  /** The level of precision required */
  precision?: number
  /** The date the record was withdrawn from service */
  withdrawnDate?: number
  /** 1 = Withdrawn from use, 0 = Not withdrawn */
  withdrawn: number
  /** Unit code used to convert between one unit and another */
  equivalentUnit: string
  /** Number of equivelent units required to make up unit */
  equivalentQuantity: number
  /** 1=weight specified in this unit,0=not the weight unit */
  weightUnit: number
  /** 1=sales pricing unit,0=not sales pricing unit */
  salePriceUnit: number
  /** 1=purchase pricing unit,0=not purchase pricing unit */
  purchasePriceUnit: number
  /** 0=Not a bulk unit  1= bulk unit */
  bulkUnit: number
  minSalesQty?: number
  maxQuantity?: number
  multipleQuantity?: number
  handlingUnit?: number
  handlingIdSize?: string
  innerUnit?: number
}
