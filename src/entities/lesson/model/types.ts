/** `TimetableDataEntity` from `v3/ruz/lessons`. */
export interface Lesson {
  id: string
  discipline?: string
  type?: string
  date_start: string
  date_end: string
  lesson_number_start?: number
  lesson_number_end?: number
  auditorium?: string
  auditorium_id?: number
  building?: string
  city?: string
  lecturer?: string
  lecturer_email?: string
  lecturer_profiles?: Array<{ id: string; email?: string; description?: string }>
  stream_links?: Array<{ link: string; description?: string }>
  note?: string
  is_ban?: boolean
}

export interface LessonsFilter {
  /** yyyy-MM-dd */
  start: string
  email?: string
  group?: string
  lecturer?: number
  auditorium?: string
}
