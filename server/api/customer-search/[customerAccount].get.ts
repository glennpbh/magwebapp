import { customerSyncService } from '../../services/customer-sync'

export default defineEventHandler(async (event) => {
  const customerAccount = getRouterParam(event, 'customerAccount')

  if (!customerAccount) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Customer account parameter is required'
    })
  }

  try {
    const customer = await customerSyncService.getCustomer(customerAccount)

    if (!customer) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Customer not found'
      })
    }

    return {
      success: true,
      data: customer
    }
  } catch (err) {
    console.error('Customer lookup error:', err)

    if (err instanceof Error && err.message.includes('statusCode')) {
      throw err
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to retrieve customer'
    })
  }
})