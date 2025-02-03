import { api } from '@/lib/axios'

type AppointmentStatus =
  | 'agendado'
  | 'reagendado'
  | 'em consulta'
  | 'cancelado'
  | 'faltou'
  | 'aguardando evolução'
  | 'aguardando responsável técnico'
  | 'finalizado'

export interface GetAppointmentsQuery {
  value?: number | null
  range?: string | null
  proId?: string | undefined
  patId?: string | undefined
  page?: number | null
}

export interface GetAppointmentsResponse {
  appointments: {
    id: number
    specialty: string
    start: string
    end: string
    local: string
    status: AppointmentStatus
    payment: string
    value: string
    professionalId: string
    patientId: string
    progressId?: string | null
    createdAt: string
    updatedAt: string
    professional: {
      name: string
    }
    patient: {
      name: string
    }
  }[]
  meta: {
    page: number
    perPage: number
    totalCount: number
  }
}

export async function getAppointments({
  range,
  value,
  page,
}: GetAppointmentsQuery) {
  const token = localStorage.getItem('@ielo:token')
  if (!token) {
    throw new Error('Token não localizado')
  }

  const response = await api.get<GetAppointmentsResponse>('/appointments', {
    params: {
      range,
      value,
      page,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}
