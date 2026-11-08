import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { MenuItemCard, useCafe, useCafeMenu } from '@/entities/cafe'
import { formatShortDay } from '@/shared/lib'
import { PageHeader, QueryView, Segmented, StateMessage } from '@/shared/ui'
import { AuthGate } from '@/widgets/auth-gate'
import s from './CafePage.module.css'

function CafeMenu() {
  const { cafeId = '' } = useParams()
  const [day, setDay] = useState<string>()
  const cafe = useCafe(cafeId)
  const menu = useCafeMenu(cafeId, day)

  const days = menu.data?.available_days ?? []
  const dayPicker = days.length > 1 && (
    <Segmented
      options={days.map((d) => ({ value: d, label: formatShortDay(d) }))}
      value={day ?? menu.data?.current_day ?? days[0]}
      onChange={setDay}
    />
  )

  return (
    <>
      <Link to="/food" className={s.back}>
        ← Все кафе
      </Link>
      <PageHeader title={cafe.data?.cafe_name ?? 'Меню'} subtitle={cafe.data?.address} actions={dayPicker} />
      {cafe.data?.opening_hours && (
        <p className={s.hours}>
          {cafe.data.opening_hours
            .filter((h) => h.is_open !== false)
            .map((h) => `${h.day_of_week ?? ''} ${h.start_time ?? ''}–${h.end_time ?? ''}`.trim())
            .join(' · ')}
        </p>
      )}
      {menu.data?.notify && <p className={s.notify}>{menu.data.notify}</p>}
      <QueryView
        query={menu}
        isEmpty={(m) => !m.sections?.some((sec) => sec.items?.length)}
        empty={<StateMessage title="Меню на этот день нет" />}
      >
        {(m) => (
          <div className={s.sections}>
            {m.sections
              ?.filter((sec) => sec.items?.length)
              .map((sec, i) => (
                <section key={sec.section_name ?? i}>
                  {sec.section_name && <h2 className={s.sectionTitle}>{sec.section_name}</h2>}
                  <div className={s.items}>
                    {sec.items?.map((item) => (
                      <MenuItemCard key={item.item_id} item={item} />
                    ))}
                  </div>
                </section>
              ))}
          </div>
        )}
      </QueryView>
    </>
  )
}

export function CafePage() {
  return (
    <AuthGate>
      <CafeMenu />
    </AuthGate>
  )
}
