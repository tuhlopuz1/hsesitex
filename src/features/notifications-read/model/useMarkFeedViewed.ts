import { useEffect } from 'react'
import { request } from '@/shared/api'

/** Tells the backend the feed was opened, so the unread counter resets (as the app does). */
export function useMarkFeedViewed(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return
    request<void>('notifications/feed/view', { prefix: 'v2', method: 'POST' }).catch(() => {})
  }, [enabled])
}
