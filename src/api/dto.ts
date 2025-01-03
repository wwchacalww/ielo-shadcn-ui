export type PatientProps = {
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
  status: boolean
  createdAt: string
  updatedAt: string
}

export type PatientListProps = {
  patients: PatientProps[]
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
  status: true
  userId: string
  createdAt: string
  updatedAt: string
}

export type ProfessionalListProps = {
  professionals: ProfessionalProps[]
}
