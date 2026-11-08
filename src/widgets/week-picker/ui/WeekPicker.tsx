import { addDays, cn, formatShortDay, isSameDay, startOfWeek, toIsoDate, useNow } from '@/shared/lib'
import { Button } from '@/shared/ui'
import s from './WeekPicker.module.css'

interface Props {
  weekStart: Date
  selected: Date
  onWeekChange: (weekStart: Date) => void
  onSelect: (day: Date) => void
  /** ISO dates that have something scheduled. */
  busyDays?: Set<string>
}

export function WeekPicker({ weekStart, selected, onWeekChange, onSelect, busyDays }: Props) {
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))
  const today = useNow()

  return (
    <div className={s.root}>
      <Button variant="ghost" size="sm" onClick={() => onWeekChange(addDays(weekStart, -7))} aria-label="Прошлая неделя">
        ←
      </Button>
      <div className={s.days}>
        {days.map((day) => (
          <button
            key={day.toISOString()}
            className={cn(s.day, isSameDay(day, selected) && s.selected, isSameDay(day, today) && s.today)}
            onClick={() => onSelect(day)}
          >
            {formatShortDay(day)}
            {busyDays?.has(toIsoDate(day)) && <span className={s.dot} />}
          </button>
        ))}
      </div>
      <Button variant="ghost" size="sm" onClick={() => onWeekChange(addDays(weekStart, 7))} aria-label="Следующая неделя">
        →
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => {
          onWeekChange(startOfWeek(today))
          onSelect(today)
        }}
      >
        Сегодня
      </Button>
    </div>
  )
}
