import { CustomerSyncScheduler } from '../../jobs/customer-sync-jobs'

export default defineEventHandler(async (event) => {
  try {
    await CustomerSyncScheduler.scheduleRecurringSync()
    
    return {
      success: true,
      message: 'Recurring customer sync jobs scheduled',
      schedule: {
        incremental: 'Every hour (0 * * * *)',
        full: 'Daily at 2 AM (0 2 * * *)'
      }
    }
    
  } catch (err) {
    console.error('Failed to schedule recurring sync:', err)
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to schedule recurring sync jobs'
    })
  }
})