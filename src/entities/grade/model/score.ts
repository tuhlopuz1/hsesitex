import type { GradeValue } from './types'

export type GradeTone = 'success' | 'accent' | 'warning' | 'danger' | 'neutral'

export function gradeLabel(grade?: GradeValue): string {
  if (!grade) return '—'
  const ten = grade.ten_point_scale
  if (ten !== undefined && ten !== null && ten !== '') return String(ten)
  const five = grade.five_point_scale
  if (five !== undefined && five !== null && five !== '') return String(five)
  return grade.pass ? 'зачёт' : '—'
}

/** HSE 10-point scale: 8–10 excellent, 6–7 good, 4–5 satisfactory, <4 fail. */
export function gradeTone(grade?: GradeValue): GradeTone {
  const ten = Number(grade?.ten_point_scale)
  if (!Number.isFinite(ten) || grade?.ten_point_scale === null) return grade?.pass ? 'success' : 'neutral'
  if (ten >= 8) return 'success'
  if (ten >= 6) return 'accent'
  if (ten >= 4) return 'warning'
  return 'danger'
}

export function averageTenPoint(grades: Array<{ grade?: GradeValue }>): number | null {
  const values = grades.map((g) => Number(g.grade?.ten_point_scale)).filter((v) => Number.isFinite(v) && v > 0)
  if (!values.length) return null
  return values.reduce((a, b) => a + b, 0) / values.length
}
