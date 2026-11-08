import { useQuery } from '@tanstack/react-query'
import { request } from '@/shared/api'
import type { Campus, FreeRoomsQuery, FreeRoomsResponse } from '../model/types'

/** Pokrovka campus — used as the default point to order buildings by distance. */
const DEFAULT_POINT = { type: 'Point', coordinates: [37.6486, 55.7539] }

export const roomKeys = {
  campuses: ['rooms', 'campuses'] as const,
  free: (q: FreeRoomsQuery) => ['rooms', 'free', q] as const,
}

export function useCampuses() {
  return useQuery({
    queryKey: roomKeys.campuses,
    queryFn: ({ signal }) =>
      request<Campus[]>('buildings/groups', {
        prefix: 'dump',
        method: 'POST',
        body: { geo: DEFAULT_POINT, is_free: true },
        signal,
      }),
    staleTime: 60 * 60_000,
  })
}

export function useFreeRooms(query: FreeRoomsQuery | null) {
  return useQuery({
    queryKey: roomKeys.free(query as FreeRoomsQuery),
    queryFn: ({ signal }) =>
      request<FreeRoomsResponse>('rooms/free', { method: 'POST', body: query, signal }),
    enabled: query !== null,
  })
}
