import { api } from '@/lib/axios'

import { GetAppointmentsResponse } from './get-appointments'

interface GetAppointmentsQuery {
  value?: number | null
  range?: string | null
  page?: number | null
}

export async function getAppointmentsProfessional({
  range,
  value,
  page,
}: GetAppointmentsQuery) {
  const token = localStorage.getItem('@ielo:token')
  if (!token) {
    throw new Error('Token não localizado')
  }

  const response = await api.get<GetAppointmentsResponse>(
    '/appointments/list/professional',
    {
      params: {
        range,
        value,
        page,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return response.data
}
