import { useState } from 'react'
import { PersonRow, useDumpSearch } from '@/entities/user'
import { useDebounced } from '@/shared/lib'
import { Card, Input, QueryView, Segmented, StateMessage, type SegmentedOption } from '@/shared/ui'
import s from './PeopleSearch.module.css'

type SearchType = 'all' | 'student' | 'staff'

const TYPES: SegmentedOption<SearchType>[] = [
  { value: 'all', label: 'Все' },
  { value: 'student', label: 'Студенты' },
  { value: 'staff', label: 'Сотрудники' },
]

export function PeopleSearch() {
  const [text, setText] = useState('')
  const [type, setType] = useState<SearchType>('all')
  const q = useDebounced(text.trim(), 350)
  const search = useDumpSearch(q, type === 'all' ? undefined : type)

  return (
    <div className={s.root}>
      <div className={s.controls}>
        <Input
          type="search"
          placeholder="ФИО, почта или группа"
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoFocus
        />
        <Segmented options={TYPES} value={type} onChange={setType} />
      </div>

      {q.length < 2 ? (
        <StateMessage title="Начните вводить имя" description="Минимум 2 символа" />
      ) : (
        <QueryView
          query={search}
          isEmpty={(list) => list.length === 0}
          empty={<StateMessage title="Никого не нашли" />}
        >
          {(list) => (
            <Card className={s.results}>
              {list.map((item) => (
                <PersonRow key={item.id ?? item.email} item={item} />
              ))}
            </Card>
          )}
        </QueryView>
      )}
    </div>
  )
}
