import { Link } from 'react-router'
import { useCafeCampuses, type Cafe } from '@/entities/cafe'
import { Badge, Card, PageHeader, QueryView, StateMessage } from '@/shared/ui'
import { AuthGate } from '@/widgets/auth-gate'
import s from './FoodPage.module.css'

function CafeTile({ cafe }: { cafe: Cafe }) {
  return (
    <Link to={`/food/${encodeURIComponent(cafe.cafe_id)}`} className={s.tileLink}>
      <Card interactive className={s.tile}>
        {cafe.photo && <img className={s.photo} src={cafe.photo} alt="" loading="lazy" />}
        <div className={s.tileBody}>
          <h3 className={s.tileTitle}>{cafe.cafe_name ?? 'Кафе'}</h3>
          {cafe.address && <p className={s.tileMeta}>{cafe.address}</p>}
          <div className={s.badges}>
            {cafe.has_menu && <Badge tone="accent">Есть меню</Badge>}
            {cafe.current_load && <Badge>{cafe.current_load}</Badge>}
          </div>
        </div>
      </Card>
    </Link>
  )
}

function Cafes() {
  const campuses = useCafeCampuses()
  return (
    <>
      <PageHeader title="Еда" subtitle="Столовые и кафе в корпусах" />
      <QueryView
        query={campuses}
        isEmpty={(list) => list.every((c) => !c.cafes?.length)}
        empty={<StateMessage title="Кафе не найдены" />}
      >
        {(list) => (
          <div className={s.campuses}>
            {list
              .filter((c) => c.cafes?.length)
              .map((campus) => (
                <section key={campus.campus_id}>
                  <h2 className={s.campusTitle}>{campus.campus_name}</h2>
                  <div className={s.grid}>
                    {campus.cafes?.map((cafe) => (
                      <CafeTile key={cafe.cafe_id} cafe={cafe} />
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

export function FoodPage() {
  return (
    <AuthGate>
      <Cafes />
    </AuthGate>
  )
}
