import { useParams } from 'react-router'
import { usePerson } from '@/entities/user'
import { QueryView } from '@/shared/ui'
import { AuthGate } from '@/widgets/auth-gate'
import { UserProfile } from '@/widgets/user-profile'

function Person() {
  const { email = '' } = useParams()
  const person = usePerson(decodeURIComponent(email))
  return <QueryView query={person}>{(user) => <UserProfile user={user} />}</QueryView>
}

export function PersonPage() {
  return (
    <AuthGate>
      <Person />
    </AuthGate>
  )
}
