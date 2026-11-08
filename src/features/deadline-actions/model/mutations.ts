import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deadlineKeys, type Deadline, type DeadlineDraft } from '@/entities/deadline'
import { request } from '@/shared/api'

function useInvalidateDeadlines() {
  const queryClient = useQueryClient()
  return () => queryClient.invalidateQueries({ queryKey: deadlineKeys.all })
}

const path = (id: string, suffix = '') => `deadlines/${encodeURIComponent(id)}${suffix}`

export function useSetCompleted() {
  const invalidate = useInvalidateDeadlines()
  return useMutation({
    mutationFn: ({ id, completed }: { id: string; completed: boolean }) =>
      request<void>(path(id, '/complete'), { prefix: 'v2', method: completed ? 'POST' : 'DELETE' }),
    onSettled: invalidate,
  })
}

export function useSetPinned() {
  const invalidate = useInvalidateDeadlines()
  return useMutation({
    mutationFn: ({ id, pinned }: { id: string; pinned: boolean }) =>
      request<void>(path(id, '/pin'), { prefix: 'v2', method: pinned ? 'POST' : 'DELETE' }),
    onSettled: invalidate,
  })
}

export function useDeleteDeadline() {
  const invalidate = useInvalidateDeadlines()
  return useMutation({
    mutationFn: (id: string) => request<void>(path(id), { prefix: 'v2', method: 'DELETE' }),
    onSettled: invalidate,
  })
}

export function useCreateDeadline() {
  const invalidate = useInvalidateDeadlines()
  return useMutation({
    mutationFn: (draft: DeadlineDraft) =>
      request<Deadline>('deadlines', { prefix: 'v2', method: 'PUT', body: { emails: [], groups: [], ...draft } }),
    onSuccess: invalidate,
  })
}
