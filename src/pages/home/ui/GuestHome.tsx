import { Link, useNavigate } from 'react-router'
import { PUBLIC_LINKS } from '@/shared/config/api'
import { Button, Card } from '@/shared/ui'
import s from './HomePage.module.css'

const PUBLIC_TOOLS = [
  {
    title: 'Навигатор по корпусу',
    description: 'Интерактивная карта корпуса на Покровском бульваре: аудитории, этажи, маршруты.',
    to: '/navigation',
  },
]

const EXTERNAL = [
  { title: 'Сайт ВШЭ', href: PUBLIC_LINKS.hse },
  { title: 'Единый личный кабинет', href: PUBLIC_LINKS.lk },
  { title: 'Поддержка HSE App X', href: PUBLIC_LINKS.support },
]

export function GuestHome() {
  const navigate = useNavigate()

  return (
    <div className={s.guest}>
      <section className={s.hero}>
        <h1 className={s.heroTitle}>HSE App X в браузере</h1>
        <p className={s.heroText}>
          Расписание, оценки, дедлайны, свободные аудитории, еда и библиотека ВШЭ. Те же данные, что в мобильном
          приложении, только на ноутбуке.
        </p>
        <Button onClick={() => navigate('/login')}>Войти через учётную запись ВШЭ</Button>
      </section>

      <section>
        <h2 className={s.blockTitle}>Без входа</h2>
        <div className={s.cards}>
          {PUBLIC_TOOLS.map((tool) => (
            <Link key={tool.to} to={tool.to} className={s.cardLink}>
              <Card interactive>
                <h3 className={s.cardTitle}>{tool.title}</h3>
                <p className={s.cardText}>{tool.description}</p>
              </Card>
            </Link>
          ))}
        </div>
        <ul className={s.links}>
          {EXTERNAL.map((l) => (
            <li key={l.href}>
              <a href={l.href} target="_blank" rel="noreferrer">
                {l.title} ↗
              </a>
            </li>
          ))}
        </ul>
        <p className={s.note}>
          Остальное (расписание, свободные аудитории, меню столовых, поиск людей) сервер ВШЭ отдаёт только
          авторизованным пользователям, поэтому без входа эти разделы недоступны.
        </p>
      </section>
    </div>
  )
}
