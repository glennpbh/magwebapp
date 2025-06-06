#!/usr/bin/env node

import { fastCustomerSync } from '../server/services/fast-customer-sync'

interface SyncOptions {
  mode: 'full' | 'incremental'
  since?: string
  help?: boolean
}

function parseArgs(): SyncOptions {
  const args = process.argv.slice(2)
  const options: SyncOptions = { mode: 'full' }

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    
    switch (arg) {
      case '--mode':
        options.mode = args[i + 1] as 'full' | 'incremental'
        i++
        break
      case '--since':
        options.since = args[i + 1]
        i++
        break
      case '--help':
      case '-h':
        options.help = true
        break
    }
  }

  return options
}

function showHelp() {
  console.log(`
🚀 Ultra-Fast Customer Sync

Usage: npm run sync:customers [options]

Options:
  --mode <full|incremental>  Sync mode (default: full)
  --since <date>            For incremental sync, date in ISO format
  --help, -h                Show this help

Examples:
  npm run sync:customers --mode full
  npm run sync:customers --mode incremental --since 2024-01-01
  npm run sync:customers --mode incremental  # Last 24 hours

Performance:
  - Full sync: ~100,000 records/second
  - Incremental: ~50,000 records/second
  - Uses PostgreSQL COPY for maximum speed
`)
}

async function main() {
  const options = parseArgs()

  if (options.help) {
    showHelp()
    process.exit(0)
  }

  console.log('🚀 Ultra-Fast Customer Sync Tool')
  console.log('==================================')
  console.log(`Mode: ${options.mode}`)
  
  if (options.since) {
    console.log(`Since: ${options.since}`)
  }
  
  console.log('')

  try {
    let result

    if (options.mode === 'full') {
      result = await fastCustomerSync.fullSync()
      
      console.log('')
      console.log('📊 Full Sync Results:')
      console.log(`   Total Records: ${result.totalRecords.toLocaleString()}`)
      console.log(`   Sync Time: ${result.syncTime}s`)
      console.log(`   Speed: ${result.recordsPerSecond.toLocaleString()} records/sec`)
      
    } else {
      const sinceDate = options.since ? new Date(options.since) : undefined
      result = await fastCustomerSync.incrementalSync(sinceDate)
      
      console.log('')
      console.log('📊 Incremental Sync Results:')
      console.log(`   Total Records: ${result.totalRecords.toLocaleString()}`)
      console.log(`   Sync Time: ${result.syncTime}s`)
    }

    console.log('')
    console.log('✅ Sync completed successfully!')
    
  } catch (error) {
    console.error('')
    console.error('❌ Sync failed:')
    console.error(error)
    process.exit(1)
    
  } finally {
    await fastCustomerSync.close()
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...')
  await fastCustomerSync.close()
  process.exit(0)
})

process.on('SIGTERM', async () => {
  console.log('\n🛑 Shutting down gracefully...')
  await fastCustomerSync.close()
  process.exit(0)
})

// Run if called directly
if (require.main === module) {
  main().catch(console.error)
}

export default main