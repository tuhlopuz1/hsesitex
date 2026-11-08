import { useMe } from '@/entities/user'
import { LogoutButton } from '@/features/auth'
import { QueryView } from '@/shared/ui'
import { AuthGate } from '@/widgets/auth-gate'
import { UserProfile } from '@/widgets/user-profile'

function MyProfile() {
  const me = useMe()
  return <QueryView query={me}>{(user) => <UserProfile user={user} actions={<LogoutButton />} />}</QueryView>
}

export function ProfilePage() {
  return (
    <AuthGate>
      <MyProfile />
    </AuthGate>
  )
}
