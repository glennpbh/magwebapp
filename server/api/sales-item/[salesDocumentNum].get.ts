import type { SalesItem } from '~/types/sales-item'

import { queryMultiple } from '../../db/query'

export default defineEventHandler(async (event) => {
  const salesDocumentNum = getRouterParam(event, 'salesDocumentNum')

  if (!salesDocumentNum) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Sales document number parameter is required'
    })
  }

  // Validate that salesDocumentNum is numeric
  const numericSalesDocumentNum = parseInt(salesDocumentNum)
  if (isNaN(numericSalesDocumentNum)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Sales document number must be a valid number'
    })
  }

  try {
    const salesItems = await queryMultiple<SalesItem>(
      `SELECT 
        SALES_DOCUMENT_NUM as salesDocumentNum,
        SALES_ITEM_NUM as salesItemNum,
        PRODUCT_CODE as productCode,
        LONG_DESCRIPTION_1 as longDescription_1,
        LONG_DESCRIPTION_2 as longDescription_2,
        UNIT_PRICE as unitPrice,
        UNIT_CODE as unitCode,
        DISCOUNT_PERC as discountPerc,
        PRICE_TYPE as priceType,
        SALES_ITEM_TYPE as salesItemType,
        STATUS as status,
        PRIORITY as priority,
        ORDER_DATE as orderDate,
        VAT_CODE as vatCode,
        PARCEL_NUM as parcelNum,
        FIXED_PRICE as fixedPrice,
        CHANGE_DATE as changeDate,
        CHANGE_USER as changeUser,
        REQUIRED_DATE as requiredDate,
        DESPATCH_TYPE as despatchType,
        SALES_RQD_QUANTITY as salesRqdQuantity,
        ORDER_TYPE as orderType,
        PRICE_LIST as priceList,
        DELIVERY_TERM as deliveryTerm,
        INVOICE_DATE as invoiceDate,
        TEXT_NUMBER as textNumber,
        TOTAL_DELIVERY as totalDelivery,
        GROSS_COST as grossCost,
        MARGIN_PERCENT as marginPercent,
        REASON_CODE as reasonCode,
        KIT_PRODUCT as kitProduct,
        ACKNOWL_TEXT as acknowlText,
        DESPATCH_TEXT as despatchText,
        INVOICE_TEXT as invoiceText,
        MAIN_PRODUCT as mainProduct,
        ASSOCIATE as associate,
        PROFORMA as proforma,
        PREP_SHEET_REQUIRED as prepSheetRequired,
        PREP_SHEET_COUNT as prepSheetCount,
        DESPATCHED_QTY as despatchedQty,
        RMA_NUM as rmaNum,
        RELEASED as released,
        ORDER_QUANTITY as orderQuantity,
        ORDER_UNIT as orderUnit,
        NET_PRICE as netPrice,
        BASE_NET_PRICE as baseNetPrice,
        RMA_ITEM_NUM as rmaItemNum,
        ORDER_UNIT_WEIGHT as orderUnitWeight,
        WEIGHT_ENTRY_UNIT as weightEntryUnit,
        WAREHOUSE_TRANSFER as warehouseTransfer,
        LINKED_SERVICE as linkedService,
        PRINT_SERVICE as printService,
        LINKED_ITEM_NUM as linkedItemNum,
        PRODUCT_WEIGHT as productWeight,
        LINE_WEIGHT as lineWeight,
        PROMISE_DATE as promiseDate,
        RETRO_DISCOUNT_PERC as retroDiscountPerc,
        TRANSPORT_CHARGE as transportCharge,
        SUB_CONTRACT as subContract,
        DELIVERY_ON_BEHALF as deliveryOnBehalf,
        LINKED_ACCESSORY as linkedAccessory,
        COMBINATION_PRICING as combinationPricing,
        DISCOUNT_LIST as discountList,
        COMB_DISCOUNT_PERC as combDiscountPerc,
        COMB_DISCOUNT_VALUE as combDiscountValue,
        BONUS_REDEEMED as bonusRedeemed,
        BONUS_EARNED as bonusEarned,
        PROMOTION_CODE as promotionCode,
        PROMOTION as promotion,
        REFUND_REQUIRED as refundRequired,
        REFUND_ISSUED as refundIssued,
        OBSOLETE as obsolete,
        ORIGINAL_ORDER_QUANTITY as originalOrderQuantity,
        ORIGINAL_NET_PRICE as originalNetPrice,
        MEDIA_CODE as mediaCode,
        ORIG_PRODUCT as origProduct,
        NET_LINE_VALUE as netLineValue,
        SUBSTITUTE_REASON as substituteReason,
        ENTERED_PRICE as enteredPrice,
        PRICE_DERIVATION as priceDerivation,
        PROMOTION_PRICE as promotionPrice,
        PROMOTION_DISCOUNT as promotionDiscount,
        CUSTOMER_DISCOUNT as customerDiscount,
        CUSTOMER_DISCOUNT_TYPE as customerDiscountType,
        UDF_GROUP as udfGroup,
        DELIVERY_GROUP as deliveryGroup,
        ORIG_SALES_DOCUMENT_NUM as origSalesDocumentNum,
        ORIG_SALES_ITEM_NUM as origSalesItemNum,
        BACK_ORDERED as backOrdered,
        DESPATCH_TYPE_METHOD as despatchTypeMethod,
        SHIP_DIRECT as shipDirect,
        SALES_ADDRESS_NUM as salesAddressNum,
        LOST_REASON as lostReason,
        LOST_REASON_TEXT as lostReasonText,
        SALES_TAX as salesTax,
        ORG_DESPATCH_TYPE as orgDespatchType
       FROM MAGINUS.SALES_ITEM 
       WHERE SALES_DOCUMENT_NUM = :salesDocumentNum
       ORDER BY SALES_ITEM_NUM`,
      { salesDocumentNum: numericSalesDocumentNum }
    )

    return {
      success: true,
      data: salesItems
    }
  } catch (err) {
    console.error('Sales items lookup error:', err)

    if (err instanceof Error && err.message.includes('statusCode')) {
      throw err
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to retrieve sales items'
    })
  }
})
