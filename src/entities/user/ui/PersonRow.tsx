import { Link } from 'react-router'
import { Avatar } from '@/shared/ui'
import { userDisplayName } from '../model/name'
import type { DumpItem } from '../model/types'
import s from './PersonRow.module.css'

export function PersonRow({ item }: { item: DumpItem }) {
  const name = userDisplayName(item)
  const content = (
    <>
      <Avatar name={name} src={item.avatar} />
      <div className={s.text}>
        <span className={s.name}>{name}</span>
        {item.description && <span className={s.description}>{item.description}</span>}
      </div>
    </>
  )

  if (!item.email) return <div className={s.row}>{content}</div>
  return (
    <Link to={`/people/${encodeURIComponent(item.email)}`} className={s.row}>
      {content}
    </Link>
  )
}
