export interface OpeningHour {
  day_of_week?: string
  start_time?: string
  end_time?: string
  is_open?: boolean
}

/** `CafeDataEntity`. */
export interface Cafe {
  cafe_id: string
  cafe_name?: string
  address?: string
  description?: string
  photo?: string
  banner?: string
  has_menu?: boolean
  current_load?: string
  opening_hours?: OpeningHour[]
}

/** `CafeCampusDataEntity` from `food/cafes`. */
export interface CafeCampus {
  campus_id: string
  campus_name?: string
  cafes?: Cafe[]
}

export interface MenuItem {
  item_id: string
  item_name?: string
  composition?: string
  price?: number
  photos?: string[]
  chips?: string[]
  props?: Array<{ label?: string; type?: string }>
}

export interface MenuSection {
  section_name?: string
  items?: MenuItem[]
}

/** `CafeMenuDataEntity` from `food/v2/cafes/{id}/menu`. */
export interface CafeMenu {
  cafe_id?: string
  current_day?: string
  available_days?: string[]
  notify?: string
  sections?: MenuSection[]
}
