import type { Secret, SignOptions } from 'jsonwebtoken'
import jwt from 'jsonwebtoken'
import type { StringValue } from 'ms'

import type { LdapUser } from './ldap'

export interface JwtPayload {
  sub: string
  email: string
  displayName: string
  groups: string[]
  iat: number
  exp: number
}

export interface JwtConfig {
  secret: Secret
  expiresIn: StringValue
}

export class JwtService {
  private config: JwtConfig

  constructor() {
    const secret = process.env.JWT_SECRET
    const expiresIn = process.env.JWT_EXPIRES_IN || '24h'

    if (!secret) {
      throw new Error('JWT_SECRET environment variable is required')
    }

    this.config = { secret, expiresIn: expiresIn as StringValue }
  }

  generateToken(user: LdapUser): string {
    const payload: Omit<JwtPayload, 'iat' | 'exp'> = {
      sub: user.email,
      email: user.email,
      displayName: user.displayName,
      groups: user.memberOf,
    }

    const signOptions: SignOptions = {
      expiresIn: this.config.expiresIn,
      issuer: 'magwebapp',
    }

    return jwt.sign(payload, this.config.secret, signOptions) as string
  }

  verifyToken(token: string): JwtPayload {
    try {
      const decoded = jwt.verify(token, this.config.secret, {
        issuer: 'magwebapp',
      })

      if (typeof decoded === 'string') {
        throw new Error('Invalid token format')
      }

      return decoded as JwtPayload
    } catch (err) {
      if (err instanceof jwt.JsonWebTokenError) {
        throw new Error('Invalid token')
      }
      if (err instanceof jwt.TokenExpiredError) {
        throw new Error('Token expired')
      }
      if (err instanceof jwt.NotBeforeError) {
        throw new Error('Token not active')
      }
      throw err
    }
  }

  extractTokenFromHeader(authHeader: string | undefined): string | null {
    if (!authHeader) {
      return null
    }

    const parts = authHeader.split(' ')
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return null
    }

    return parts[1]
  }

  hasRole(payload: JwtPayload, requiredRole: string): boolean {
    return payload.groups.includes(requiredRole)
  }

  hasAnyRole(payload: JwtPayload, requiredRoles: string[]): boolean {
    return requiredRoles.some((role) => payload.groups.includes(role))
  }
}