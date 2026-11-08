const pad = (n: number) => String(n).padStart(2, '0')

/** yyyy-MM-dd in local time — format the backend expects for dates. */
export function toIsoDate(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

/** yyyy-MM-ddTHH:mm:ss in local time — format used by `rooms/free`. */
export function toIsoLocalDateTime(date: Date): string {
  return `${toIsoDate(date)}T${pad(date.getHours())}:${pad(date.getMinutes())}:00`
}

export function addDays(date: Date, days: number): Date {
  const next = new Date(date)
  next.setDate(next.getDate() + days)
  return next
}

export function startOfDay(date: Date): Date {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

/** Monday of the week containing `date`. */
export function startOfWeek(date: Date): Date {
  const d = startOfDay(date)
  const shift = (d.getDay() + 6) % 7
  return addDays(d, -shift)
}

export function isSameDay(a: Date, b: Date): boolean {
  return toIsoDate(a) === toIsoDate(b)
}

const timeFmt = new Intl.DateTimeFormat('ru-RU', { hour: '2-digit', minute: '2-digit' })
const dayFmt = new Intl.DateTimeFormat('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' })
const shortDayFmt = new Intl.DateTimeFormat('ru-RU', { weekday: 'short', day: 'numeric' })
const dateTimeFmt = new Intl.DateTimeFormat('ru-RU', {
  day: 'numeric',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
})
const dateFmt = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })

const parse = (value: string | Date) => (value instanceof Date ? value : new Date(value))

export const formatTime = (v: string | Date) => timeFmt.format(parse(v))
export const formatDay = (v: string | Date) => dayFmt.format(parse(v))
export const formatShortDay = (v: string | Date) => shortDayFmt.format(parse(v))
export const formatDateTime = (v: string | Date) => dateTimeFmt.format(parse(v))
export const formatDate = (v: string | Date) => dateFmt.format(parse(v))

const relFmt = new Intl.RelativeTimeFormat('ru-RU', { numeric: 'auto' })

/** "через 3 дня", "вчера", "через 2 часа". */
export function formatRelative(value: string | Date, now = new Date()): string {
  const diffMs = parse(value).getTime() - now.getTime()
  const hours = diffMs / 3_600_000
  if (Math.abs(hours) < 24) return relFmt.format(Math.round(hours), 'hour')
  return relFmt.format(Math.round(hours / 24), 'day')
}
