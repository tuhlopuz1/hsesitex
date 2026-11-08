import { formatDateTime } from '@/shared/lib'
import type { AppNotification } from '../model/types'
import s from './NotificationItem.module.css'

interface Props {
  item: AppNotification
  unread?: boolean
}

export function NotificationItem({ item, unread }: Props) {
  return (
    <article className={s.item} data-unread={unread || undefined}>
      {item.action_icon && <img className={s.icon} src={item.action_icon} alt="" />}
      <div className={s.body}>
        <div className={s.head}>
          {item.service && <span className={s.service}>{item.service}</span>}
          {item.created_at && <time className={s.time}>{formatDateTime(item.created_at)}</time>}
        </div>
        {item.title && <h3 className={s.title}>{item.title}</h3>}
        {item.content && <p className={s.content}>{item.content}</p>}
        {item.link && (
          <a href={item.link} target="_blank" rel="noreferrer" className={s.link}>
            {item.action || 'Открыть'}
          </a>
        )}
      </div>
    </article>
  )
}
