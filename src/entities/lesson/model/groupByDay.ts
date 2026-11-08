import { toIsoDate } from '@/shared/lib'
import type { Lesson } from './types'

export interface LessonDay {
  date: string
  lessons: Lesson[]
}

/** Groups lessons by local calendar day, sorted by start time. */
export function groupLessonsByDay(lessons: Lesson[]): LessonDay[] {
  const byDay = new Map<string, Lesson[]>()
  const sorted = [...lessons].sort((a, b) => a.date_start.localeCompare(b.date_start))
  for (const lesson of sorted) {
    const day = toIsoDate(new Date(lesson.date_start))
    byDay.set(day, [...(byDay.get(day) ?? []), lesson])
  }
  return [...byDay].map(([date, items]) => ({ date, lessons: items }))
}
