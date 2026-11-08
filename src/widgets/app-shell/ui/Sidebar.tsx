import { NavLink, useNavigate } from 'react-router'
import { useMe, userDisplayName } from '@/entities/user'
import { LogoutButton } from '@/features/auth'
import { useIsAuthenticated } from '@/shared/auth'
import { cn } from '@/shared/lib'
import { Avatar, Button } from '@/shared/ui'
import { NAV_ITEMS } from '../config/navigation'
import s from './Sidebar.module.css'

function UserBlock() {
  const me = useMe()
  const name = me.data ? userDisplayName(me.data) : '…'
  return (
    <div className={s.user}>
      <Avatar name={name} src={me.data?.avatar_url} size={36} />
      <div className={s.userText}>
        <span className={s.userName}>{name}</span>
        <LogoutButton />
      </div>
    </div>
  )
}

interface Props {
  open: boolean
  onNavigate: () => void
}

export function Sidebar({ open, onNavigate }: Props) {
  const authed = useIsAuthenticated()
  const navigate = useNavigate()
  const items = NAV_ITEMS.filter((i) => authed || !i.requiresAuth)

  return (
    <aside className={cn(s.sidebar, open && s.open)}>
      <div className={s.brand}>
        <span className={s.logo}>HSE</span>
        <span>App X · Web</span>
      </div>

      <nav className={s.nav}>
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            onClick={onNavigate}
            className={({ isActive }) => cn(s.link, isActive && s.active)}
          >
            <span className={s.icon} aria-hidden>
              {item.icon}
            </span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className={s.footer}>
        {authed ? (
          <UserBlock />
        ) : (
          <Button
            className={s.loginButton}
            onClick={() => {
              onNavigate()
              navigate('/login')
            }}
          >
            Войти
          </Button>
        )}
      </div>
    </aside>
  )
}
