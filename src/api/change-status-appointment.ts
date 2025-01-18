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

export interface ChangeStatusAppointmentBody {
  id: number
  status: AppointmentStatus
}

export async function changeStatusAppointment({
  id,
  status,
}: ChangeStatusAppointmentBody) {
  const token = localStorage.getItem('@ielo:token')
  if (!token) {
    throw new Error('Token não localizado')
  }
  return await api.put(
    '/appointments/change/status',
    {
      id,
      status,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
}
