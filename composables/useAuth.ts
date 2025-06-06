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
    secure: true,
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

  const checkAuth = async () => {
    if (!token.value) {
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
        await logout()
        return false
      }
    } catch (err) {
      console.error('Auth check failed:', err)
      await logout()
      return false
    }
  }

  const hasRole = (role: string): boolean => {
    return user.value?.groups.includes(role) ?? false
  }

  const hasAnyRole = (roles: string[]): boolean => {
    return roles.some((role) => hasRole(role))
  }

  // Auto-check authentication on composable initialization
  if (import.meta.client && token.value && !user.value) {
    checkAuth()
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
