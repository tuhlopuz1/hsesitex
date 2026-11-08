import { isDeadlineCompleted, type Deadline } from '@/entities/deadline'
import { Button } from '@/shared/ui'
import { useDeleteDeadline, useSetCompleted, useSetPinned } from '../model/mutations'

export function DeadlineActions({ deadline }: { deadline: Deadline }) {
  const complete = useSetCompleted()
  const pin = useSetPinned()
  const remove = useDeleteDeadline()
  const completed = isDeadlineCompleted(deadline)

  const onDelete = () => {
    if (window.confirm('Удалить дедлайн?')) remove.mutate(deadline.id)
  }

  return (
    <>
      <Button
        size="sm"
        variant={completed ? 'ghost' : 'secondary'}
        loading={complete.isPending}
        onClick={() => complete.mutate({ id: deadline.id, completed: !completed })}
      >
        {completed ? 'Вернуть в работу' : 'Выполнено'}
      </Button>
      <Button
        size="sm"
        variant="ghost"
        loading={pin.isPending}
        onClick={() => pin.mutate({ id: deadline.id, pinned: !deadline.is_pinned })}
      >
        {deadline.is_pinned ? 'Открепить' : 'Закрепить'}
      </Button>
      {deadline.permissions?.can_delete !== false && (
        <Button size="sm" variant="danger" loading={remove.isPending} onClick={onDelete}>
          Удалить
        </Button>
      )}
    </>
  )
}
