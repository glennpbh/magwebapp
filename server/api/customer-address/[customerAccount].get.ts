import type { CustomerAddress } from '~/types/customer-address'

import { queryMultiple } from '../../db/query'

export default defineEventHandler(async (event) => {
  const customerAccount = getRouterParam(event, 'customerAccount')

  if (!customerAccount) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Customer account parameter is required'
    })
  }

  try {
    const customerAddresses = await queryMultiple<CustomerAddress>(
      `SELECT 
        CUSTOMER_ACCOUNT as customerAccount,
        ADDRESS_ID as addressId,
        ADDRESS_1 as address1,
        ADDRESS_2 as address2,
        ADDRESS_3 as address3,
        ADDRESS_4 as address4,
        ADDRESS_5 as address5,
        ADDRESS_6 as address6,
        PRIME_ADDRESS_LINE as primeAddressLine,
        POSTCODE as postcode,
        COUNTRY_CODE as countryCode,
        NORMAL_DESPATCH as normalDespatch,
        ROUTE as route,
        CHANGE_DATE as changeDate,
        CHANGE_USER as changeUser,
        PROSPECT_CUST_TYPE as prospectCustType,
        DELIVERY_TEXT_NUM as deliveryTextNum,
        DELIVERY_WAREHOUSE as deliveryWarehouse,
        LOCATION_REF as locationRef,
        ADDRESS_NAME as addressName,
        VALIDATION_STATUS as validationStatus
       FROM MAGINUS.CUSTOMER_ADDRESS 
       WHERE CUSTOMER_ACCOUNT = :customerAccount
       ORDER BY ADDRESS_ID`,
      { customerAccount }
    )

    return {
      success: true,
      data: customerAddresses
    }
  } catch (err) {
    console.error('Customer addresses lookup error:', err)

    if (err instanceof Error && err.message.includes('statusCode')) {
      throw err
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to retrieve customer addresses'
    })
  }
})