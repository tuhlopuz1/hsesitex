/** `NotificationDataEntity`. */
export interface AppNotification {
  _id: string
  title?: string
  content?: string
  service?: string
  link?: string
  image?: string
  action?: string
  action_icon?: string
  created_at?: string
}

export interface NotificationsFeed {
  items?: AppNotification[]
  more?: boolean
  next_cursor?: string
  last_view?: string
}
