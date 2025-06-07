interface User {
  email: string
  displayName: string
  groups: string[]
}

interface LoginResponse {
  success: boolean
  token?: string
  user?: User
  message?: string
}

export const useAuth = () => {
  const user = useState<User | null>('auth.user', () => null)
  const token = useCookie<string | null>('auth.token', {
    default: () => null,
    maxAge: 60 * 60 * 24, // 24 hours
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  })

  const isAuthenticated = computed(() => !!user.value && !!token.value)

  const login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await $fetch<LoginResponse>('/api/auth/login', {
        method: 'POST',
        body: {
          email,
          password
        }
      })

      if (response.success && response.token && response.user) {
        token.value = response.token
        user.value = response.user

        // Redirect to home page on successful login
        await navigateTo('/')
      }

      return response
    } catch (err) {
      console.error('Login error:', err)
      return {
        success: false,
        message: 'Login failed. Please try again.'
      }
    }
  }

  const logout = async () => {
    token.value = null
    user.value = null
    await navigateTo('/login')
  }

  const checkAuth = async (): Promise<boolean> => {
    if (!token.value) {
      user.value = null
      return false
    }

    try {
      const response = await $fetch<{ success: boolean; user: User }>('/api/auth/profile', {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })

      if (response.success && response.user) {
        user.value = response.user
        return true
      } else {
        token.value = null
        user.value = null
        return false
      }
    } catch (err) {
      console.error('Auth check failed:', err)
      token.value = null
      user.value = null
      return false
    }
  }

  const hasRole = (role: string): boolean => {
    return user.value?.groups.includes(role) ?? false
  }

  const hasAnyRole = (roles: string[]): boolean => {
    return roles.some((role) => hasRole(role))
  }

  // Initialize auth state on client side
  if (import.meta.client && token.value && !user.value) {
    // Don't auto-check here to avoid conflicts with middleware
    // The middleware will handle the auth check
  }

  return {
    user: readonly(user),
    token: readonly(token),
    isAuthenticated,
    login,
    logout,
    checkAuth,
    hasRole,
    hasAnyRole
  }
}
