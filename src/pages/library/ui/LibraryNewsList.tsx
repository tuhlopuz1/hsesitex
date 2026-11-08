import { useLibraryNews } from '@/entities/library'
import { formatDate } from '@/shared/lib'
import { Card, QueryView, StateMessage } from '@/shared/ui'
import s from './LibraryPage.module.css'

export function LibraryNewsList() {
  const news = useLibraryNews()
  return (
    <QueryView query={news} isEmpty={(list) => list.length === 0} empty={<StateMessage title="Новостей нет" />}>
      {(list) => (
        <div className={s.news}>
          {list.map((n) => (
            <Card key={n.id}>
              {n.datetime && <time className={s.label}>{formatDate(n.datetime)}</time>}
              <p className={s.newsText}>{n.annotation}</p>
              {n.link && (
                <a href={n.link} target="_blank" rel="noreferrer">
                  Подробнее ↗
                </a>
              )}
            </Card>
          ))}
        </div>
      )}
    </QueryView>
  )
}
