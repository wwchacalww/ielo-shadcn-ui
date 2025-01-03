import { ProfessionalListProps } from './dto'

export type SelectProfessionals = {
  value: string
  label: string
}
export async function SelectProfessionals(
  token: string,
): Promise<SelectProfessionals[]> {
  try {
    const response = await fetch('http://localhost:3333/professionals', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    if (response.status !== 200) {
      throw new Error('Não foi possível listar os profissionais.')
    }
    const data = (await response.json()) as ProfessionalListProps
    const result = data.professionals.map((professional) => {
      return {
        value: professional.id,
        label: professional.name,
      }
    })

    return result
  } catch {
    throw new Error('Não foi possível listar os profissionais.')
  }
}
