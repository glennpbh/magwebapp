import { customerSyncService } from '../../services/customer-sync'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const searchTerm = query.q as string
  const limit = parseInt((query.limit as string) || '50')

  if (!searchTerm || searchTerm.trim().length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Search term is required'
    })
  }

  if (searchTerm.trim().length < 2) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Search term must be at least 2 characters'
    })
  }

  try {
    const customers = await customerSyncService.searchCustomers(searchTerm, limit)

    return {
      success: true,
      data: customers,
      count: customers.length,
      searchTerm
    }
  } catch (err) {
    console.error('Customer search error:', err)

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to search customers'
    })
  }
})