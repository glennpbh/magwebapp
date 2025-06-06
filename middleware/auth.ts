export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated, checkAuth } = useAuth()

  // Skip auth check for login page
  if (to.path === '/login') {
    return
  }

  // Check if user is authenticated
  if (!isAuthenticated.value) {
    // If we have a token, try to verify it
    if (process.client) {
      const token = useCookie('auth.token')
      if (token.value) {
        return checkAuth().then((isValid) => {
          if (!isValid) {
            return navigateTo('/login')
          }
        })
      }
    }
    
    // Redirect to login if not authenticated
    return navigateTo('/login')
  }
})