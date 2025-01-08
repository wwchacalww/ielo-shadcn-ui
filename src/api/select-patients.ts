import { api } from '@/lib/axios'

import { PatientListProps } from './dto'

export type SelectPatients = {
  value: string
  label: string
}
export async function selectPatients(): Promise<SelectPatients[]> {
  const token = localStorage.getItem('@ielo:token')
  if (!token) {
    throw new Error('Token não localizado')
  }

  const response = await api.get<PatientListProps>('/patients', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const data = response.data
  const result = data.patients.map((patient) => {
    return {
      value: patient.id,
      label: patient.name,
    }
  })
  return result
}
