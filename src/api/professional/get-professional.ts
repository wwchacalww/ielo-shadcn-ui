import { api } from '@/lib/axios'

export interface GetProfessionalQuery {
  professionalId: string
}

export interface GetProfessionalResponse {
  professional: {
    id: string
    name: string
    birthDate: string
    email: string
    cpf: string
    fone: string
    address: string
    register: string
    specialty: string
    description: string
    status: string
  }
}

export async function getProfessional({
  professionalId,
}: GetProfessionalQuery): Promise<GetProfessionalResponse> {
  const token = localStorage.getItem('@ielo:token')
  if (!token) {
    throw new Error('Token não localizado')
  }

  const response = await api.get<GetProfessionalResponse>(
    `/professional/${professionalId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return response.data
}
