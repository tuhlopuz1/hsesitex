import { formatDate } from '@/shared/lib'
import { gradeLabel, gradeTone } from '../model/score'
import type { SubjectGrade } from '../model/types'
import s from './GradeRow.module.css'

export function GradeRow({ item }: { item: SubjectGrade }) {
  const meta = [item.type_raw, item.credits ? `${item.credits} кред.` : null, item.date ? formatDate(item.date) : null]
    .filter(Boolean)
    .join(' · ')

  return (
    <div className={s.row}>
      <div className={s.text}>
        <span className={s.title}>{item.discipline ?? 'Дисциплина'}</span>
        {meta && <span className={s.meta}>{meta}</span>}
      </div>
      <span className={s.grade} data-tone={gradeTone(item.grade)}>
        {gradeLabel(item.grade)}
      </span>
    </div>
  )
}
