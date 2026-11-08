export interface NavItem {
  to: string
  label: string
  icon: string
  /** Hidden from guests (the backend rejects these without a token). */
  requiresAuth: boolean
}

export const NAV_ITEMS: NavItem[] = [
  { to: '/', label: 'Главная', icon: '⌂', requiresAuth: false },
  { to: '/schedule', label: 'Расписание', icon: '◷', requiresAuth: true },
  { to: '/grades', label: 'Оценки', icon: '★', requiresAuth: true },
  { to: '/deadlines', label: 'Дедлайны', icon: '✓', requiresAuth: true },
  { to: '/rooms', label: 'Свободные аудитории', icon: '▢', requiresAuth: true },
  { to: '/people', label: 'Люди', icon: '☺', requiresAuth: true },
  { to: '/food', label: 'Еда', icon: '◍', requiresAuth: true },
  { to: '/library', label: 'Библиотека', icon: '▤', requiresAuth: true },
  { to: '/notifications', label: 'Уведомления', icon: '◉', requiresAuth: true },
  { to: '/navigation', label: 'Навигатор по корпусу', icon: '⌖', requiresAuth: false },
  { to: '/profile', label: 'Профиль', icon: '◐', requiresAuth: true },
]
