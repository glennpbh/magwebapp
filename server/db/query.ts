import oracledb from 'oracledb'

import { getConnection } from './connection'

export interface ExecuteResult {
  rowsAffected: number
  lastRowid?: string
}

export async function querySingle<T = unknown>(
  sql: string,
  parameters?: oracledb.BindParameters
): Promise<T | null> {
  const connection = await getConnection()

  try {
    const result = await connection.execute(sql, parameters || {}, {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
      maxRows: 1
    })

    return result.rows && result.rows.length > 0 ? (result.rows[0] as T) : null
  } finally {
    await connection.close()
  }
}

export async function queryMultiple<T = unknown>(
  sql: string,
  parameters?: oracledb.BindParameters
): Promise<T[]> {
  const connection = await getConnection()

  try {
    const result = await connection.execute(sql, parameters || {}, {
      outFormat: oracledb.OUT_FORMAT_OBJECT
    })

    return (result.rows || []) as T[]
  } finally {
    await connection.close()
  }
}

export async function executeScalar<T = unknown>(
  sql: string,
  parameters?: oracledb.BindParameters
): Promise<T | null> {
  const connection = await getConnection()

  try {
    const result = await connection.execute(sql, parameters || {}, {
      outFormat: oracledb.OUT_FORMAT_ARRAY,
      maxRows: 1
    })

    if (result.rows && result.rows.length > 0) {
      const row = result.rows[0] as unknown[]
      return row.length > 0 ? (row[0] as T) : null
    }

    return null
  } finally {
    await connection.close()
  }
}

export async function execute(
  sql: string,
  parameters?: oracledb.BindParameters
): Promise<ExecuteResult> {
  const connection = await getConnection()

  try {
    const result = await connection.execute(sql, parameters || {}, {
      autoCommit: true
    })

    return {
      rowsAffected: result.rowsAffected || 0,
      lastRowid: result.lastRowid
    }
  } finally {
    await connection.close()
  }
}

export async function executeTransaction<T>(
  operations: (connection: oracledb.Connection) => Promise<T>
): Promise<T> {
  const connection = await getConnection()

  try {
    const result = await operations(connection)
    await connection.commit()
    return result
  } catch (error) {
    await connection.rollback()
    throw error
  } finally {
    await connection.close()
  }
}
