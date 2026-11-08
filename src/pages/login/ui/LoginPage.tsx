import { Navigate } from 'react-router'
import { LoginFlow } from '@/features/auth'
import { useIsAuthenticated } from '@/shared/auth'
import { PageHeader } from '@/shared/ui'

export function LoginPage() {
  const authed = useIsAuthenticated()

  if (authed) return <Navigate to="/" replace />
  return (
    <div style={{ maxWidth: 680 }}>
      <PageHeader title="Вход" subtitle="Через единую учётную запись ВШЭ, как в мобильном приложении" />
      <LoginFlow />
    </div>
  )
}
