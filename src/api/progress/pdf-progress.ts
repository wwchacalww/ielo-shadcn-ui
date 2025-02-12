import { env } from '@/env'

export async function pdfProgress({ id }: { id: string }) {
  const token = localStorage.getItem('@ielo:token')
  if (!token) {
    throw new Error('Token não localizado')
  }
  const response = await fetch(`${env.VITE_API_URL}/pdf/progress/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return await response.blob()
}
