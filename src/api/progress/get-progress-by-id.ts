import { GetProgressByIdResponse } from '@/dtos'
import { api } from '@/lib/axios'

export async function getProgressById({ id }: { id: string }) {
  const token = localStorage.getItem('@ielo:token')
  if (!token) {
    throw new Error('Token não localizado')
  }

  const response = await api.get<GetProgressByIdResponse>(
    `/progress/show/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return response.data
}
