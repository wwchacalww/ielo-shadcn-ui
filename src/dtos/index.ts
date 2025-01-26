export type AppointmentStatus =
  | 'agendado'
  | 'reagendado'
  | 'em consulta'
  | 'cancelado'
  | 'faltou'
  | 'aguardando evolução'
  | 'aguardando responsável técnico'
  | 'finalizado'

type PatientProps = {
  id: string
  name: string
  birthDate: string
  email: string
  cpf: string
  fone: string
  address: string
  payment: string
  responsible: string
  parent: string
  cpfResponsible: string
  status: string
  createdAt: string
  updatedAt: string
}

type ProfessionalProps = {
  id: string
  name: string
  birthDate: string
  email: string
  cpf: string
  fone: string
  address: string
  register: string
  specialty: string
  description: string
  status: boolean
  userId: string
  createdAt: string
  updatedAt: string
}

export interface GetAppointmentByIdResponse {
  appointment: {
    id: number
    specialty: string
    start: string
    end: string
    local: string
    status: AppointmentStatus
    payment: string
    value: string
    professionalId: string
    patientId: string
    createdAt: string
    updatedAt: string
    patient: PatientProps
    professional: ProfessionalProps
  }
}
