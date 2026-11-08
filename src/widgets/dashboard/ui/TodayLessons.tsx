import { Link } from 'react-router'
import { LessonCard, useLessons } from '@/entities/lesson'
import { isSameDay, toIsoDate, useNow } from '@/shared/lib'
import { QueryView, StateMessage } from '@/shared/ui'
import s from './Dashboard.module.css'

export function TodayLessons() {
  const today = useNow()
  const lessons = useLessons({ start: toIsoDate(today) })

  return (
    <section className={s.section}>
      <div className={s.sectionHead}>
        <h2 className={s.sectionTitle}>Сегодня</h2>
        <Link to="/schedule">Всё расписание →</Link>
      </div>
      <QueryView query={lessons}>
        {(list) => {
          const todays = list.filter((l) => isSameDay(new Date(l.date_start), today))
          if (!todays.length) return <StateMessage title="Сегодня пар нет" />
          return (
            <div className={s.list}>
              {todays.map((l) => (
                <LessonCard key={l.id} lesson={l} />
              ))}
            </div>
          )
        }}
      </QueryView>
    </section>
  )
}
