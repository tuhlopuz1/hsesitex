import type { HTMLAttributes } from 'react'
import { cn } from '@/shared/lib'
import s from './Card.module.css'

interface Props extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean
}

export function Card({ interactive, className, ...rest }: Props) {
  return <div className={cn(s.card, interactive && s.interactive, className)} {...rest} />
}
