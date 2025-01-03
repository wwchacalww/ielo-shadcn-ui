type NewAppointmentProps = {
  specialty: string
  start: string
  end: string
  local: string
  payment: string
  value: number
  professionalId: string
  patientId: string
}

export async function NewAppointment(data: NewAppointmentProps, token: string) {
  try {
    const response = await fetch('http://localhost:3333/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    return response
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
    throw new Error('Erro ao criar nova consulta')
  }
}
