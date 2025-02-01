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

export type ProfessionalProps = {
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
  status?: boolean
  userId?: string
  createdAt: string
  updatedAt?: string
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

export type progressTextProps = {
  appointmentDate: string
  text: string
}

export type progressProps = {
  majorComplaint: string
  procedures: string
  progress: progressTextProps[]
}

export interface GetProgressByIdResponse {
  id: string
  patientId: string
  professionalId: string
  supervisorId: string
  status: string
  createdAt: Date
  updatedAt?: Date | null
  patient: {
    name: string
    birthDate: string
    fone: string
    payment: string
  }
  professional: {
    name: string
    register: string
  }
  supervisor: {
    name: string
    register: string
  }
  progressData: progressProps
}

export interface NewProgressBody {
  status: string
  patientId: string
  professionalId: string
  supervisorId: string
  appointmentId: number
  majorComplaint: string
  procedures: string
  progress: string
  appointmentDate: string
}

export interface GetProgressByAppointmentIdResponse {
  progress: GetProgressByIdResponse
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
