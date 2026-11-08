import { useState } from 'react'
import { DeadlineCard, useDeadlines } from '@/entities/deadline'
import { CreateDeadlineForm, DeadlineActions } from '@/features/deadline-actions'
import { Button, PageHeader, QueryView, Segmented, StateMessage, type SegmentedOption } from '@/shared/ui'
import { AuthGate } from '@/widgets/auth-gate'
import s from './DeadlinesPage.module.css'

type Tab = 'active' | 'done'

const TABS: SegmentedOption<Tab>[] = [
  { value: 'active', label: 'Активные' },
  { value: 'done', label: 'Выполненные' },
]

function Deadlines() {
  const [tab, setTab] = useState<Tab>('active')
  const [creating, setCreating] = useState(false)
  const deadlines = useDeadlines(tab === 'done')

  return (
    <>
      <PageHeader
        title="Дедлайны"
        actions={
          <>
            <Segmented options={TABS} value={tab} onChange={setTab} />
            {!creating && <Button onClick={() => setCreating(true)}>+ Новый</Button>}
          </>
        }
      />

      {creating && (
        <div className={s.create}>
          <CreateDeadlineForm onDone={() => setCreating(false)} />
        </div>
      )}

      <QueryView
        query={deadlines}
        isEmpty={(list) => list.length === 0}
        empty={<StateMessage title={tab === 'active' ? 'Активных дедлайнов нет' : 'Пока ничего не выполнено'} />}
      >
        {(list) => (
          <div className={s.list}>
            {[...list]
              .sort((a, b) => Number(!!b.is_pinned) - Number(!!a.is_pinned))
              .map((d) => (
                <DeadlineCard key={d.id} deadline={d} actions={<DeadlineActions deadline={d} />} />
              ))}
            {deadlines.hasNextPage && (
              <Button
                variant="ghost"
                loading={deadlines.isFetchingNextPage}
                onClick={() => deadlines.fetchNextPage()}
              >
                Показать ещё
              </Button>
            )}
          </div>
        )}
      </QueryView>
    </>
  )
}

export function DeadlinesPage() {
  return (
    <AuthGate>
      <Deadlines />
    </AuthGate>
  )
}
