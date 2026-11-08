import type { ReactNode } from 'react'
import { cn } from '@/shared/lib'
import s from './StateMessage.module.css'

interface Props {
  title: string
  description?: ReactNode
  action?: ReactNode
  tone?: 'neutral' | 'error'
}

export function StateMessage({ title, description, action, tone = 'neutral' }: Props) {
  return (
    <div className={cn(s.root, tone === 'error' && s.error)}>
      <p className={s.title}>{title}</p>
      {description && <p className={s.description}>{description}</p>}
      {action && <div className={s.action}>{action}</div>}
    </div>
  )
}

export function Spinner() {
  return <div className={s.spinner} role="status" aria-label="Загрузка" />
}
