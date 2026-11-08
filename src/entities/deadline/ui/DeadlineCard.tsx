import type { ReactNode } from 'react'
import { formatDateTime, formatRelative, useNow } from '@/shared/lib'
import { Badge, Card } from '@/shared/ui'
import { isDeadlineCompleted, type Deadline } from '../model/types'
import s from './DeadlineCard.module.css'

interface Props {
  deadline: Deadline
  /** Slot for feature-level actions (complete, pin, delete…). */
  actions?: ReactNode
}

export function DeadlineCard({ deadline, actions }: Props) {
  const now = useNow()
  const completed = isDeadlineCompleted(deadline)
  const overdue = !completed && deadline.expires_at && new Date(deadline.expires_at) < now

  return (
    <Card className={s.card} data-done={completed || undefined}>
      <div className={s.head}>
        {deadline.is_pinned && <Badge tone="accent">Закреплён</Badge>}
        {deadline.discipline && <Badge>{deadline.discipline}</Badge>}
        {overdue && <Badge tone="danger">Просрочен</Badge>}
      </div>

      <p className={s.description}>{deadline.description || 'Без описания'}</p>

      {deadline.expires_at && (
        <p className={s.meta}>
          до {formatDateTime(deadline.expires_at)} · {formatRelative(deadline.expires_at, now)}
        </p>
      )}

      {actions && <div className={s.actions}>{actions}</div>}
    </Card>
  )
}
