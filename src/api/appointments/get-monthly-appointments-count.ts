import { api } from '@/lib/axios'

export interface GetMonthlyAppointmentsCountResponse {
  total: number
  percentage: string
}
type input = {
  query?: 'all' | 'social' | 'private' | 'plan' | null
}
export async function getMonthlyAppointmentsCount({ query = 'all' }: input) {
  const token = localStorage.getItem('@ielo:token')
  if (!token) {
    throw new Error('Token não localizado')
  }

  const response = await api.get<GetMonthlyAppointmentsCountResponse>(
    '/appointments/monthly-appointments-count',
    {
      params: {
        query,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return response.data
}
