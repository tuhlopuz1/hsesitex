import { useSyncExternalStore } from 'react'
import { refreshTokens } from './oauth'
import { tokenStorage } from './tokenStorage'

/** Refresh a bit before expiry so in-flight requests don't race the deadline. */
const EXPIRY_MARGIN_MS = 30_000

let refreshing: Promise<string | null> | null = null

async function doRefresh(): Promise<string | null> {
  const tokens = tokenStorage.get()
  if (!tokens) return null
  try {
    const next = await refreshTokens(tokens.refreshToken)
    tokenStorage.set(next)
    return next.accessToken
  } catch {
    tokenStorage.clear()
    return null
  }
}

/** Forces a refresh; concurrent callers share one request. */
export function forceRefresh(): Promise<string | null> {
  refreshing ??= doRefresh().finally(() => {
    refreshing = null
  })
  return refreshing
}

/** Returns a valid access token, refreshing it if needed, or null for guests. */
export async function getAccessToken(): Promise<string | null> {
  const tokens = tokenStorage.get()
  if (!tokens) return null
  if (tokens.accessExpiresAt - EXPIRY_MARGIN_MS > Date.now()) return tokens.accessToken
  return forceRefresh()
}

export function logout() {
  tokenStorage.clear()
}

export function useIsAuthenticated(): boolean {
  return useSyncExternalStore(tokenStorage.subscribe, () => tokenStorage.get() !== null)
}
