import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { request } from '@/shared/api'
import type { Cafe, CafeCampus, CafeMenu } from '../model/types'

export const cafeKeys = {
  campuses: ['cafes'] as const,
  one: (id: string) => ['cafes', id] as const,
  menu: (id: string, day?: string) => ['cafes', id, 'menu', day] as const,
}

export function useCafeCampuses() {
  return useQuery({
    queryKey: cafeKeys.campuses,
    queryFn: ({ signal }) => request<CafeCampus[]>('food/cafes', { signal }),
    staleTime: 30 * 60_000,
  })
}

export function useCafe(id: string) {
  return useQuery({
    queryKey: cafeKeys.one(id),
    queryFn: ({ signal }) => request<Cafe>(`food/cafes/${encodeURIComponent(id)}`, { signal }),
  })
}

export function useCafeMenu(id: string, day?: string) {
  return useQuery({
    queryKey: cafeKeys.menu(id, day),
    queryFn: ({ signal }) =>
      request<CafeMenu>(`food/v2/cafes/${encodeURIComponent(id)}/menu`, { query: { day }, signal }),
    placeholderData: keepPreviousData,
  })
}
