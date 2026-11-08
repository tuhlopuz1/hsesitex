import { Badge } from '@/shared/ui'
import type { MenuItem } from '../model/types'
import s from './MenuItemCard.module.css'

const priceFmt = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 })

export function MenuItemCard({ item }: { item: MenuItem }) {
  const photo = item.photos?.[0]
  const tags = [...(item.chips ?? []), ...(item.props ?? []).map((p) => p.label).filter((l): l is string => !!l)]

  return (
    <article className={s.card}>
      {photo && <img className={s.photo} src={photo} alt="" loading="lazy" />}
      <div className={s.body}>
        <div className={s.head}>
          <h4 className={s.title}>{item.item_name ?? 'Блюдо'}</h4>
          {item.price !== undefined && <span className={s.price}>{priceFmt.format(item.price)}</span>}
        </div>
        {item.composition && <p className={s.composition}>{item.composition}</p>}
        {tags.length > 0 && (
          <div className={s.tags}>
            {tags.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
