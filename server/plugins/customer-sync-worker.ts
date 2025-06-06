import { customerSyncWorker, CustomerSyncScheduler } from '../jobs/customer-sync-jobs'

export default defineNitroPlugin(async (nitroApp) => {
  // Only start worker in production or when explicitly enabled
  const enableWorker = 
    process.env.NODE_ENV === 'production' || 
    process.env.ENABLE_SYNC_WORKER === 'true'

  if (!enableWorker) {
    console.log('🔧 Customer sync worker disabled (use ENABLE_SYNC_WORKER=true to enable)')
    return
  }

  console.log('🚀 Starting customer sync worker...')

  // Start the worker
  try {
    // Optional: Schedule recurring jobs on startup
    if (process.env.ENABLE_RECURRING_SYNC === 'true') {
      await CustomerSyncScheduler.scheduleRecurringSync()
    }

    console.log('✅ Customer sync worker started successfully')
    
  } catch (error) {
    console.error('❌ Failed to start customer sync worker:', error)
  }

  // Graceful shutdown
  nitroApp.hooks.hook('close', async () => {
    console.log('🛑 Shutting down customer sync worker...')
    try {
      await customerSyncWorker.close()
      console.log('✅ Customer sync worker closed gracefully')
    } catch (error) {
      console.error('❌ Error closing customer sync worker:', error)
    }
  })
})