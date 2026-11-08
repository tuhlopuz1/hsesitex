import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { request, type CursorList } from '@/shared/api'
import type { Deadline } from '../model/types'

export const deadlineKeys = {
  all: ['deadlines'] as const,
  list: (completed: boolean) => ['deadlines', 'list', completed] as const,
  disciplines: ['deadlines', 'disciplines'] as const,
}

export function useDeadlines(completed: boolean) {
  return useInfiniteQuery({
    queryKey: deadlineKeys.list(completed),
    initialPageParam: undefined as string | undefined,
    queryFn: ({ pageParam, signal }) =>
      request<CursorList<Deadline>>('deadlines', {
        prefix: 'v2',
        method: 'POST',
        query: { cursor: pageParam },
        body: { is_completed: completed },
        signal,
      }),
    getNextPageParam: (last) => (last.more && last.next_cursor ? last.next_cursor : undefined),
    select: (data) => data.pages.flatMap((p) => p.items ?? []),
  })
}

export function useDeadlineDisciplines() {
  return useQuery({
    queryKey: deadlineKeys.disciplines,
    queryFn: ({ signal }) => request<string[]>('deadlines/disciplines', { prefix: 'v2', signal }),
    staleTime: 60 * 60_000,
  })
}
