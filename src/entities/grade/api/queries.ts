import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { request } from '@/shared/api'
import type { GradesFilter, GradesResponse } from '../model/types'

export const gradeKeys = {
  list: (filter: GradesFilter) => ['grades', filter] as const,
}

export function useGrades(filter: GradesFilter) {
  return useQuery({
    queryKey: gradeKeys.list(filter),
    queryFn: ({ signal }) =>
      request<GradesResponse>('grades', {
        prefix: 'v2',
        query: { academic_year: filter.academicYear, program_id: filter.programId },
        signal,
      }),
    placeholderData: keepPreviousData,
  })
}
