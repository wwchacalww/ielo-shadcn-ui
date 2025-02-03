import { api } from '@/lib/axios'

type ProgressStatus =
  | 'rascunho'
  | 'aguardando responsável técnico'
  | 'finalizado'

export interface ChangeStatusProgressBody {
  id: string
  status: ProgressStatus
}

export async function changeStatusProgress({
  id,
  status,
}: ChangeStatusProgressBody) {
  const token = localStorage.getItem('@ielo:token')
  if (!token) {
    throw new Error('Token não localizado')
  }
  return await api.put(
    '/progress/change/status',
    {
      id,
      status,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
}
