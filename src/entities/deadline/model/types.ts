export interface PreviewPerson {
  id: string
  email?: string
  description?: string
}

export interface DeadlinePermissions {
  can_delete?: boolean
  can_edit?: boolean
  can_share?: boolean
  can_leave?: boolean
}

/** `DeadlineSingleDataEntity` from `v2/deadlines`. */
export interface Deadline {
  id: string
  description?: string
  discipline?: string
  expires_at?: string
  created_at?: string
  updated_at?: string
  completion_status?: 'ACTIVE' | 'COMPLETED' | 'COMPLETED_LATE'
  is_pinned?: boolean
  created_by?: PreviewPerson
  emails?: string[]
  groups?: string[]
  preview_people?: PreviewPerson[]
  permissions?: DeadlinePermissions
}

export interface DeadlineDraft {
  description: string
  discipline?: string
  /** ISO datetime */
  expires_at: string
  emails?: string[]
  groups?: string[]
}

export function isDeadlineCompleted(d: Deadline): boolean {
  return d.completion_status === 'COMPLETED' || d.completion_status === 'COMPLETED_LATE'
}
