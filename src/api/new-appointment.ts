import { api } from '@/lib/axios'

type NewAppointmentProps = {
  specialty: string
  start: string
  end: string
  local: string
  payment: string
  value: number
  professionalId: string
  patientId: string
}

export async function newAppointment({
  specialty,
  start,
  end,
  local,
  payment,
  value,
  professionalId,
  patientId,
}: NewAppointmentProps) {
  const token = localStorage.getItem('@ielo:token')
  if (!token) {
    throw new Error('Token não localizado')
  }
  return await api.post(
    '/appointments',
    {
      specialty,
      start,
      end,
      local,
      payment,
      value,
      professionalId,
      patientId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
}
