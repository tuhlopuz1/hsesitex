import { AUTH } from '@/shared/config/api'
import type { Tokens } from './tokenStorage'

interface TokenResponse {
  access_token: string
  refresh_token: string
  expires_in: number
  refresh_expires_in?: number
}

/**
 * Two redirect URIs:
 * - `web`: a real route in this app, for the normal one-click redirect flow. Works only if
 *   HSE's Keycloak has this origin whitelisted for the `app-x-android` client.
 * - `app`: the mobile app's custom scheme. A browser can't follow it, so it's used only by
 *   the manual paste fallback.
 */
export const REDIRECT = {
  web: () => `${window.location.origin}/auth/callback`,
  app: AUTH.redirectUri,
}

export function buildAuthorizeUrl(redirectUri: string): string {
  const params = new URLSearchParams({
    client_id: AUTH.clientId,
    response_type: 'code',
    redirect_uri: redirectUri,
    scope: AUTH.scope,
    prompt: 'login',
  })
  return `${AUTH.baseUrl}auth?${params}`
}

/**
 * Accepts the full callback URL (either our /auth/callback?code=… or the app's
 * ru.hse.hseappx://…?code=…) or a bare code.
 */
export function extractAuthCode(input: string): string | null {
  const value = input.trim()
  if (!value) return null
  const match = value.match(/[?&]code=([^&#\s]+)/)
  if (match) return decodeURIComponent(match[1])
  return /^[\w.-]+$/.test(value) ? value : null
}

async function requestToken(body: Record<string, string>): Promise<Tokens> {
  const res = await fetch(`${AUTH.baseUrl}token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ client_id: AUTH.clientId, ...body }),
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Авторизация не удалась (${res.status}) ${text}`.trim())
  }
  const data = (await res.json()) as TokenResponse
  const now = Date.now()
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    accessExpiresAt: now + data.expires_in * 1000,
    refreshExpiresAt: data.refresh_expires_in ? now + data.refresh_expires_in * 1000 : 0,
  }
}

/** `redirectUri` must match the one used to obtain the code (OAuth requirement). */
export function exchangeCode(code: string, redirectUri: string): Promise<Tokens> {
  return requestToken({ grant_type: 'authorization_code', code, redirect_uri: redirectUri })
}

export function refreshTokens(refreshToken: string): Promise<Tokens> {
  return requestToken({ grant_type: 'refresh_token', refresh_token: refreshToken })
}
