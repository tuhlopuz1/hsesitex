import type { ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { userDisplayName, type User } from '@/entities/user'
import { formatDate } from '@/shared/lib'
import { Avatar, Badge, Button, Card } from '@/shared/ui'
import s from './UserProfile.module.css'

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={s.row}>
      <span className={s.label}>{label}</span>
      <span>{children}</span>
    </div>
  )
}

/** Full profile card shared by "my profile" and "person" pages. */
export function UserProfile({ user, actions }: { user: User; actions?: ReactNode }) {
  const navigate = useNavigate()
  const name = userDisplayName(user)
  const phone = user.staff_address?.find((a) => a.phone_work || a.phone_internal_full)

  return (
    <div className={s.root}>
      <Card className={s.header}>
        <Avatar name={name} src={user.avatar_url} size={72} />
        <div className={s.headerText}>
          <h1 className={s.name}>{name}</h1>
          {user.description && <p className={s.description}>{user.description}</p>}
          <div className={s.badges}>
            {user.type && <Badge tone="accent">{user.type === 'student' ? 'Студент' : user.type === 'staff' ? 'Сотрудник' : user.type}</Badge>}
          </div>
        </div>
        <div className={s.actions}>
          {user.is_timetable_available !== false && user.email && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate(`/schedule?email=${encodeURIComponent(user.email ?? '')}`)}
            >
              Расписание
            </Button>
          )}
          {actions}
        </div>
      </Card>

      <Card>
        {user.email && (
          <Row label="Почта">
            <a href={`mailto:${user.email}`}>{user.email}</a>
          </Row>
        )}
        {user.birth_date && <Row label="Дата рождения">{formatDate(user.birth_date)}</Row>}
        {phone && <Row label="Телефон">{phone.phone_work ?? phone.phone_internal_full}</Row>}
        {user.contacts?.tg && <Row label="Telegram">{user.contacts.tg}</Row>}
        {user.contacts?.vk && <Row label="VK">{user.contacts.vk}</Row>}
      </Card>

      {user.education?.map((e, i) => (
        <Card key={i}>
          <h2 className={s.sectionTitle}>Образование</h2>
          {e.program_title && <Row label="Программа">{e.program_title}</Row>}
          {e.faculty_title && <Row label="Факультет">{e.faculty_title}</Row>}
          {e.degree && <Row label="Уровень">{e.degree}</Row>}
          {(e.start_year || e.graduation_year) && (
            <Row label="Годы">
              {e.start_year} – {e.graduation_year}
            </Row>
          )}
        </Card>
      ))}

      {!!user.staff_positions?.length && (
        <Card>
          <h2 className={s.sectionTitle}>Должности</h2>
          {user.staff_positions.map((p, i) => (
            <Row key={i} label={p.unit_name ?? ''}>
              {p.position_name}
            </Row>
          ))}
        </Card>
      )}
    </div>
  )
}
