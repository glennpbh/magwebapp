/**
 * Sales item details
 */
export interface SalesItem {
  /** Document number */
  salesDocumentNum: number
  /** Sales Order Item Number */
  salesItemNum: number
  /** Uniquely identifies a product */
  productCode?: string
  /** Detailed description  (first line) */
  longDescription_1?: string
  /** Detailed description of a product (second line) */
  longDescription_2?: string
  /** Gross price  (before discount/surcharge) per pricing unit in document currency */
  unitPrice?: number
  /** Pricing Unit */
  unitCode?: string
  /** Percentage discount. */
  discountPerc?: number
  /** 1=Customer;2=list;3=standard;4=manual */
  priceType?: number
  /** 1=Standard, 2=scheduled, 3=direct, 4=back to back. */
  salesItemType?: number
  /** 0=Incomplete, 1=Held, 2=Cancelled, 3=Complete, 4=Despatched not fully invoiced, 5=Fully invoiced */
  status?: number
  /** Cust/Whouse=priority level,printer_map- 1=normal,else lower */
  priority?: number
  /** Date of an order */
  orderDate?: number
  /** VAT code */
  vatCode?: string
  /** Obsolete column */
  parcelNum?: number
  /** 0=param 531,1=not fixed amendable,2=fixed amend,  see detail */
  fixedPrice?: number
  /** Date record was last updated */
  changeDate?: number
  /** The user entering or last updating the record */
  changeUser?: string
  /** The date the goods are required by. */
  requiredDate?: number
  /** Uniquely identifies a despatch type */
  despatchType?: string
  /** Required quantity based in sales pricing units */
  salesRqdQuantity?: number
  /** 0=Order; 1=Quote; 3=Works Order;  4=transfer 5=call off */
  orderType?: number
  /** Unique identifier of a price list */
  priceList?: string
  /** unique identifier for delivery terms */
  deliveryTerm?: string
  /** Invoice date */
  invoiceDate?: number
  /** Unique identifier of a text storage record. */
  textNumber?: number
  /** 1=total delivery only; 0=part shipment allowed */
  totalDelivery?: number
  /** not used */
  grossCost?: number
  /** profit margin percentage */
  marginPercent?: number
  /** Uniquely identifies a reason code */
  reasonCode?: string
  /** 0 = Not a kit ; 1= part of a kit */
  kitProduct?: number
  /** Text storage number for acknowledgement text */
  acknowlText?: number
  /** Text storage number for despatch not text */
  despatchText?: number
  /** text storage number for invoice text */
  invoiceText?: number
  /** 0=not main product,1=main product -for item line association */
  mainProduct?: number
  /** 0=no line assoc. else sequential no. for each group of items */
  associate?: number
  /** Indicates whether a proforma invoice is required(0=NO,1=YES) */
  proforma?: number
  /** 0=prep sheet not required, 1= prep sheet required */
  prepSheetRequired?: number
  /** number of times prep sheet has been printed */
  prepSheetCount?: number
  /** Quantity despatched in sales unit */
  despatchedQty?: number
  /** Uniquely identifies a customer return */
  rmaNum?: number
  /** 0=not released by credit control, 1=released */
  released?: number
  /** Quantity in sales order unit */
  orderQuantity?: number
  /** Unit in which the order has been placed */
  orderUnit?: string
  /** price per pricing unit after discount/surcharge in document currency */
  netPrice?: number
  /** Net price in system base currency (pricing unit) */
  baseNetPrice?: number
  /** Uniquely identifies a returned item within a customer return */
  rmaItemNum?: number
  /** Unit weight in the units on the order */
  orderUnitWeight?: number
  /** Unit that weight was entered in: 1 kilo, 0 gramme, 2 tonne */
  weightEntryUnit?: number
  /** 1=warehouse transfer 0=non-warehouse transfer */
  warehouseTransfer?: number
  /** 1=Item is linked to a service product,0=not linked */
  linkedService?: number
  /** 0=do not print service products,1=print service products */
  printService?: number
  /** Item linked to this item */
  linkedItemNum?: number
  /** Unit weight */
  productWeight?: number
  /** Order line weight */
  lineWeight?: number
  /** Current promise delivery date */
  promiseDate?: number
  /** Retrospective rebate percentage */
  retroDiscountPerc?: number
  /** Transport Charge */
  transportCharge?: number
  /** 1=sub-contract 0=not a sub contract */
  subContract?: number
  /** 1=Delivered from one warehouse on behalf of another */
  deliveryOnBehalf?: number
  /** 1=linked accessory 0=not linked */
  linkedAccessory?: number
  /** 1=combination pricing applies 0=no combination pricing */
  combinationPricing?: number
  /** Discount List Code */
  discountList?: string
  /** Combination discount percentage */
  combDiscountPerc?: number
  /** Combination discount value */
  combDiscountValue?: number
  /** The number of bonus points redeemed against this sales item. */
  bonusRedeemed?: number
  /** The number of bonus points earned against this sales item. */
  bonusEarned?: number
  /** Promotion code */
  promotionCode?: string
  /** 1=promotion item, 0=non-promotion item */
  promotion?: number
  /** 1=refund require 0=no refund required */
  refundRequired?: number
  /** 1=refund issued 0=refund not issued */
  refundIssued?: number
  /** 1=obsolete 0=not obsolete */
  obsolete?: number
  /** Original quantity in sales order units */
  originalOrderQuantity?: number
  /** Original price at time of order */
  originalNetPrice?: number
  /** Catalogue source */
  mediaCode?: string
  /** Product auto-substituted */
  origProduct?: string
  netLineValue?: number
  /** Reason auto-substituted1 - Alteration2 - Automatic3 - Special Offer (lucky dip) */
  substituteReason?: number
  enteredPrice?: number
  priceDerivation?: number
  promotionPrice?: number
  promotionDiscount?: number
  customerDiscount?: number
  customerDiscountType?: number
  udfGroup?: string
  deliveryGroup?: number
  origSalesDocumentNum?: number
  origSalesItemNum?: number
  backOrdered?: number
  despatchTypeMethod?: number
  shipDirect?: number
  salesAddressNum?: number
  lostReason?: string
  lostReasonText?: number
  salesTax?: number
  orgDespatchType?: string
}
