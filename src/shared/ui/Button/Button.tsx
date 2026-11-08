import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/shared/lib'
import s from './Button.module.css'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md'
  loading?: boolean
}

export function Button({ variant = 'primary', size = 'md', loading, className, disabled, children, ...rest }: Props) {
  return (
    <button
      className={cn(s.button, s[variant], s[size], className)}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? '…' : children}
    </button>
  )
}
