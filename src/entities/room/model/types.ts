export interface Building {
  id: string
  name?: string
  address?: string
  distance?: number
}

export interface Campus {
  near?: boolean
  name?: string
  buildings?: Building[]
}

export interface RoomFacility {
  type?: string
  caption?: string
  boolean_value?: boolean
  string_value?: string
}

export interface RoomScheduleSlot {
  start: string
  type?: string
  description?: string
}

/** `RoomsFreeRoomDataEntity`. */
export interface FreeRoom {
  id: string
  description?: string
  type?: string
  auditorium_type?: string
  auditorium_floor?: string
  auditorium_building?: string
  auditorium_sub_building?: string
  facilities?: RoomFacility[]
  images?: string[]
  schedule?: RoomScheduleSlot[]
}

export interface FreeRoomsResponse {
  building?: Building
  rooms?: FreeRoom[]
}

export interface FreeRoomsQuery {
  building_id: string
  /** yyyy-MM-ddTHH:mm:ss, local time */
  date_from: string
  date_to: string
  capacity_gte: number
  facilities: string[]
}
