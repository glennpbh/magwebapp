import type { SalesAddress } from '~/types/sales-address'

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
    const salesAddresses = await queryMultiple<SalesAddress>(
      `SELECT 
        SALES_DOCUMENT_NUM as salesDocumentNum,
        ORDER_TYPE as orderType,
        SALES_ADDRESS_NUM as salesAddressNum,
        COUNTRY_CODE as countryCode,
        ADDRESS_1 as address1,
        ADDRESS_2 as address2,
        ADDRESS_3 as address3,
        ADDRESS_4 as address4,
        ADDRESS_5 as address5,
        ADDRESS_6 as address6,
        POSTCODE as postcode,
        DELIVERY_TEXT_NUM as deliveryTextNum,
        CHANGE_DATE as changeDate,
        CHANGE_USER as changeUser,
        DELIVERY_NAME as deliveryName
       FROM MAGINUS.SALES_ADDRESS 
       WHERE SALES_DOCUMENT_NUM = :salesDocumentNum
       ORDER BY SALES_ADDRESS_NUM`,
      { salesDocumentNum: numericSalesDocumentNum }
    )

    return {
      success: true,
      data: salesAddresses
    }
  } catch (err) {
    console.error('Sales addresses lookup error:', err)

    if (err instanceof Error && err.message.includes('statusCode')) {
      throw err
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to retrieve sales addresses'
    })
  }
})
