import { useState } from 'react'
import { BookRow, useLibraryBooks, useLibraryHistory, useLibraryUser } from '@/entities/library'
import { ProlongButton } from '@/features/book-prolong'
import { Card, PageHeader, QueryView, Segmented, StateMessage, type SegmentedOption } from '@/shared/ui'
import { AuthGate } from '@/widgets/auth-gate'
import { LibraryNewsList } from './LibraryNewsList'
import s from './LibraryPage.module.css'

type Tab = 'books' | 'history' | 'news'

const TABS: SegmentedOption<Tab>[] = [
  { value: 'books', label: 'На руках' },
  { value: 'history', label: 'История' },
  { value: 'news', label: 'Новости' },
]

function LibraryCard() {
  const user = useLibraryUser()
  const u = user.data
  if (!u) return null
  return (
    <Card className={s.cardInfo}>
      <div>
        <span className={s.label}>Читательский билет</span>
        <span className={s.value}>{u.has_library_card ? u.barcode ?? 'есть' : 'не оформлен'}</span>
      </div>
      {u.remote_access?.has_remote_access && (
        <div>
          <span className={s.label}>Удалённый доступ</span>
          <span className={s.value}>{u.remote_access.login ?? 'подключён'}</span>
        </div>
      )}
      {!u.has_library_card && u.library_card_receive_link && (
        <a href={u.library_card_receive_link} target="_blank" rel="noreferrer">
          Как получить билет ↗
        </a>
      )}
    </Card>
  )
}

function Books({ history }: { history?: boolean }) {
  const current = useLibraryBooks()
  const past = useLibraryHistory()
  const query = history ? past : current

  return (
    <QueryView
      query={query}
      isEmpty={(list) => list.length === 0}
      empty={<StateMessage title={history ? 'История пуста' : 'На руках книг нет'} />}
    >
      {(list) => (
        <Card>
          {list.map((book) => (
            <BookRow key={book.barcode} book={book} action={history ? undefined : <ProlongButton book={book} />} />
          ))}
        </Card>
      )}
    </QueryView>
  )
}

function Library() {
  const [tab, setTab] = useState<Tab>('books')
  return (
    <>
      <PageHeader title="Библиотека" actions={<Segmented options={TABS} value={tab} onChange={setTab} />} />
      <LibraryCard />
      {tab === 'books' && <Books />}
      {tab === 'history' && <Books history />}
      {tab === 'news' && <LibraryNewsList />}
    </>
  )
}

export function LibraryPage() {
  return (
    <AuthGate>
      <Library />
    </AuthGate>
  )
}
