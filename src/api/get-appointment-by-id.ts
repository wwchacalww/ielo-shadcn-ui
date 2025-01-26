import { GetAppointmentByIdResponse } from '@/dtos'
import { api } from '@/lib/axios'

export async function getAppointmentById({ id }: { id: number }) {
  const token = localStorage.getItem('@ielo:token')
  if (!token) {
    throw new Error('Token não localizado')
  }

  const response = await api.get<GetAppointmentByIdResponse>(
    `/appointments/show/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return response.data
}
