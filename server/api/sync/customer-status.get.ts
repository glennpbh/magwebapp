import { CustomerSyncScheduler } from '../../jobs/customer-sync-jobs'

export default defineEventHandler(async (event) => {
  try {
    const stats = await CustomerSyncScheduler.getQueueStats()
    
    return {
      success: true,
      queue: 'customer-sync',
      stats: {
        waiting: stats.waiting,
        active: stats.active,
        completed: stats.completed,
        failed: stats.failed,
        delayed: stats.delayed
      },
      isProcessing: stats.active > 0,
      lastUpdate: new Date().toISOString()
    }
    
  } catch (err) {
    console.error('Failed to get sync status:', err)
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to get sync status'
    })
  }
})