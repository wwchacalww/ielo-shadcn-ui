import { api } from '@/lib/axios'

export interface GetMonthlyAppointmentsCountResponse {
  total: number
  percentage: string
}
export async function getMonthlyAppointmentsCount() {
  const token = localStorage.getItem('@ielo:token')
  if (!token) {
    throw new Error('Token não localizado')
  }

  const response = await api.get<GetMonthlyAppointmentsCountResponse>(
    '/appointments/monthly-appointments-count',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return response.data
}
