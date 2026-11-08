import { useState } from 'react'
import type { FreeRoomsQuery } from '@/entities/room'
import { toIsoDate, toIsoLocalDateTime } from '@/shared/lib'

export interface FreeRoomsForm {
  buildingId: string
  date: string
  from: string
  to: string
  capacity: number
}

function initialForm(): FreeRoomsForm {
  const now = new Date()
  const inTwoHours = new Date(now.getTime() + 2 * 3_600_000)
  const hhmm = (d: Date) => toIsoLocalDateTime(d).slice(11, 16)
  return { buildingId: '', date: toIsoDate(now), from: hhmm(now), to: hhmm(inTwoHours), capacity: 1 }
}

export function toFreeRoomsQuery(form: FreeRoomsForm): FreeRoomsQuery | null {
  if (!form.buildingId) return null
  return {
    building_id: form.buildingId,
    date_from: `${form.date}T${form.from}:00`,
    date_to: `${form.date}T${form.to}:00`,
    capacity_gte: form.capacity,
    facilities: [],
  }
}

export function useFreeRoomsForm() {
  const [form, setForm] = useState(initialForm)
  const update = <K extends keyof FreeRoomsForm>(key: K, value: FreeRoomsForm[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }))
  return { form, update }
}
