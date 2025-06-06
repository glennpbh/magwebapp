# Docker Development Environment

This setup provides a complete development environment with PostgreSQL 17, Redis (for BullMQ), and monitoring tools.

## Services Included

| Service | Port | Purpose | Access |
|---------|------|---------|--------|
| PostgreSQL 17 | 5432 | Development database | `postgres://postgres:postgres@localhost:5432/magwebapp_dev` |
| Redis | 6379 | BullMQ job queue backend | `redis://localhost:6379` |
| pgAdmin | 5050 | PostgreSQL admin interface | http://localhost:5050 |
| BullMQ Board | 3001 | Job queue monitoring | http://localhost:3001 |
| Redis Commander | 8081 | Redis admin interface | http://localhost:8081 |

## Quick Start

1. **Start all services:**
   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   ```

2. **Check service status:**
   ```bash
   docker-compose -f docker-compose.dev.yml ps
   ```

3. **View logs:**
   ```bash
   docker-compose -f docker-compose.dev.yml logs -f [service-name]
   ```

4. **Stop all services:**
   ```bash
   docker-compose -f docker-compose.dev.yml down
   ```

## Access Credentials

### pgAdmin
- **URL:** http://localhost:5050
- **Email:** admin@localhost.com
- **Password:** admin

### Redis Commander
- **URL:** http://localhost:8081
- **Username:** admin
- **Password:** admin

### PostgreSQL
- **Host:** localhost:5432
- **Database:** magwebapp_dev
- **Username:** postgres
- **Password:** postgres

## Data Persistence

All service data is persisted in Docker volumes:
- `magwebapp_postgres_data` - PostgreSQL data
- `magwebapp_redis_data` - Redis data
- `magwebapp_pgadmin_data` - pgAdmin configuration

## Environment Configuration

1. Copy the environment template:
   ```bash
   cp .env.dev.example .env.dev
   ```

2. Update the values in `.env.dev` as needed for your development setup.

## Database Initialization

The PostgreSQL container automatically runs scripts in `docker/postgres/init/` on first startup. This includes:
- Creating extensions (uuid-ossp, pg_trgm)
- Setting up a sample job_logs table for BullMQ analytics
- Any additional schema setup you need

## Monitoring

- **BullMQ Board:** Monitor job queues, view failed jobs, retry jobs
- **Redis Commander:** Inspect Redis keys, monitor memory usage
- **pgAdmin:** Manage PostgreSQL databases, run queries, view performance

## Development Workflow

1. Start the development environment
2. Configure your Nuxt app to use PostgreSQL for development
3. Keep Oracle for production data access
4. Use BullMQ for background jobs (reports, notifications, etc.)
5. Monitor queues and database through the provided tools

## Troubleshooting

- **Services won't start:** Check if ports are already in use
- **Database connection issues:** Ensure PostgreSQL health check passes
- **Redis connection issues:** Check Redis container logs
- **Data persistence:** Volumes are named and will persist between restarts