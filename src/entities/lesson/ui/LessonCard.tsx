import { Link } from 'react-router'
import { formatTime, useNow } from '@/shared/lib'
import { Badge } from '@/shared/ui'
import type { Lesson } from '../model/types'
import s from './LessonCard.module.css'

export function LessonCard({ lesson }: { lesson: Lesson }) {
  const place = [lesson.auditorium, lesson.building].filter(Boolean).join(', ')
  const now = useNow().getTime()
  const isNow = new Date(lesson.date_start).getTime() <= now && now < new Date(lesson.date_end).getTime()

  return (
    <article className={s.card} data-now={isNow || undefined}>
      <div className={s.time}>
        <span>{formatTime(lesson.date_start)}</span>
        <span className={s.end}>{formatTime(lesson.date_end)}</span>
      </div>

      <div className={s.body}>
        <div className={s.head}>
          <h3 className={s.title}>{lesson.discipline ?? 'Занятие'}</h3>
          {lesson.type && <Badge tone="accent">{lesson.type}</Badge>}
          {isNow && <Badge tone="success">Идёт сейчас</Badge>}
        </div>

        {place && <p className={s.meta}>{place}</p>}

        {lesson.lecturer && (
          <p className={s.meta}>
            {lesson.lecturer_email ? (
              <Link to={`/people/${encodeURIComponent(lesson.lecturer_email)}`}>{lesson.lecturer}</Link>
            ) : (
              lesson.lecturer
            )}
          </p>
        )}

        {lesson.note && <p className={s.note}>{lesson.note}</p>}

        {lesson.stream_links?.map((l) => (
          <a key={l.link} className={s.link} href={l.link} target="_blank" rel="noreferrer">
            {l.description || 'Ссылка на трансляцию'}
          </a>
        ))}
      </div>
    </article>
  )
}
