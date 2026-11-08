import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'
import { groupLessonsByDay, LessonCard, useLessons } from '@/entities/lesson'
import { addDays, formatDay, startOfWeek, toIsoDate } from '@/shared/lib'
import { PageHeader, QueryView, StateMessage } from '@/shared/ui'
import { AuthGate } from '@/widgets/auth-gate'
import { WeekPicker } from '@/widgets/week-picker'
import s from './SchedulePage.module.css'

function WeekSchedule() {
  const [params] = useSearchParams()
  const email = params.get('email') ?? undefined
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date()))
  const [selected, setSelected] = useState(() => new Date())

  const lessons = useLessons({ start: toIsoDate(weekStart), email })
  const weekEnd = toIsoDate(addDays(weekStart, 7))

  const days = useMemo(() => {
    const inWeek = (lessons.data ?? []).filter((l) => {
      const day = toIsoDate(new Date(l.date_start))
      return day >= toIsoDate(weekStart) && day < weekEnd
    })
    return groupLessonsByDay(inWeek)
  }, [lessons.data, weekStart, weekEnd])

  const select = (day: Date) => {
    setSelected(day)
    document.getElementById(`day-${toIsoDate(day)}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <PageHeader title="Расписание" subtitle={email ? `Расписание: ${email}` : undefined} />
      <WeekPicker
        weekStart={weekStart}
        selected={selected}
        onWeekChange={setWeekStart}
        onSelect={select}
        busyDays={new Set(days.map((d) => d.date))}
      />
      <QueryView query={lessons}>
        {() =>
          days.length === 0 ? (
            <StateMessage title="На этой неделе занятий нет" />
          ) : (
            <div className={s.days}>
              {days.map((day) => (
                <section key={day.date} id={`day-${day.date}`} className={s.day}>
                  <h2 className={s.dayTitle}>{formatDay(day.date)}</h2>
                  <div className={s.lessons}>
                    {day.lessons.map((l) => (
                      <LessonCard key={l.id} lesson={l} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )
        }
      </QueryView>
    </>
  )
}

export function SchedulePage() {
  return (
    <AuthGate>
      <WeekSchedule />
    </AuthGate>
  )
}
