import { z } from 'zod'

const newAppointmentForm = z.object({
  specialty: z
    .string()
    .min(5, { message: 'Especialidade deve ter pelo menos 5 caracteres' }),
  startTime: z.string().time({ message: 'Horário inválido' }),
  endTime: z.string().time({ message: 'Horário inválido' }),
  local: z
    .string()
    .min(5, { message: 'Local deve ter pelo menos 5 caracteres' }),
  payment: z
    .string()
    .min(5, { message: 'Pagamento deve ter pelo menos 5 caracteres' }),
  professionalId: z.string().uuid({ message: 'ID do profissional inválido' }),
  patientId: z.string().uuid({ message: 'ID do paciente inválido' }),
})

export type NewAppointmentForm = z.infer<typeof newAppointmentForm>

export { newAppointmentForm }
