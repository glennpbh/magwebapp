import { executeScalar, queryMultiple, querySingle } from '../db/query'

export default defineEventHandler(async (_event) => {
  try {
    // Test querySingle
    const version = await querySingle<{ BANNER: string }>(
      'SELECT BANNER FROM V$VERSION WHERE ROWNUM = 1'
    )

    // Test executeScalar
    const currentTime = await executeScalar<Date>('SELECT SYSDATE FROM DUAL')

    // Test queryMultiple with parameters
    const sessionInfo = await queryMultiple(
      'SELECT SID, SERIAL#, USERNAME FROM V$SESSION WHERE USERNAME = :username OR :username IS NULL',
      { username: null }
    )

    return {
      success: true,
      message: 'Database connection and query functions working',
      data: {
        version: version?.BANNER,
        currentTime,
        activeSessions: sessionInfo.length
      }
    }
  } catch (error) {
    console.error('Database test failed:', error)

    return {
      success: false,
      message: 'Database test failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
})
