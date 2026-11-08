import { Link } from 'react-router'
import { DeadlineCard, useDeadlines } from '@/entities/deadline'
import { QueryView, StateMessage } from '@/shared/ui'
import s from './Dashboard.module.css'

const LIMIT = 3

export function UpcomingDeadlines() {
  const deadlines = useDeadlines(false)

  return (
    <section className={s.section}>
      <div className={s.sectionHead}>
        <h2 className={s.sectionTitle}>Ближайшие дедлайны</h2>
        <Link to="/deadlines">Все →</Link>
      </div>
      <QueryView
        query={deadlines}
        isEmpty={(list) => list.length === 0}
        empty={<StateMessage title="Активных дедлайнов нет" />}
      >
        {(list) => (
          <div className={s.list}>
            {[...list]
              .sort((a, b) => (a.expires_at ?? '').localeCompare(b.expires_at ?? ''))
              .slice(0, LIMIT)
              .map((d) => (
                <DeadlineCard key={d.id} deadline={d} />
              ))}
          </div>
        )}
      </QueryView>
    </section>
  )
}
