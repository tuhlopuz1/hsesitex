/** `LibraryBookDataEntity`. */
export interface LibraryBook {
  barcode: string
  author?: string
  info?: string
  subscription_name?: string
  date_start?: string
  date_end?: string
  date_return?: string
  can_prolong?: boolean
}

/** `LibraryUserDataEntity`. */
export interface LibraryUser {
  barcode?: string
  has_library_card?: boolean
  issued_date?: string
  library_card_receive_link?: string
  remote_access?: {
    has_remote_access?: boolean
    login?: string
    about_link?: string
    receive_link?: string
  }
}

export interface LibraryNews {
  id: number
  annotation?: string
  datetime?: string
  link?: string
}
