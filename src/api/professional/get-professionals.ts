import { api } from '@/lib/axios'

export interface GetProfessionalsQuery {
  page?: number | null
}

export interface GetProfessionalsResponse {
  professionals: {
    name: string
    birthDate: string
    email: string
    cpf: string
    fone: string
    address: string
    status: boolean
    id: string
    createdAt: string
    updatedAt: string | null
    register: string
    specialty: string
    description: string
    userId: string
  }[]
  meta: {
    page: number
    perPage: number
    totalCount: number
  }
}

export async function getProfessionals({ page }: GetProfessionalsQuery) {
  const token = localStorage.getItem('@ielo:token')
  if (!token) {
    throw new Error('Token não localizado')
  }

  const response = await api.get<GetProfessionalsResponse>('/professionals', {
    params: {
      page,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}
