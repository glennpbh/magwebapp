export default defineEventHandler(async (event) => {
  const user = event.context.user

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  return {
    success: true,
    user: {
      email: user.email,
      displayName: user.displayName,
      groups: user.groups,
      tokenExpiry: new Date(user.exp * 1000).toISOString()
    }
  }
})