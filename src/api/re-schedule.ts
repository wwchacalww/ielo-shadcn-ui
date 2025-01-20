import { api } from '@/lib/axios'

interface ReScheduleBody {
  id: number
  start: string
  end: string
}

export async function reSchedule({ id, start, end }: ReScheduleBody) {
  const token = localStorage.getItem('@ielo:token')
  if (!token) {
    throw new Error('Token não localizado')
  }
  return await api.put(
    '/appointments/alter',
    {
      id,
      start,
      end,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
}
