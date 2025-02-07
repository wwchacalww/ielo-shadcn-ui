import { api } from '@/lib/axios'

interface UpdatePatientBody {
  id: string
  name?: string | null
  birhDate?: string | null
  email?: string | null
  cpf?: string | null
  fone?: string | null
  address?: string | null
  payment?: string | null
  responsible?: string | null
  parent?: string | null
  cpfResponsible?: string | null
  status?: string | null
}

export async function updatePatient(data: UpdatePatientBody) {
  console.log(data)
  const token = localStorage.getItem('@ielo:token')
  if (!token) {
    throw new Error('Token não localizado')
  }
  return await api.put('/patient/', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
