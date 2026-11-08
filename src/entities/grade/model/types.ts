import type { CatalogItem } from '@/shared/api'

export interface GradeValue {
  ten_point_scale?: string | number | null
  five_point_scale?: string | number | null
  pass?: boolean
}

/** `SubjectDataItem` from `v2/grades`. */
export interface SubjectGrade {
  id: string
  discipline?: string
  credits?: number
  period_credits?: number
  date?: string
  type_raw?: string
  program_id?: string
  grade?: GradeValue
}

export interface GradesResponse {
  items?: SubjectGrade[]
  available_academic_years?: string[]
  current_academic_year?: string
  selected_academic_year?: string
  available_programs?: CatalogItem[]
  selected_program?: string
}

export interface GradesFilter {
  academicYear?: string
  programId?: string
}
