import { useState } from 'react'
import { averageTenPoint, GradeRow, useGrades, type GradesFilter } from '@/entities/grade'
import { Card, PageHeader, QueryView, StateMessage } from '@/shared/ui'
import { AuthGate } from '@/widgets/auth-gate'
import { RatingSummary } from './RatingSummary'
import s from './GradesPage.module.css'

function Grades() {
  const [filter, setFilter] = useState<GradesFilter>({})
  const grades = useGrades(filter)
  const data = grades.data

  const filters = data && (
    <div className={s.filters}>
      {(data.available_programs?.length ?? 0) > 1 && (
        <select
          className={s.select}
          value={filter.programId ?? data.selected_program ?? ''}
          onChange={(e) => setFilter((f) => ({ ...f, programId: e.target.value }))}
        >
          {data.available_programs?.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name ?? p.id}
            </option>
          ))}
        </select>
      )}
      {(data.available_academic_years?.length ?? 0) > 0 && (
        <select
          className={s.select}
          value={filter.academicYear ?? data.selected_academic_year ?? ''}
          onChange={(e) => setFilter((f) => ({ ...f, academicYear: e.target.value }))}
        >
          {data.available_academic_years?.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      )}
    </div>
  )

  return (
    <>
      <PageHeader title="Оценки" actions={filters} />
      <QueryView
        query={grades}
        isEmpty={(d) => !d.items?.length}
        empty={<StateMessage title="Оценок за этот период нет" />}
      >
        {(d) => (
          <>
            <RatingSummary average={averageTenPoint(d.items ?? [])} />
            <Card>
              {d.items?.map((item) => (
                <GradeRow key={item.id} item={item} />
              ))}
            </Card>
          </>
        )}
      </QueryView>
    </>
  )
}

export function GradesPage() {
  return (
    <AuthGate>
      <Grades />
    </AuthGate>
  )
}
