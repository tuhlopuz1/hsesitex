import { useCampuses } from '@/entities/room'
import { Card, Input } from '@/shared/ui'
import type { FreeRoomsForm } from '../model/useFreeRoomsForm'
import s from './FreeRoomsFilter.module.css'

interface Props {
  form: FreeRoomsForm
  update: <K extends keyof FreeRoomsForm>(key: K, value: FreeRoomsForm[K]) => void
}

export function FreeRoomsFilter({ form, update }: Props) {
  const campuses = useCampuses()

  return (
    <Card className={s.card}>
      <label className={s.field}>
        <span>Корпус</span>
        <select
          className={s.select}
          value={form.buildingId}
          onChange={(e) => update('buildingId', e.target.value)}
          disabled={campuses.isPending}
        >
          <option value="">{campuses.isPending ? 'Загрузка…' : 'Выберите корпус'}</option>
          {campuses.data?.map((campus, i) => (
            <optgroup key={campus.name ?? i} label={campus.name ?? (campus.near ? 'Рядом' : 'Корпуса')}>
              {campus.buildings?.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name ?? b.address ?? b.id}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        {campuses.isError && <small className={s.error}>{campuses.error.message}</small>}
      </label>

      <label className={s.field}>
        <span>Дата</span>
        <Input type="date" value={form.date} onChange={(e) => update('date', e.target.value)} />
      </label>

      <label className={s.field}>
        <span>С</span>
        <Input type="time" value={form.from} onChange={(e) => update('from', e.target.value)} />
      </label>

      <label className={s.field}>
        <span>До</span>
        <Input type="time" value={form.to} onChange={(e) => update('to', e.target.value)} />
      </label>

      <label className={s.field}>
        <span>Мест от</span>
        <Input
          type="number"
          min={1}
          value={form.capacity}
          onChange={(e) => update('capacity', Math.max(1, Number(e.target.value) || 1))}
        />
      </label>
    </Card>
  )
}
