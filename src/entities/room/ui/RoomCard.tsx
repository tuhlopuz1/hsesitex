import { formatTime, useNow } from '@/shared/lib'
import { Badge, Card } from '@/shared/ui'
import type { FreeRoom } from '../model/types'
import s from './RoomCard.module.css'

function facilityLabel(f: NonNullable<FreeRoom['facilities']>[number]): string | null {
  if (f.boolean_value === false) return null
  const label = f.caption ?? f.type
  if (!label) return null
  return f.string_value ? `${label}: ${f.string_value}` : label
}

export function RoomCard({ room }: { room: FreeRoom }) {
  const now = useNow()
  const facilities = (room.facilities ?? []).map(facilityLabel).filter(Boolean)
  const nextBusy = room.schedule
    ?.filter((slot) => new Date(slot.start) > now)
    .sort((a, b) => a.start.localeCompare(b.start))[0]

  return (
    <Card className={s.card}>
      <div className={s.head}>
        <h3 className={s.title}>{room.description ?? room.id}</h3>
        {room.auditorium_floor && <Badge>{room.auditorium_floor} этаж</Badge>}
      </div>
      {room.auditorium_type && <p className={s.meta}>{room.auditorium_type}</p>}
      {nextBusy && <p className={s.meta}>Свободна до {formatTime(nextBusy.start)}</p>}
      {facilities.length > 0 && (
        <div className={s.facilities}>
          {facilities.map((f) => (
            <Badge key={f} tone="accent">
              {f}
            </Badge>
          ))}
        </div>
      )}
    </Card>
  )
}
