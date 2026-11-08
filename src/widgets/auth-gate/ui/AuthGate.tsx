import type { ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { useIsAuthenticated } from '@/shared/auth'
import { Button, Card, StateMessage } from '@/shared/ui'

interface Props {
  children: ReactNode
}

/** Shows a sign-in prompt instead of the page for guests (no hard redirect). */
export function AuthGate({ children }: Props) {
  const authed = useIsAuthenticated()
  const navigate = useNavigate()

  if (authed) return <>{children}</>
  return (
    <Card>
      <StateMessage
        title="Этот раздел доступен только после входа"
        description="Сервер ВШЭ отдаёт эти данные только с токеном учётной записи."
        action={<Button onClick={() => navigate('/login')}>Войти</Button>}
      />
    </Card>
  )
}
