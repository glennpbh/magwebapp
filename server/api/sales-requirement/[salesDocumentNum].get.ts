import type { SalesRequirement } from '~/types/sales-requirement'

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
    const salesRequirements = await queryMultiple<SalesRequirement>(
      `SELECT 
        SALES_DOCUMENT_NUM as salesDocumentNum,
        SALES_ITEM_NUM as salesItemNum,
        WAREHOUSE_CODE as warehouseCode,
        REQUIRED_DATE as requiredDate,
        EXPECTED_DESPATCH as expectedDespatch,
        ALLOCATED_QUANTITY as allocatedQuantity,
        PO_ORDER_NUMBER as poOrderNumber,
        PO_ITEM_NUMBER as poItemNumber,
        REQUISITION_NUM as requisitionNum,
        CHANGE_DATE as changeDate,
        CHANGE_USER as changeUser,
        PRODUCT_CODE as productCode,
        SALES_RQD_QUANTITY as salesRqdQuantity,
        STOCK_RQD_QUANTITY as stockRqdQuantity,
        ORDER_TYPE as orderType,
        DEMAND_UPDATE as demandUpdate,
        STATUS as status,
        FIRST_PROMISE as firstPromise,
        PROMISE_DATE as promiseDate,
        NUM_PROMISE_UPDATES as numPromiseUpdates,
        ASSEMBLY_COUNT as assemblyCount,
        KIT_PRODUCT_CODE as kitProductCode,
        AUTO_SUBSTITUTION as autoSubstitution,
        MAIN_PRODUCT as mainProduct,
        ASSOCIATE as associate,
        ORDER_QUANTITY as orderQuantity,
        TRANSFER_NUMBER as transferNumber,
        ALLOCATED_TO_BACK as allocatedToBack,
        GROSS_COST as grossCost,
        SUBSTITUTE_ALERT_SENT as substituteAlertSent,
        ALLOCATED_DATE as allocatedDate,
        STOCK_SUBSTATUS as stockSubstatus,
        STOCK_RESTRICT as stockRestrict
       FROM MAGINUS.SALES_REQUIREMENT 
       WHERE SALES_DOCUMENT_NUM = :salesDocumentNum
       ORDER BY SALES_ITEM_NUM, WAREHOUSE_CODE`,
      { salesDocumentNum: numericSalesDocumentNum }
    )

    return {
      success: true,
      data: salesRequirements
    }
  } catch (err) {
    console.error('Sales requirements lookup error:', err)

    if (err instanceof Error && err.message.includes('statusCode')) {
      throw err
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to retrieve sales requirements'
    })
  }
})
