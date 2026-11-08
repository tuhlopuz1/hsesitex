import { useMutation } from '@tanstack/react-query'
import { exchangeCode, extractAuthCode, REDIRECT, tokenStorage } from '@/shared/auth'

/** Exchanges a code obtained via the manual paste fallback (app custom-scheme redirect). */
export function usePasteLogin() {
  return useMutation({
    mutationFn: async (callbackUrlOrCode: string) => {
      const code = extractAuthCode(callbackUrlOrCode)
      if (!code) throw new Error('Не нашёл код в ссылке. Скопируйте адрес целиком, он содержит code=')
      return exchangeCode(code, REDIRECT.app)
    },
    onSuccess: (tokens) => tokenStorage.set(tokens),
  })
}

/** Exchanges the code our own /auth/callback route received from the redirect flow. */
export function useCallbackLogin() {
  return useMutation({
    mutationFn: (code: string) => exchangeCode(code, REDIRECT.web()),
    onSuccess: (tokens) => tokenStorage.set(tokens),
  })
}
