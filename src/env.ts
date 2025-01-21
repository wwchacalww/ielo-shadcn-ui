import { z } from 'zod'

const envSchema = z.object({
  VITE_API_URL: z.string().url(),
  VITE_PAYMENTS_LIST: z.string(),
})

export const env = envSchema.parse(import.meta.env)
