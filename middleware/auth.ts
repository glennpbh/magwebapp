export default defineNuxtRouteMiddleware(async (to) => {
  // Skip auth check for login page
  if (to.path === '/login') {
    return
  }

  // Only run on client side to avoid SSR issues
  if (import.meta.server) {
    return
  }

  const { isAuthenticated, checkAuth } = useAuth()

  // If user is already authenticated, allow access
  if (isAuthenticated.value) {
    return
  }

  // If we have a token but no user, try to verify it
  const tokenCookie = useCookie('auth.token')
  
  if (tokenCookie.value) {
    const isValid = await checkAuth()
    if (isValid) {
      return
    } else {
      return navigateTo('/login')
    }
  }

  // No token found, redirect to login
  return navigateTo('/login')
})
