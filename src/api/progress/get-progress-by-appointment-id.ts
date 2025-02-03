import { GetProgressByAppointmentIdResponse } from '@/dtos'
import { api } from '@/lib/axios'

export async function getProgressByAppointmentId({ id }: { id: number }) {
  const token = localStorage.getItem('@ielo:token')
  if (!token) {
    throw new Error('Token não localizado')
  }

  const response = await api.get<GetProgressByAppointmentIdResponse>(
    `/progress/appointment/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return response.data
}
