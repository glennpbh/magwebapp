import oracledb from 'oracledb'

// Enable thin client mode (no Oracle client installation required)
oracledb.initOracleClient({ libDir: '' })

interface ConnectionConfig {
  user: string
  password: string
  connectString: string
}

let pool: oracledb.Pool | null = null

export async function initializePool(): Promise<void> {
  if (pool) {
    return
  }

  const connectionString = process.env.ORACLE_CONNECTION_STRING
  if (!connectionString) {
    throw new Error('ORACLE_CONNECTION_STRING environment variable is required')
  }

  // Parse connection string format: user/password@host:port/service_name
  const match = connectionString.match(/^(.+?)\/(.+?)@(.+)$/)
  if (!match) {
    throw new Error(
      'Invalid ORACLE_CONNECTION_STRING format. Expected: user/password@host:port/service_name'
    )
  }

  const [, user, password, connectString] = match

  const config: ConnectionConfig = {
    user,
    password,
    connectString
  }

  try {
    pool = await oracledb.createPool({
      ...config,
      poolMin: 2,
      poolMax: 10,
      poolIncrement: 1,
      poolTimeout: 300,
      stmtCacheSize: 23
    })

    console.log('Oracle connection pool created successfully')
  } catch (error) {
    console.error('Failed to create Oracle connection pool:', error)
    throw error
  }
}

export async function getConnection(): Promise<oracledb.Connection> {
  if (!pool) {
    await initializePool()
  }

  if (!pool) {
    throw new Error('Failed to initialize connection pool')
  }

  return await pool.getConnection()
}

export async function closePool(): Promise<void> {
  if (pool) {
    await pool.close(0)
    pool = null
    console.log('Oracle connection pool closed')
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  await closePool()
  process.exit(0)
})

process.on('SIGTERM', async () => {
  await closePool()
  process.exit(0)
})
