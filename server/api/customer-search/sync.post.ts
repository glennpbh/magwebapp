import { customerSyncService } from '../../services/customer-sync'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const customerAccount = body?.customerAccount

  try {
    if (customerAccount) {
      // Sync single customer
      await customerSyncService.syncSingleCustomer(customerAccount)
      
      return {
        success: true,
        message: `Customer ${customerAccount} synced successfully`
      }
    } else {
      // Sync all customers
      const result = await customerSyncService.syncAllCustomers()
      
      return {
        success: true,
        message: 'Customer sync completed',
        synced: result.synced,
        errors: result.errors
      }
    }
  } catch (err) {
    console.error('Customer sync error:', err)

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to sync customers'
    })
  }
})