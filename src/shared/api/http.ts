import { forceRefresh, getAccessToken } from '@/shared/auth'
import { API_HOST, API_PREFIX, APP_BUILD_HEADER, type ApiPrefix } from '@/shared/config/api'

export class ApiError extends Error {
  readonly status: number
  readonly body: unknown

  constructor(status: number, message: string, body: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.body = body
  }
}

type QueryValue = string | number | boolean | null | undefined

export interface RequestOptions {
  prefix?: ApiPrefix
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  query?: Record<string, QueryValue>
  body?: unknown
  signal?: AbortSignal
}

function buildUrl(path: string, prefix: ApiPrefix, query?: RequestOptions['query']) {
  const url = new URL(API_PREFIX[prefix] + path.replace(/^\//, ''), API_HOST)
  for (const [key, value] of Object.entries(query ?? {})) {
    if (value !== undefined && value !== null && value !== '') url.searchParams.set(key, String(value))
  }
  return url
}

async function parseBody(res: Response): Promise<unknown> {
  const text = await res.text()
  if (!text) return undefined
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

function errorMessage(status: number, body: unknown): string {
  const apiMessage = (body as { error?: { message?: string } } | undefined)?.error?.message
  if (apiMessage) return apiMessage
  if (status === 401) return 'Нужно войти в аккаунт'
  if (status === 403) return 'Нет доступа'
  if (status === 404) return 'Не найдено'
  return `Ошибка сервера (${status})`
}

async function send(url: URL, opts: RequestOptions, token: string | null) {
  const headers: Record<string, string> = { ...APP_BUILD_HEADER, Accept: 'application/json' }
  if (token) headers.Authorization = `Bearer ${token}`
  if (opts.body !== undefined) headers['Content-Type'] = 'application/json'

  return fetch(url, {
    method: opts.method ?? 'GET',
    headers,
    body: opts.body === undefined ? undefined : JSON.stringify(opts.body),
    signal: opts.signal,
  })
}

export async function request<T>(path: string, opts: RequestOptions = {}): Promise<T> {
  const url = buildUrl(path, opts.prefix ?? 'v1', opts.query)

  let res = await send(url, opts, await getAccessToken())
  if (res.status === 401) {
    const fresh = await forceRefresh()
    if (fresh) res = await send(url, opts, fresh)
  }

  const body = await parseBody(res)
  if (!res.ok) throw new ApiError(res.status, errorMessage(res.status, body), body)
  return body as T
}
