import { useQuery } from '@tanstack/react-query'
import { request } from '@/shared/api'
import type { Lesson, LessonsFilter } from '../model/types'

export const lessonKeys = {
  list: (filter: LessonsFilter) => ['lessons', filter] as const,
}

/** Without `count` the backend returns a window of lessons starting at `start`. */
export function useLessons(filter: LessonsFilter) {
  return useQuery({
    queryKey: lessonKeys.list(filter),
    queryFn: ({ signal }) =>
      request<Lesson[]>('ruz/lessons', { prefix: 'v3', query: { ...filter }, signal }),
    staleTime: 5 * 60_000,
  })
}
