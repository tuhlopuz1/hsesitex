import { useMe } from '@/entities/user'
import { useIsAuthenticated } from '@/shared/auth'
import { useNow } from '@/shared/lib'
import { PageHeader } from '@/shared/ui'
import { TodayLessons, UpcomingDeadlines } from '@/widgets/dashboard'
import { GuestHome } from './GuestHome'
import s from './HomePage.module.css'

function greeting(hour: number) {
  if (hour < 6) return 'Доброй ночи'
  if (hour < 12) return 'Доброе утро'
  if (hour < 18) return 'Добрый день'
  return 'Добрый вечер'
}

export function HomePage() {
  const authed = useIsAuthenticated()
  const me = useMe()
  const now = useNow()

  if (!authed) return <GuestHome />

  const firstName = me.data?.first_name ?? me.data?.full_name?.split(' ')[1]
  return (
    <>
      <PageHeader title={`${greeting(now.getHours())}${firstName ? `, ${firstName}` : ''}`} />
      <div className={s.grid}>
        <TodayLessons />
        <UpcomingDeadlines />
      </div>
    </>
  )
}
