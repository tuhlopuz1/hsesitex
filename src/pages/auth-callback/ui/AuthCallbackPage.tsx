import { useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { useCallbackLogin } from '@/features/auth'
import { Button, Card, Spinner, StateMessage } from '@/shared/ui'

/** Lands here after the Keycloak redirect flow, exchanges the code, then goes home. */
export function AuthCallbackPage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const login = useCallbackLogin()
  const started = useRef(false)

  const code = params.get('code')
  const kcError = params.get('error_description') ?? params.get('error')

  useEffect(() => {
    if (started.current || !code) return
    started.current = true
    login.mutate(code, { onSuccess: () => navigate('/', { replace: true }) })
  }, [code, login, navigate])

  if (kcError || !code) {
    return (
      <Card>
        <StateMessage
          tone="error"
          title="Не удалось войти через редирект"
          description={
            kcError
              ? `Сервер ВШЭ отклонил адрес возврата: ${kcError}. Значит этот способ для нашего адреса не разрешён — используйте ручной ввод кода.`
              : 'Код авторизации не получен.'
          }
          action={<Button onClick={() => navigate('/login', { replace: true })}>К странице входа</Button>}
        />
      </Card>
    )
  }

  if (login.isError) {
    return (
      <Card>
        <StateMessage
          tone="error"
          title="Не удалось обменять код на токен"
          description={login.error.message}
          action={<Button onClick={() => navigate('/login', { replace: true })}>Попробовать снова</Button>}
        />
      </Card>
    )
  }

  return <Spinner />
}
