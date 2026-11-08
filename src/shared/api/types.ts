/** Cursor-paginated list used across the backend (`MList` in the app). */
export interface CursorList<T> {
  items?: T[]
  more?: boolean
  next_cursor?: string
}

/** Generic `{ id, name }` catalog item. */
export interface CatalogItem {
  id: string
  name?: string
  description?: string
}
