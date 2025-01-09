import { api } from '@/lib/axios'

interface ChangeMyPasswordBody {
  password: string
  newPassword: string
}

export async function changeMyPassword({
  password,
  newPassword,
}: ChangeMyPasswordBody) {
  const token = localStorage.getItem('@ielo:token')
  if (!token) {
    throw new Error('Token não localizado')
  }
  await api.put(
    '/change/my/password',
    {
      password,
      newPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
}
