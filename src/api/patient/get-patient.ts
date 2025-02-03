import { api } from '@/lib/axios'

export interface GetPatientQuery {
  patientId: string
}

export interface GetPatientResponse {
  patient: {
    id: string
    name: string
    email: string | null
    birthDate: string
    cpf: string | null
    status: string
    fone: string
    address: string
    payment: string
    responsible: string
    parent: string
    cpfResponsible: string | null
    createdAt: Date
    updatedAt: Date | null
  }
}

export async function getPatient({
  patientId,
}: GetPatientQuery): Promise<GetPatientResponse> {
  const token = localStorage.getItem('@ielo:token')
  if (!token) {
    throw new Error('Token não localizado')
  }

  const response = await api.get<GetPatientResponse>(`/patient/${patientId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}
