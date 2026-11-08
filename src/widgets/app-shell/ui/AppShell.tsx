import { useState } from 'react'
import { Outlet } from 'react-router'
import { Sidebar } from './Sidebar'
import s from './AppShell.module.css'

export function AppShell() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className={s.shell}>
      <Sidebar open={menuOpen} onNavigate={() => setMenuOpen(false)} />
      {menuOpen && <div className={s.backdrop} onClick={() => setMenuOpen(false)} />}

      <div className={s.main}>
        <header className={s.topbar}>
          <button className={s.burger} onClick={() => setMenuOpen(true)} aria-label="Меню">
            ☰
          </button>
          <span className={s.topTitle}>HSE App X</span>
        </header>
        <main className={s.content}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
