import { z } from 'zod'

import { api } from '@/lib/axios'

export const newPatientForm = z.object({
  name: z.string().min(10, { message: 'Nome muito curto' }),
  email: z.string().email('E-mail inválido'),
  birthDate: z.string().date('Data inválida'),
  cpf: z.string().optional(),
  address: z.string().min(10, { message: 'Endereço muito curto' }),
  fone: z.string().min(8, { message: 'Telefone inválido' }),
  responsible: z.string().optional(),
  parent: z.string().optional(),
  cpfResponsible: z.string().optional(),
  payment: z.string(),
})

export type NewPatientForm = z.infer<typeof newPatientForm>

export async function createPatient({
  name,
  email,
  birthDate,
  cpf,
  address,
  fone,
  responsible,
  parent,
  cpfResponsible,
  payment,
}: NewPatientForm) {
  newPatientForm.parse({
    name,
    email,
    birthDate,
    cpf,
    address,
    fone,
    responsible,
    parent,
    cpfResponsible,
    payment,
  })
  const token = localStorage.getItem('@ielo:token')
  if (!token) {
    throw new Error('Token não localizado')
  }
  if (cpf && cpf.length > 10) {
    return await api.post(
      '/patients',
      {
        name,
        email,
        birthDate,
        cpf,
        address,
        fone,
        responsible,
        parent,
        cpfResponsible: null,
        payment,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
  } else {
    return await api.post(
      '/patients',
      {
        name,
        email,
        birthDate,
        address,
        fone,
        responsible,
        parent,
        cpfResponsible,
        payment,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
  }
}
