import { Queue, Worker, Job } from 'bullmq'
import IORedis from 'ioredis'

import { fastCustomerSync } from '../services/fast-customer-sync'

// Redis connection
const redis = new IORedis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD || undefined,
  maxRetriesPerRequest: 3
})

// Job types
export interface FullSyncJobData {
  type: 'full'
  triggeredBy?: string
}

export interface IncrementalSyncJobData {
  type: 'incremental'
  since?: string
  triggeredBy?: string
}

export type CustomerSyncJobData = FullSyncJobData | IncrementalSyncJobData

// Customer sync queue
export const customerSyncQueue = new Queue<CustomerSyncJobData>(
  'customer-sync',
  {
    connection: redis,
    defaultJobOptions: {
      removeOnComplete: 10, // Keep last 10 completed jobs
      removeOnFail: 50, // Keep last 50 failed jobs
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 5000
      }
    }
  }
)

// Worker to process sync jobs
export const customerSyncWorker = new Worker<CustomerSyncJobData>(
  'customer-sync',
  async (job: Job<CustomerSyncJobData>) => {
    const { data } = job

    console.log(`🚀 Starting ${data.type} customer sync job...`)
    console.log(`   Job ID: ${job.id}`)
    console.log(`   Triggered by: ${data.triggeredBy || 'Unknown'}`)

    try {
      // Update job progress
      await job.updateProgress(10)

      let result: any

      if (data.type === 'full') {
        await job.updateProgress(20)
        result = await fastCustomerSync.fullSync()
        
        await job.updateProgress(100)
        
        console.log(`✅ Full sync completed:`)
        console.log(`   Records: ${result.totalRecords.toLocaleString()}`)
        console.log(`   Time: ${result.syncTime}s`)
        console.log(`   Speed: ${result.recordsPerSecond.toLocaleString()} records/sec`)
        
        return {
          type: 'full',
          ...result,
          completedAt: new Date().toISOString()
        }
        
      } else {
        await job.updateProgress(20)
        
        const sinceDate = data.since ? new Date(data.since) : undefined
        result = await fastCustomerSync.incrementalSync(sinceDate)
        
        await job.updateProgress(100)
        
        console.log(`✅ Incremental sync completed:`)
        console.log(`   Records: ${result.totalRecords.toLocaleString()}`)
        console.log(`   Time: ${result.syncTime}s`)
        
        return {
          type: 'incremental',
          ...result,
          since: data.since,
          completedAt: new Date().toISOString()
        }
      }
      
    } catch (error) {
      console.error(`❌ Customer sync job ${job.id} failed:`, error)
      throw error
    }
  },
  {
    connection: redis,
    concurrency: 1, // Only run one sync at a time
    limiter: {
      max: 1, // Maximum 1 job per duration
      duration: 30000 // 30 seconds
    }
  }
)

// Job scheduling functions
export class CustomerSyncScheduler {
  /**
   * Schedule a full sync
   */
  static async scheduleFullSync(triggeredBy = 'Manual'): Promise<Job<FullSyncJobData>> {
    return await customerSyncQueue.add(
      'full-sync',
      {
        type: 'full',
        triggeredBy
      },
      {
        priority: 10 // High priority
      }
    )
  }

  /**
   * Schedule an incremental sync
   */
  static async scheduleIncrementalSync(
    since?: Date,
    triggeredBy = 'Manual'
  ): Promise<Job<IncrementalSyncJobData>> {
    return await customerSyncQueue.add(
      'incremental-sync',
      {
        type: 'incremental',
        since: since?.toISOString(),
        triggeredBy
      },
      {
        priority: 5 // Normal priority
      }
    )
  }

  /**
   * Schedule recurring incremental syncs
   */
  static async scheduleRecurringSync(): Promise<void> {
    // Every hour incremental sync
    await customerSyncQueue.add(
      'hourly-incremental',
      {
        type: 'incremental',
        triggeredBy: 'Scheduled-Hourly'
      },
      {
        repeat: {
          pattern: '0 * * * *' // Every hour
        },
        priority: 3
      }
    )

    // Daily full sync at 2 AM
    await customerSyncQueue.add(
      'daily-full',
      {
        type: 'full',
        triggeredBy: 'Scheduled-Daily'
      },
      {
        repeat: {
          pattern: '0 2 * * *' // Daily at 2 AM
        },
        priority: 8
      }
    )

    console.log('📅 Scheduled recurring customer sync jobs:')
    console.log('   - Incremental: Every hour')
    console.log('   - Full: Daily at 2 AM')
  }

  /**
   * Get queue statistics
   */
  static async getQueueStats(): Promise<{
    waiting: number
    active: number
    completed: number
    failed: number
    delayed: number
  }> {
    const waiting = await customerSyncQueue.getWaiting()
    const active = await customerSyncQueue.getActive()
    const completed = await customerSyncQueue.getCompleted()
    const failed = await customerSyncQueue.getFailed()
    const delayed = await customerSyncQueue.getDelayed()

    return {
      waiting: waiting.length,
      active: active.length,
      completed: completed.length,
      failed: failed.length,
      delayed: delayed.length
    }
  }

  /**
   * Clear all jobs
   */
  static async clearQueue(): Promise<void> {
    await customerSyncQueue.obliterate({ force: true })
    console.log('🗑️  Cleared customer sync queue')
  }
}

// Worker event handlers
customerSyncWorker.on('ready', () => {
  console.log('🔧 Customer sync worker is ready')
})

customerSyncWorker.on('completed', (job, result) => {
  console.log(`✅ Customer sync job ${job.id} completed`)
  console.log(`   Type: ${result.type}`)
  console.log(`   Records: ${result.totalRecords?.toLocaleString()}`)
})

customerSyncWorker.on('failed', (job, err) => {
  console.error(`❌ Customer sync job ${job?.id} failed:`, err.message)
})

customerSyncWorker.on('progress', (job, progress) => {
  console.log(`📈 Customer sync job ${job.id} progress: ${progress}%`)
})

// Export for cleanup
export async function closeSyncJobs(): Promise<void> {
  await customerSyncWorker.close()
  await customerSyncQueue.close()
  redis.disconnect()
  console.log('👋 Customer sync jobs closed')
}