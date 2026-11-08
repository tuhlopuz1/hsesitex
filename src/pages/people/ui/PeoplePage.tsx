import { PeopleSearch } from '@/features/people-search'
import { PageHeader } from '@/shared/ui'
import { AuthGate } from '@/widgets/auth-gate'

export function PeoplePage() {
  return (
    <AuthGate>
      <PageHeader title="Люди" subtitle="Студенты и сотрудники ВШЭ" />
      <PeopleSearch />
    </AuthGate>
  )
}
