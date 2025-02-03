import { api } from '@/lib/axios'

interface CancelAppointmentBody {
  id: number
}

export async function cancelAppointment({ id }: CancelAppointmentBody) {
  const token = localStorage.getItem('@ielo:token')
  if (!token) {
    throw new Error('Token não localizado')
  }
  return await api.put(
    '/appointments/change/status',
    {
      id,
      status: 'cancelado',
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
}
