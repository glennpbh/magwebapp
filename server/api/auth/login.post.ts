import { LdapService } from '../../services/ldap'
import { JwtService } from '../../services/jwt'

interface LoginRequest {
  email: string
  password: string
}

interface LoginResponse {
  success: boolean
  token?: string
  user?: {
    email: string
    displayName: string
    groups: string[]
  }
  message?: string
}

export default defineEventHandler(async (event): Promise<LoginResponse> => {
  if (getMethod(event) !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    })
  }

  try {
    const body = await readBody<LoginRequest>(event)

    if (!body.email || !body.password) {
      return {
        success: false,
        message: 'Email and password are required'
      }
    }

    const ldapService = new LdapService()
    const jwtService = new JwtService()

    const user = await ldapService.authenticate(body.email, body.password)

    if (!user) {
      return {
        success: false,
        message: 'Invalid credentials'
      }
    }

    const token = jwtService.generateToken(user)

    return {
      success: true,
      token,
      user: {
        email: user.email,
        displayName: user.displayName,
        groups: user.memberOf
      }
    }
  } catch (error) {
    console.error('Login error:', error)
    
    return {
      success: false,
      message: 'Authentication failed'
    }
  }
})