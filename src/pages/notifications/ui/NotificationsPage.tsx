import { NotificationItem, useNotificationsFeed } from '@/entities/notification'
import { useMarkFeedViewed } from '@/features/notifications-read'
import { Button, Card, PageHeader, QueryView, StateMessage } from '@/shared/ui'
import { AuthGate } from '@/widgets/auth-gate'

function Feed() {
  const feed = useNotificationsFeed()
  useMarkFeedViewed(feed.isSuccess)

  // `last_view` is captured from the first page, before we mark the feed as viewed.
  const lastView = feed.data?.pages[0]?.last_view

  return (
    <>
      <PageHeader title="Уведомления" />
      <QueryView
        query={feed}
        isEmpty={(d) => !d.pages.some((p) => p.items?.length)}
        empty={<StateMessage title="Уведомлений нет" />}
      >
        {(d) => (
          <>
            <Card style={{ padding: 0, overflow: 'hidden' }}>
              {d.pages.flatMap((p) =>
                (p.items ?? []).map((n) => (
                  <NotificationItem
                    key={n._id}
                    item={n}
                    unread={!!lastView && !!n.created_at && n.created_at > lastView}
                  />
                )),
              )}
            </Card>
            {feed.hasNextPage && (
              <div style={{ marginTop: 12, textAlign: 'center' }}>
                <Button variant="ghost" loading={feed.isFetchingNextPage} onClick={() => feed.fetchNextPage()}>
                  Показать ещё
                </Button>
              </div>
            )}
          </>
        )}
      </QueryView>
    </>
  )
}

export function NotificationsPage() {
  return (
    <AuthGate>
      <Feed />
    </AuthGate>
  )
}
