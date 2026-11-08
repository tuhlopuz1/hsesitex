import { useNavigate } from 'react-router'
import { Button, StateMessage } from '@/shared/ui'

export function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <StateMessage
      title="Страница не найдена"
      action={<Button onClick={() => navigate('/')}>На главную</Button>}
    />
  )
}
