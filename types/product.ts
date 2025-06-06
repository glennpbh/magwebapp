/**
 * Product details
 */
export interface Product {
  /** Uniquely identifies a product */
  productCode: string
  /** Detailed description  (first line) */
  longDescription_1?: string
  /** Detailed description of a product (second line) */
  longDescription_2?: string
  /** 1 = Withdrawn from use, 0 = Not withdrawn */
  withdrawn: number
  /** The date the record was withdrawn from service */
  withdrawnDate?: number
  /** The normal transaction units for the product */
  stockUnit: string
  /** Default unit used for purchasing - Relates to PRODUCT_UNIT */
  defaultPurchUnit?: string
  /** Default unit used for sales orders -Relates to PRODUCT_UNIT */
  defaultSalesUnit?: string
  /** height, held in centimetres of stock unit */
  height?: number
  /** Width, held in centimetres of stock unit */
  width?: number
  /** Length of a product, held in centimetres of stock unit */
  length?: number
  /** Unit that dimensions were entered in: 0 mm, 1 Cm, 2 metre */
  dimEntryUnit?: number
  /** Volume, held in cubic centimetres of stock unit */
  volume?: number
  /** Weight of a product, held in kilos in weight entry unit */
  weight?: number
  /** Unit that weight was entered in: 1 kilo, 0 gramme, 2 tonne */
  weightEntryUnit: number
  /** Uniquely defines a quality procedure */
  procedureCode?: string
  /** 0=order point,1=forecast,2=manual */
  replenishType?: number
  /** The warranty period for a product, in days. */
  warranty?: number
  /** 1 = Product may be sold 0 = Product may not be sold */
  productSold: number
  /** 1 = Product may be purchase 0 = Product may not be purchased */
  productPurchased: number
  /** 1 = Product may be stocked 0 = Product may not be stocked */
  productStocked: number
  /** 0 = Not a kit ; 1= part of a kit */
  kitProduct: number
  /** 0= non-service product, 1= service product */
  serviceProduct: number
  /** 0= Not a special product, 1= special product */
  specialProduct: number
  /** Method of storing stock */
  storageType?: string
  /** 0 = not batch controlled; 1= batch control */
  batchControl: number
  /** 0=no serial control,1=serial control,2=serial cont. on issue */
  serialControl: number
  /** Standard cost of a product per stock unit */
  standardCost?: number
  /** Date on which the record was first created */
  creationDate: number
  /** Name of a file containing a picture */
  picture?: string
  /** 0 if manual allocation required; 1 if automatic allocation. */
  manualAllocation: number
  /** The user entering or last updating the record */
  changeUser: string
  /** Date record was last updated */
  changeDate: number
  stugad?: string
  /** The standard selling price for a product per stock unit */
  standardPrice?: number
  /** Date price was last reviewed */
  priceReviewDate?: number
  /** Uniquely identifies a supplier */
  supplierAccount?: string
  /** Allocation safety margin (days) (default to 0 ) */
  safetyMargin?: number
  /** VAT code */
  vatCode: string
  /** Foreign key to TEXT_STORAGE table-relates to technical notes */
  techNotesNumber?: number
  /** The date the entity was last used */
  lastUsed?: number
  /** 1st product key - A means of categorising products */
  productKey1?: string
  /** 2nd product key - A means of categorising products */
  productKey2?: string
  /** 3rd product key - A means of categorising products */
  productKey3?: string
  /** 4th product key - A means of categorising products */
  productKey4?: string
  /** 5th product key - A means of categorising products */
  productKey5?: string
  /** 6th product key - A means of categorising products */
  productKey6?: string
  /** 0 =exclude from group costing, 1= include in group costing */
  groupCosting?: number
  /** 0=not ship and debit,1=ship and debit */
  shipAndDebit: number
  /** 1=default to not fixed but user may over ride 2=default to fixed but user may not over ride 3-default to not fixed user may not over ride 4=default to fixed user may not over ride */
  fixedPrice?: number
  /** 0=not price support, 1=price support item */
  priceSupport: number
  /** 0=not a royalty product,1=royalty product */
  royaltyProduct: number
  /** 0=components only,1=print kit also */
  printKitDespatch?: number
  /** 0=Print ONLY the kit on the sales invoice, 1= 'Print the kit product AND components
   */
  printKitInvoice?: number
  technicalDiscount?: number
  /** 0=cannot substitute 1=can substitut */
  autoSubstitution: number
  /** product key 7 - has a fixed name */
  tariffCode?: string
  /** text storage reference number for special text */
  specialText?: number
  /** 0=not main product,1=main product -for item line association */
  mainProduct?: number
  /** User defined field can appear on stock or sales button of product maintenance
   */
  definedKey_1?: string
  /** User defined field can appear on stock or sales button of product maintenance
   */
  definedKey_2?: string
  /** User defined field can appear on stock or sales button of product maintenance
   */
  definedKey_3?: string
  /** User defined field can appear on stock or sales button of product maintenance
   */
  definedKey_4?: string
  /** User defined field can appear on stock or sales button of product maintenance
   */
  definedKey_5?: string
  /** User defined field can appear on stock or sales button of product maintenance
   */
  definedKey_6?: string
  /** 0=RMA allowed, 1= no RMA allowed */
  noRmaAllowed: number
  /** User defined product field */
  definedAnalysis_1?: string
  /** User defined product field */
  definedAnalysis_2?: string
  /** User defined product field */
  definedAnalysis_3?: string
  /** User defined product field */
  definedAnalysis_4?: string
  /** User defined product field */
  definedAnalysis_5?: string
  /** User defined product field */
  definedAnalysis_6?: string
  /** Max order quantity in default sales units */
  maxQuantity?: number
  /** Re-order quantity in default sales units */
  reorderQuantity?: number
  /** 1=manufactured product, 0= not manufactured */
  manufProduct: number
  /** Manufacture lead time days */
  manufLeadTime?: number
  /** Manufacture build time days */
  manufBuildTime?: number
  /** 1=parts list may vary, 0=parts list fixed */
  variablePartsList?: number
  /** Text ref entry for build instructions for manufactured item */
  buildText?: number
  /** Minimum build quantity - stock units */
  minManufQty?: number
  rebateValue?: number
  /** Guaranteed percentage */
  guaranteedPercentage?: number
  /** Minimum sales quantity - stock units */
  minSalesQty?: number
  /** pack size */
  packSize?: number
  /** 1=Item is linked to a service product,0=not linked */
  linkedService?: string
  /** Product may be linked to a service product */
  linkedServiceProduct?: string
  /** 0=no,1=margin enhancmnt,2=guarantee margin,3=guaratee mrkup */
  agreementType?: number
  /** Allowable tolerance for receipt discrepancies */
  receiptTolerance?: number
  /** Unit code of the main pricing unit */
  mainPricingUnit: string
  /** product key */
  productKey7?: string
  /** product key */
  productKey8?: string
  /** product key */
  productKey9?: string
  /** product key */
  productKey10?: string
  /** product key */
  productKey11?: string
  /** product key */
  productKey12?: string
  /** product key */
  productKey13?: string
  /** product key */
  productKey14?: string
  /** product key */
  productKey15?: string
  /** product key */
  productKey16?: string
  /** product key */
  productKey17?: string
  /** product key */
  productKey18?: string
  /** product key */
  productKey19?: string
  /** product key */
  productKey20?: string
  /** product key */
  productKey21?: string
  /** product key */
  productKey22?: string
  /** product key */
  productKey23?: string
  /** product key */
  productKey24?: string
  /** product key */
  productKey25?: string
  /** product key */
  productKey26?: string
  /** 1=automatically generate batch id  0=manually generate batch */
  batchAutoEntry?: number
  /** 1=combination pricing applies 0=no combination pricing */
  combinationPricing?: number
  standardPackageSize?: number
  /** Customs rate code */
  customsCode?: string
  /** Excise duty rate code */
  exciseCode?: string
  /** strength factor for customs duty */
  strengthFactor?: number
  /** part of customs duty calculation */
  aParameter?: number
  /** part of customs duty calculation */
  bParameter?: number
  /** Internal volume */
  internalVolume?: number
  /** 0=ml 1=cl 2=litres */
  volEntryUnit?: number
  /** 1= unique batch putaway control, 0 = non-unique batch putaway   */
  batchPutaway?: number
  /** 0=back orders allowed, 1=not allowed, 2=not allowed nut back to backs allowed, 3=take system default */
  backOrders?: number
  /** 1=Obsolete product; 0=Not obsolete */
  obsolete?: number
  /** 0=not superseded. 1 =superseded. 2= top of the supersession list. */
  superseded?: number
  /** style */
  styleCode?: string
  /** Colour */
  colourCode?: string
  /** size */
  size1Value?: string
  /** size */
  size2Value?: string
  sizeSequence1?: number
  sizeSequence2?: number
  despatchType?: string
  shipDirect?: number
  serviceSubType?: number
  messageType?: number
  messageStartDate?: number
  messageEndDate?: number
  poMessage?: number
  poMessageStartDate?: number
  poMessageEndDate?: number
  usageRecordType?: string
  disassemble?: number
  freeFlow?: number
  countryOfOrigin?: string
  ageRestricted?: number
}
