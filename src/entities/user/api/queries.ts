import { useQuery } from '@tanstack/react-query'
import { request } from '@/shared/api'
import type { DumpItem, User } from '../model/types'

export const userKeys = {
  me: ['user', 'me'] as const,
  byEmail: (email: string) => ['user', 'email', email] as const,
  search: (q: string, type?: string) => ['user', 'search', q, type] as const,
}

export function useMe() {
  return useQuery({
    queryKey: userKeys.me,
    queryFn: ({ signal }) => request<User>('me', { prefix: 'dump', signal }),
    staleTime: 10 * 60_000,
  })
}

export function usePerson(email: string) {
  return useQuery({
    queryKey: userKeys.byEmail(email),
    queryFn: ({ signal }) => request<User>(`email/${encodeURIComponent(email)}`, { prefix: 'dump', signal }),
    enabled: Boolean(email),
  })
}

export function useDumpSearch(q: string, type?: string) {
  return useQuery({
    queryKey: userKeys.search(q, type),
    queryFn: ({ signal }) => request<DumpItem[]>('search', { prefix: 'dump', query: { q, type }, signal }),
    enabled: q.trim().length >= 2,
  })
}
