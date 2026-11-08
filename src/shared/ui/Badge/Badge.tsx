import type { ReactNode } from 'react'
import { cn } from '@/shared/lib'
import s from './Badge.module.css'

interface Props {
  tone?: 'neutral' | 'accent' | 'success' | 'warning' | 'danger'
  children: ReactNode
}

export function Badge({ tone = 'neutral', children }: Props) {
  return <span className={cn(s.badge, s[tone])}>{children}</span>
}
