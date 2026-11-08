/**
 * Backend contract of HSE App X (com.hse.app2), recovered from the Android build 26.4.0.
 * Each backend module lives under its own version prefix.
 */
export const API_HOST = 'https://api.hseapp.ru'

export const API_PREFIX = {
  v1: '/',
  v2: '/v2/',
  v3: '/v3/',
  dump: '/v3/dump/',
  v4: '/v4/',
} as const

export type ApiPrefix = keyof typeof API_PREFIX

/** The Android app sends its version code; some endpoints gate on min build. */
export const APP_BUILD_HEADER = { 'x-android-build': '128363' } as const

export const AUTH = {
  baseUrl: 'https://saml.hse.ru/realms/hse/protocol/openid-connect/',
  clientId: 'app-x-android',
  redirectUri: 'ru.hse.hseappx://saml.hse.ru/authorize_callback',
  scope: 'openid',
} as const

/** Public HSE resources that work without an account. */
export const PUBLIC_LINKS = {
  navigation: 'https://navigation.hse.ru/',
  hse: 'https://www.hse.ru/',
  lk: 'https://lk.hse.ru/',
  support: 'https://pmo.hse.ru/servicedesk/customer/portal/73/',
} as const
