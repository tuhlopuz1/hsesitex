import { useMutation, useQueryClient } from '@tanstack/react-query'
import { libraryKeys, type LibraryBook } from '@/entities/library'
import { request } from '@/shared/api'
import { Button } from '@/shared/ui'

export function ProlongButton({ book }: { book: LibraryBook }) {
  const queryClient = useQueryClient()
  const prolong = useMutation({
    mutationFn: () =>
      request<void>(`library/users/literature/prolong/${encodeURIComponent(book.barcode)}`, {
        prefix: 'v3',
        method: 'POST',
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: libraryKeys.books }),
  })

  if (!book.can_prolong) return null
  if (prolong.isSuccess) return <span>Продлена</span>

  return (
    <Button size="sm" variant="secondary" loading={prolong.isPending} onClick={() => prolong.mutate()}>
      {prolong.isError ? 'Ошибка, ещё раз' : 'Продлить'}
    </Button>
  )
}
