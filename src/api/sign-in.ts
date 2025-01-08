import { z } from 'zod'

import { api } from '@/lib/axios'

const signInForm = z.object({
  email: z.string().email('Informe um email válido.'),
  password: z.string().min(6, 'A senha deve conter ao menos 6 caracteres.'),
})

export type SignInForm = z.infer<typeof signInForm>

export async function signIn({ email, password }: SignInForm) {
  signInForm.parse({ email, password })
  const response = await api.post('/sessions', {
    email,
    password,
  })
  if (response.status !== 201) {
    throw new Error('E-mail ou senha inválidos.')
  }

  // eslint-disable-next-line camelcase
  const { access_token } = response.data as { access_token: string }
  localStorage.setItem('@ielo:token', access_token)
}
