import { CustomerSyncScheduler } from '../../jobs/customer-sync-jobs'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { type = 'incremental', since, triggeredBy = 'API' } = body

  if (!['full', 'incremental'].includes(type)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid sync type. Must be "full" or "incremental"'
    })
  }

  try {
    let job

    if (type === 'full') {
      job = await CustomerSyncScheduler.scheduleFullSync(triggeredBy)
      
      return {
        success: true,
        message: 'Full customer sync scheduled',
        jobId: job.id,
        type: 'full'
      }
      
    } else {
      const sinceDate = since ? new Date(since) : undefined
      job = await CustomerSyncScheduler.scheduleIncrementalSync(sinceDate, triggeredBy)
      
      return {
        success: true,
        message: 'Incremental customer sync scheduled',
        jobId: job.id,
        type: 'incremental',
        since: sinceDate?.toISOString()
      }
    }
    
  } catch (err) {
    console.error('Failed to schedule customer sync:', err)
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to schedule customer sync'
    })
  }
})