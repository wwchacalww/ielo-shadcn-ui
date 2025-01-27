import { api } from '@/lib/axios'

interface ProfessionalResponse {
  status: boolean
  id: string
  name: string
  email: string
  birthDate: Date
  cpf: string
  fone: string
  address: string
  register: string
  specialty: string
  description: string
  userId: string
  createdAt: Date
  updatedAt: Date | null
}

export interface GetProfileResponse {
  profile: {
    id: string
    name: string
    email: string
    role: string
    status: boolean
    Professional: ProfessionalResponse[]
  }
}

export async function getProfile() {
  const token = localStorage.getItem('@ielo:token')
  if (!token) {
    throw new Error('Token não localizado')
  }

  const response = await api.get<GetProfileResponse>('/profile/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const { profile } = response.data

  return profile
}
