import type { ReactNode } from 'react'
import type { UseQueryResult } from '@tanstack/react-query'
import { Button } from '../Button/Button'
import { Spinner, StateMessage } from '../StateMessage/StateMessage'

interface Props<T> {
  query: UseQueryResult<T>
  /** Treat data as empty (renders `empty` instead of children). */
  isEmpty?: (data: T) => boolean
  empty?: ReactNode
  children: (data: T) => ReactNode
}

/** Renders loading / error / empty / data states for a query in one place. */
export function QueryView<T>({ query, isEmpty, empty, children }: Props<T>) {
  if (query.isPending) return <Spinner />

  if (query.isError) {
    return (
      <StateMessage
        tone="error"
        title="Не удалось загрузить"
        description={query.error.message}
        action={
          <Button variant="secondary" size="sm" onClick={() => query.refetch()}>
            Повторить
          </Button>
        }
      />
    )
  }

  if (isEmpty?.(query.data)) return <>{empty ?? <StateMessage title="Пока пусто" />}</>
  return <>{children(query.data)}</>
}
