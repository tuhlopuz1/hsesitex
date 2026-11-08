export interface UserEducation {
  degree?: string
  department?: string
  faculty_title?: string
  program_title?: string
  speciality?: string
  start_year?: string
  graduation_year?: string
  university_title?: string
}

export interface StaffPosition {
  position_name?: string
  unit_name?: string
  is_main?: boolean
}

export interface StaffAddress {
  phone_internal_full?: string
  phone_work?: string
  presence_time?: string
  presence_type?: string
}

/** `UserDataEntity` — full profile from `dump/me` and `dump/email/{email}`. */
export interface User {
  id: string
  email?: string
  type?: string
  description?: string
  full_name?: string
  first_name?: string
  last_name?: string
  middle_name?: string
  avatar_url?: string
  birth_date?: string
  contacts?: { tg?: string; vk?: string }
  education?: UserEducation[]
  staff_positions?: StaffPosition[]
  staff_address?: StaffAddress[]
  staff_phone_mobile?: string
  is_timetable_available?: boolean
}

/** `DumpDataEntity` — short search result item. */
export interface DumpItem {
  id: string
  type?: 'student' | 'staff' | 'group' | 'auditorium' | string
  email?: string
  label?: string
  description?: string
  avatar?: string
  room?: string
}
