import { jwtDecode } from 'jwt-decode'

import { PayLoad } from '@/api/account/sign-in'

import { queryClient } from './react-query'

export interface ProfessionalProps {
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

export interface ProfileProps {
  id: string
  name: string
  email: string
  role: string
  status: boolean
  Professional: ProfessionalProps[]
}
export function getProfileCached() {
  const token = localStorage.getItem('@ielo:token')
  if (!token) {
    throw new Error('Token não localizado')
  }
  const { sub } = jwtDecode<PayLoad>(token)

  const proCached = queryClient.getQueryData<ProfileProps>(['profile', sub])
  return proCached
}
