import { api } from '@/lib/axios'

export interface GetPatientsQuery {
  page?: number | null
}

export interface GetPatientsResponse {
  patients: {
    email: string | null
    cpf: string | null
    status: string
    id: string
    name: string
    birthDate: string
    fone: string
    address: string
    payment: string
    responsible: string
    parent: string
    cpfResponsible: string | null
    createdAt: Date
    updatedAt: Date | null
  }[]
  meta: {
    page: number
    perPage: number
    totalCount: number
  }
}

export async function getPatients({ page }: GetPatientsQuery) {
  const token = localStorage.getItem('@ielo:token')
  if (!token) {
    throw new Error('Token não localizado')
  }

  const response = await api.get<GetPatientsResponse>('/patients', {
    params: {
      page,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}
