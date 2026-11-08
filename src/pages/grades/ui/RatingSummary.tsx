import { useMyRating } from '@/entities/rating'
import { Card } from '@/shared/ui'
import s from './GradesPage.module.css'

/** Optional block: hidden if the user has no rating (e.g. staff or first-years). */
export function RatingSummary({ average }: { average: number | null }) {
  const rating = useMyRating()
  const r = rating.data

  const stats = [
    { label: 'Средний балл за год', value: average?.toFixed(2) },
    { label: 'GPA', value: r?.gpa },
    { label: 'Место в рейтинге', value: r?.index && r.total ? `${r.index} из ${r.total}` : undefined },
    { label: 'Перцентиль', value: r?.percentile },
  ].filter((x) => x.value)

  if (!stats.length) return null
  return (
    <div className={s.stats}>
      {stats.map((stat) => (
        <Card key={stat.label} className={s.stat}>
          <span className={s.statValue}>{stat.value}</span>
          <span className={s.statLabel}>{stat.label}</span>
        </Card>
      ))}
    </div>
  )
}
