import type { DumpItem, User } from './types'

/** The backend is inconsistent about where the name lives; try every known field. */
export function userDisplayName(user: Partial<User & DumpItem>): string {
  const composed = [user.last_name, user.first_name, user.middle_name].filter(Boolean).join(' ')
  return user.full_name || composed || user.label || user.email || 'Без имени'
}
