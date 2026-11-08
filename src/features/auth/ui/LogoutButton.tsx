import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { logout } from '@/shared/auth'
import { Button } from '@/shared/ui'

export function LogoutButton() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const onClick = () => {
    logout()
    queryClient.clear()
    navigate('/')
  }

  return (
    <Button variant="ghost" size="sm" onClick={onClick}>
      Выйти
    </Button>
  )
}
