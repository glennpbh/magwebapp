import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import * as schema from './schema'

// Create PostgreSQL connection
const connectionString = `postgresql://${process.env.POSTGRES_USER || 'postgres'}:${process.env.POSTGRES_PASSWORD || 'postgres'}@${process.env.POSTGRES_HOST || 'localhost'}:${process.env.POSTGRES_PORT || 5432}/${process.env.POSTGRES_DB || 'magwebapp_dev'}${process.env.POSTGRES_SSL === 'true' ? '?sslmode=require' : ''}`

// Create postgres client
const client = postgres(connectionString, {
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10
})

// Create Drizzle instance
export const db = drizzle(client, { schema })

// Export schema for use in other files
export { schema }

// Export types
export type Database = typeof db