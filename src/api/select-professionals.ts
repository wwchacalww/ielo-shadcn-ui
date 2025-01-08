import { api } from '@/lib/axios'

import { ProfessionalListProps } from './dto'

export type SelectProfessionals = {
  value: string
  label: string
}

export async function selectProfessionals() {
  const token = localStorage.getItem('@ielo:token')
  if (!token) {
    throw new Error('Token não localizado')
  }

  const response = await api.get<ProfessionalListProps>('/professionals', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const data = response.data
  const result = data.professionals.map((professional) => {
    return {
      value: professional.id,
      label: professional.name,
    }
  })
  return result
}
