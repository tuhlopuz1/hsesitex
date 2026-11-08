export interface Tokens {
  accessToken: string
  refreshToken: string
  /** Epoch ms when the access token stops being valid. */
  accessExpiresAt: number
  /** Epoch ms when the refresh token stops being valid (0 = unknown). */
  refreshExpiresAt: number
}

const STORAGE_KEY = 'hse.tokens'

type Listener = () => void
const listeners = new Set<Listener>()

let cache: Tokens | null = read()

function read(): Tokens | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Tokens) : null
  } catch {
    return null
  }
}

function emit() {
  listeners.forEach((l) => l())
}

export const tokenStorage = {
  get: (): Tokens | null => cache,

  set(tokens: Tokens) {
    cache = tokens
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens))
    emit()
  },

  clear() {
    cache = null
    localStorage.removeItem(STORAGE_KEY)
    emit()
  },

  subscribe(listener: Listener) {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
}

// Keep tabs in sync when the user logs in/out in another tab.
window.addEventListener('storage', (e) => {
  if (e.key !== STORAGE_KEY) return
  cache = read()
  emit()
})
