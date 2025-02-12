import { api } from '@/lib/axios'

interface RegisterProgressBody {
  status: string
  patientId: string
  professionalId: string
  appointmentId: number
  majorComplaint: string
  procedures: string
  progress: string
  appointmentDate: string
}

export async function registerProgress({
  status,
  patientId,
  professionalId,
  appointmentId,
  majorComplaint,
  procedures,
  progress,
  appointmentDate,
}: RegisterProgressBody) {
  const token = localStorage.getItem('@ielo:token')
  if (!token) {
    throw new Error('Token não localizado')
  }
  const response = await api.post<RegisterProgressBody>(
    '/progress',
    {
      status,
      patientId,
      professionalId,
      appointmentId,
      majorComplaint,
      procedures,
      progress,
      appointmentDate,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return response.data
}
