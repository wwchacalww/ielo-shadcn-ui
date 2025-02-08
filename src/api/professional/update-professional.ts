import { api } from '@/lib/axios'

interface UpdateProfessionalBody {
  id: string
  name?: string | null
  birhDate?: string | null
  email?: string | null
  cpf?: string | null
  fone?: string | null
  address?: string | null
  description?: string | null
  birthDate?: string | null
  register?: string | null
  specialty?: string | null
}

export async function updateProfessional(data: UpdateProfessionalBody) {
  const token = localStorage.getItem('@ielo:token')
  if (!token) {
    throw new Error('Token não localizado')
  }
  return await api.put('/professional', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
