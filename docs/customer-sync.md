# Ultra-Fast Customer Sync

High-performance Oracle to PostgreSQL customer data synchronisation using PostgreSQL COPY command and BullMQ job queues.

## Performance

- **Full Sync**: ~100,000 records/second
- **Incremental Sync**: ~50,000 records/second
- **Memory Efficient**: Streaming data, minimal memory footprint
- **Fault Tolerant**: Automatic retries, graceful error handling

## Architecture

```
Oracle DB → Stream Reader → CSV Formatter → PostgreSQL COPY → Search Table
                                                        ↓
BullMQ Queue ← API Trigger ← Scheduler ← Worker ← Job Status
```

## Usage

### Console Commands

```bash
# Full sync (replaces all data)
npm run sync:customers:full

# Incremental sync (last 24 hours)
npm run sync:customers:incremental

# Incremental sync since specific date
npm run sync:customers -- --mode incremental --since 2024-01-01

# Help
npm run sync:customers -- --help
```

### API Endpoints

#### Trigger Sync
```bash
# Full sync
curl -X POST /api/sync/customer \
  -H "Content-Type: application/json" \
  -d '{"type": "full", "triggeredBy": "Manual"}'

# Incremental sync
curl -X POST /api/sync/customer \
  -H "Content-Type: application/json" \
  -d '{"type": "incremental", "triggeredBy": "API"}'

# Incremental since date
curl -X POST /api/sync/customer \
  -H "Content-Type: application/json" \
  -d '{"type": "incremental", "since": "2024-01-01T00:00:00Z"}'
```

#### Check Status
```bash
curl /api/sync/customer-status
```

#### Schedule Recurring Jobs
```bash
curl -X POST /api/sync/customer-schedule
```

### BullMQ Integration

```typescript
import { CustomerSyncScheduler } from '~/server/jobs/customer-sync-jobs'

// Schedule jobs programmatically
await CustomerSyncScheduler.scheduleFullSync('Background Job')
await CustomerSyncScheduler.scheduleIncrementalSync(new Date(), 'Webhook')

// Get queue statistics
const stats = await CustomerSyncScheduler.getQueueStats()
```

## Configuration

### Environment Variables

```bash
# Enable/disable sync worker
ENABLE_SYNC_WORKER=true

# Enable automatic recurring jobs
ENABLE_RECURRING_SYNC=false

# PostgreSQL connection
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=magwebapp_dev
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres

# Redis connection (for BullMQ)
REDIS_HOST=localhost
REDIS_PORT=6379
```

### Recurring Schedule

When `ENABLE_RECURRING_SYNC=true`:
- **Incremental Sync**: Every hour (`0 * * * *`)
- **Full Sync**: Daily at 2 AM (`0 2 * * *`)

## Data Mapping

### Source Tables (Oracle)
- `MAGINUS.CUSTOMER` - Core customer data
- `MAGINUS.CUSTOMER_ADDRESS` - Address information
- `MAGINUS.CUSTOMER_CONTACT` - Contact details

### Target Table (PostgreSQL)
- `customer_search` - Optimised search table with:
  - Full-text search vector
  - Multiple indexes for fast queries
  - Automatic trigger maintenance

### Field Mapping

| Oracle Field | PostgreSQL Field | Type | Notes |
|--------------|------------------|------|-------|
| `CUSTOMER_ACCOUNT` | `customer_account` | VARCHAR(10) | Primary key |
| `CUSTOMER_NAME` | `customer_name` | VARCHAR(100) | Indexed |
| `SALES_OFFICE` | `sales_office` | VARCHAR(6) | Indexed |
| `ADDRESS_1` | `address_1` | VARCHAR(100) | From ADDRESS table |
| `POSTCODE` | `postcode` | VARCHAR(20) | Indexed |
| `TELEPHONE` | `telephone` | VARCHAR(30) | From CONTACT table |
| `EMAIL` | `email` | VARCHAR(256) | From CONTACT table |
| - | `search_vector` | TEXT | Auto-generated FTS |

## Monitoring

### BullMQ Dashboard
- URL: http://localhost:3001
- View job queues, progress, failures
- Retry failed jobs manually

### Queue Statistics
```typescript
const stats = await CustomerSyncScheduler.getQueueStats()
// Returns: { waiting, active, completed, failed, delayed }
```

### Logs
```bash
# View sync progress
docker-compose logs -f nuxt-app

# View job worker logs
docker-compose logs -f bullmq-board
```

## Performance Tuning

### Database Optimisation
```sql
-- Increase work_mem for large operations
SET work_mem = '256MB';

-- Disable autovacuum during bulk load
ALTER TABLE customer_search SET (autovacuum_enabled = false);

-- Re-enable after sync
ALTER TABLE customer_search SET (autovacuum_enabled = true);
```

### Connection Pooling
```typescript
// PostgreSQL pool settings
max: 10,           // Maximum connections
idle_timeout: 20,  // Idle connection timeout
connect_timeout: 10 // Connection timeout
```

### Memory Management
```typescript
// Process large datasets in chunks
const chunkSize = 10000; // Adjust based on available memory
```

## Troubleshooting

### Common Issues

1. **Connection Timeouts**
   ```bash
   # Increase connection timeout
   POSTGRES_CONNECT_TIMEOUT=30000
   ```

2. **Memory Issues**
   ```bash
   # Reduce batch size
   SYNC_BATCH_SIZE=5000
   ```

3. **Lock Conflicts**
   ```bash
   # Use different table for sync, then swap
   ENABLE_TABLE_SWAP=true
   ```

### Debug Mode
```bash
LOG_LEVEL=debug npm run sync:customers:full
```

### Recovery
```bash
# Clear failed jobs
curl -X DELETE /api/sync/customer-queue

# Reset sync state
npm run db:migrate
```

## Best Practices

1. **Initial Setup**
   - Run full sync during low-traffic hours
   - Monitor memory usage during first run
   - Verify data accuracy with sample queries

2. **Production**
   - Use incremental sync for regular updates
   - Schedule full sync weekly/monthly
   - Monitor queue statistics

3. **Error Handling**
   - Failed jobs automatically retry 3 times
   - Check BullMQ dashboard for persistent failures
   - Monitor application logs

4. **Performance**
   - Full sync: Run during maintenance windows
   - Incremental: Can run continuously
   - Monitor PostgreSQL connection pool