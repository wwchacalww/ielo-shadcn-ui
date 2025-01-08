import { z } from 'zod'

import { api } from '@/lib/axios'

export const newProfessionalForm = z.object({
  name: z.string().min(10, { message: 'Nome muito curto' }),
  email: z.string().email('E-mail inválido'),
  birthDate: z.string().date('Data inválida'),
  cpf: z.string().min(10, { message: 'CPF inválido' }),
  address: z.string().min(10, { message: 'Endereço muito curto' }),
  description: z.string(),
  fone: z.string().min(8, { message: 'Telefone inválido' }),
  register: z.string(),
  specialty: z.string().min(3, { message: 'Especialidade muito curta' }),
})

export type NewProfessionalForm = z.infer<typeof newProfessionalForm>

export async function createProfessional({
  name,
  email,
  birthDate,
  cpf,
  address,
  description,
  fone,
  register,
  specialty,
}: NewProfessionalForm) {
  newProfessionalForm.parse({
    name,
    email,
    birthDate,
    cpf,
    address,
    description,
    fone,
    register,
    specialty,
  })
  const token = localStorage.getItem('@ielo:token')
  if (!token) {
    throw new Error('Token não localizado')
  }
  return await api.post(
    '/professionals',
    {
      name,
      email,
      birthDate,
      cpf,
      address,
      description,
      fone,
      register,
      specialty,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
}
