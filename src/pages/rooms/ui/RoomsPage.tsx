import { RoomCard, useFreeRooms } from '@/entities/room'
import { FreeRoomsFilter, toFreeRoomsQuery, useFreeRoomsForm } from '@/features/free-rooms-filter'
import { useDebounced } from '@/shared/lib'
import { PageHeader, QueryView, StateMessage } from '@/shared/ui'
import { AuthGate } from '@/widgets/auth-gate'
import s from './RoomsPage.module.css'

function FreeRooms() {
  const { form, update } = useFreeRoomsForm()
  const query = useDebounced(toFreeRoomsQuery(form), 300)
  const rooms = useFreeRooms(query)

  return (
    <>
      <PageHeader title="Свободные аудитории" subtitle="Найдите, где можно позаниматься" />
      <FreeRoomsFilter form={form} update={update} />

      <div className={s.results}>
        {!query ? (
          <StateMessage title="Выберите корпус" />
        ) : (
          <QueryView
            query={rooms}
            isEmpty={(d) => !d.rooms?.length}
            empty={<StateMessage title="Свободных аудиторий нет" description="Попробуйте другое время или корпус" />}
          >
            {(d) => (
              <>
                <p className={s.count}>Найдено: {d.rooms?.length}</p>
                <div className={s.grid}>
                  {d.rooms?.map((room) => (
                    <RoomCard key={room.id} room={room} />
                  ))}
                </div>
              </>
            )}
          </QueryView>
        )}
      </div>
    </>
  )
}

export function RoomsPage() {
  return (
    <AuthGate>
      <FreeRooms />
    </AuthGate>
  )
}
