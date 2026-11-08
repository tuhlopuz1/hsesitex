import { useQuery } from '@tanstack/react-query'
import { request } from '@/shared/api'
import type { MyRating } from '../model/types'

export const ratingKeys = {
  me: ['rating', 'me'] as const,
}

export function useMyRating() {
  return useQuery({
    queryKey: ratingKeys.me,
    queryFn: ({ signal }) => request<MyRating>('ratings/me', { signal }),
    staleTime: 30 * 60_000,
    retry: false,
  })
}
