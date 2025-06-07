import type { UseFetchOptions } from 'nuxt/app'

export function useAuthenticatedFetch<T>(
  url: string | (() => string),
  options: UseFetchOptions<T> = {}
) {
  const { token } = useAuth()

  return useFetch(url, {
    ...options,
    headers: {
      ...options.headers,
      ...(token.value ? { Authorization: `Bearer ${token.value}` } : {})
    }
  })
}