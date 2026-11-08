import { useInfiniteQuery } from '@tanstack/react-query'
import { request } from '@/shared/api'
import type { NotificationsFeed } from '../model/types'

const PAGE_SIZE = 30

export const notificationKeys = {
  feed: ['notifications', 'feed'] as const,
}

export function useNotificationsFeed() {
  return useInfiniteQuery({
    queryKey: notificationKeys.feed,
    initialPageParam: undefined as string | undefined,
    queryFn: ({ pageParam, signal }) =>
      request<NotificationsFeed>('notifications/feed', {
        prefix: 'v2',
        query: { fromId: pageParam, count: PAGE_SIZE },
        signal,
      }),
    getNextPageParam: (last) => (last.more && last.next_cursor ? last.next_cursor : undefined),
  })
}
