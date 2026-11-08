import type { ReactNode } from 'react'
import { formatDate, useNow } from '@/shared/lib'
import { Badge } from '@/shared/ui'
import type { LibraryBook } from '../model/types'
import s from './BookRow.module.css'

interface Props {
  book: LibraryBook
  action?: ReactNode
}

export function BookRow({ book, action }: Props) {
  const now = useNow()
  const overdue = !book.date_return && book.date_end && new Date(book.date_end) < now

  return (
    <div className={s.row}>
      <div className={s.text}>
        <span className={s.title}>{book.info ?? book.barcode}</span>
        {book.author && <span className={s.meta}>{book.author}</span>}
        <span className={s.meta}>
          {book.date_start && `выдана ${formatDate(book.date_start)}`}
          {book.date_end && ` · вернуть до ${formatDate(book.date_end)}`}
          {book.date_return && ` · возвращена ${formatDate(book.date_return)}`}
        </span>
      </div>
      <div className={s.side}>
        {overdue && <Badge tone="danger">Просрочена</Badge>}
        {action}
      </div>
    </div>
  )
}
