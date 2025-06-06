import { JwtService } from '../services/jwt'
import type { JwtPayload } from '../services/jwt'

declare module 'h3' {
  interface H3EventContext {
    user?: JwtPayload
  }
}

const publicRoutes = [
  '/api/auth/login',
  '/api/test-db'
]

function isPublicRoute(path: string): boolean {
  return publicRoutes.some(route => path.startsWith(route))
}

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)
  
  if (!url.pathname.startsWith('/api/') || isPublicRoute(url.pathname)) {
    return
  }

  try {
    const jwtService = new JwtService()
    const authHeader = getHeader(event, 'authorization')
    const token = jwtService.extractTokenFromHeader(authHeader)

    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Authorization token required'
      })
    }

    const payload = jwtService.verifyToken(token)
    event.context.user = payload

  } catch (error) {
    if (error instanceof Error) {
      throw createError({
        statusCode: 401,
        statusMessage: error.message
      })
    }
    
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid authorization token'
    })
  }
})