import { jwtDecode } from 'jwt-decode'

import { GetProfessionalsResponse } from '@/api/professional/get-professionals'
import { PayLoad } from '@/api/account/sign-in'

import { queryClient } from './react-query'

export function getProfileCached() {
  const token = localStorage.getItem('@ielo:token')
  if (!token) {
    throw new Error('Token não localizado')
  }
  const { sub } = jwtDecode<PayLoad>(token)

  const proCached = queryClient.getQueryData<GetProfessionalsResponse>([
    'profile',
    sub,
  ])
  return proCached
}
