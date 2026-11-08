import { useState, type FormEvent } from 'react'
import { useDeadlineDisciplines } from '@/entities/deadline'
import { addDays, toIsoDate } from '@/shared/lib'
import { Button, Card, Input, Textarea } from '@/shared/ui'
import { useCreateDeadline } from '../model/mutations'
import s from './CreateDeadlineForm.module.css'

interface Props {
  onDone: () => void
}

export function CreateDeadlineForm({ onDone }: Props) {
  const [description, setDescription] = useState('')
  const [discipline, setDiscipline] = useState('')
  const [date, setDate] = useState(() => toIsoDate(addDays(new Date(), 7)))
  const [time, setTime] = useState('23:59')

  const disciplines = useDeadlineDisciplines()
  const create = useCreateDeadline()

  const submit = (e: FormEvent) => {
    e.preventDefault()
    create.mutate(
      {
        description: description.trim(),
        discipline: discipline.trim() || undefined,
        expires_at: new Date(`${date}T${time}`).toISOString(),
      },
      { onSuccess: onDone },
    )
  }

  return (
    <Card>
      <form className={s.form} onSubmit={submit}>
        <Textarea
          placeholder="Что нужно сделать?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          autoFocus
        />
        <div className={s.row}>
          <Input
            list="deadline-disciplines"
            placeholder="Дисциплина (необязательно)"
            value={discipline}
            onChange={(e) => setDiscipline(e.target.value)}
          />
          <datalist id="deadline-disciplines">
            {disciplines.data?.map((d) => <option key={d} value={d} />)}
          </datalist>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
        </div>
        {create.isError && <p className={s.error}>{create.error.message}</p>}
        <div className={s.actions}>
          <Button type="button" variant="ghost" onClick={onDone}>
            Отмена
          </Button>
          <Button type="submit" loading={create.isPending} disabled={!description.trim()}>
            Создать
          </Button>
        </div>
      </form>
    </Card>
  )
}
