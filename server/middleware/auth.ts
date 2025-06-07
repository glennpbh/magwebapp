import type { JwtPayload } from '../services/jwt'
import { JwtService } from '../services/jwt'

declare module 'h3' {
  interface H3EventContext {
    user?: JwtPayload
  }
}

const publicRoutes = ['/api/auth/login', '/api/test-db']

function isPublicRoute(path: string): boolean {
  return publicRoutes.some((route) => path.startsWith(route))
}

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)

  if (!url.pathname.startsWith('/api/') || isPublicRoute(url.pathname)) {
    return
  }

  const jwtService = new JwtService()
  const authHeader = getHeader(event, 'authorization')
  const token = jwtService.extractTokenFromHeader(authHeader)

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Authorization token required',
    })
  }

  try {
    event.context.user = jwtService.verifyToken(token)
  } catch (err) {
    if (err instanceof Error) {
      // Handle specific JWT errors
      if (err.name === 'TokenExpiredError') {
        throw createError({
          statusCode: 401,
          statusMessage: 'Token has expired',
        })
      } else if (err.name === 'JsonWebTokenError') {
        throw createError({
          statusCode: 401,
          statusMessage: 'Invalid token',
        })
      } else if (err.name === 'NotBeforeError') {
        throw createError({
          statusCode: 401,
          statusMessage: 'Token not yet active',
        })
      }
    }
    
    // Fallback for any other errors
    throw createError({
      statusCode: 401,
      statusMessage: 'Authentication failed',
    })
  }
})