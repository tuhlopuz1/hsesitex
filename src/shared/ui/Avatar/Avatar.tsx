import { useState } from 'react'
import s from './Avatar.module.css'

interface Props {
  name?: string
  src?: string
  size?: number
}

function initials(name = '') {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('')
}

export function Avatar({ name, src, size = 40 }: Props) {
  const [failed, setFailed] = useState(false)
  const style = { width: size, height: size, fontSize: size * 0.4 }

  if (src && !failed) {
    return <img className={s.avatar} style={style} src={src} alt={name ?? ''} onError={() => setFailed(true)} />
  }
  return (
    <span className={s.avatar} style={style} aria-hidden>
      {initials(name) || '?'}
    </span>
  )
}
