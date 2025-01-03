import { PatientListProps } from './dto'

export type SelectPatients = {
  value: string
  label: string
}
export async function SelectPatients(token: string): Promise<SelectPatients[]> {
  try {
    const response = await fetch('http://localhost:3333/patients', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    if (response.status !== 200) {
      throw new Error('Não foi possível listar os pacientes.')
    }
    const data = (await response.json()) as PatientListProps
    const result = data.patients.map((patient) => {
      return {
        value: patient.id,
        label: patient.name,
      }
    })

    return result
  } catch {
    throw new Error('Não foi possível listar os pacientes.')
  }
}
