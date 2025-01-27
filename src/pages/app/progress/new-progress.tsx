import { useQuery } from '@tanstack/react-query'
import { intlFormat } from 'date-fns'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router'
import { z } from 'zod'

import { getAppointmentById } from '@/api/get-appointment-by-id'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'

import { ProgressHeader } from './components/header'
import { PatientProfessionalData } from './components/patient-professional-data'

export function NewProgress() {
  const navigate = useNavigate()
  let birthDate: string = ''
  let appointmentDate: string = ''
  const { appointmentId } = useParams()
  const appId = z.coerce
    .number()
    .transform((appId) => appId)
    .parse(appointmentId)

  const {
    data: result,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['progress', appId],
    queryFn: () => getAppointmentById({ id: appId }),
  })

  if (isError) {
    navigate('/profissional/agenda')
  }

  if (!isLoading && result) {
    birthDate = intlFormat(
      result.appointment.patient.birthDate,
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        // weekday: 'long',
      },
      { locale: 'pt-BR' },
    )
    appointmentDate = intlFormat(
      result.appointment.start,
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric',
      },
      { locale: 'pt-BR' },
    )
  }

  return (
    <>
      <Helmet title="Evolução" />
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tighter">
            Registro de Atendimento - Evolução
          </h1>
          <p className="text-sm text-muted-foreground">
            Preencha todos os campos para o registro de atendimento do paciente.
          </p>
        </div>
        <div className="flex h-[1010px] w-[720px] flex-col border-2 border-solid bg-white p-2 shadow-[rgba(0,0,15,0.5)_10px_5px_4px_0px]">
          <ProgressHeader />
          {isLoading && <Skeleton className="h-28 w-full" />}
          {result && (
            <PatientProfessionalData
              name={result.appointment.patient.name}
              birthDate={birthDate}
              phoneNumber={result.appointment.patient.fone}
              paymentMethod={result.appointment.payment}
              psychologistName={result.appointment.professional.name}
              psychologistRegister={result.appointment.professional.register}
              supervisorName={'Supervisor nome'}
              supervisorRegister={'CRP-23432'}
            />
          )}

          <div className="flex justify-center py-2 text-center">
            <h1 className="text-xl font-semibold uppercase text-black">
              Registro de Atendimentos
            </h1>
          </div>

          <div className="flex flex-col rounded-md border-2 p-2">
            <h2 className="text-black">1 - Queixa principal e CID: </h2>
            <Textarea className="mt-2 bg-white text-black" rows={4} />
          </div>
          <div className="mt-2 flex flex-col rounded-md border-2 p-2">
            <h2 className="text-black">
              2 - Procedimento Técnico e Científico:
            </h2>
            <Textarea className="mt-2 bg-white text-black" rows={4} />
          </div>
          <div className="mt-2 flex flex-col rounded-md border-2 p-2">
            <h2 className="text-black">3 - Evoluções:</h2>
            <span className="text-sm font-semibold text-black">
              {appointmentDate}
            </span>
            <Textarea className="mt-2 bg-white text-black" rows={12} />
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit" variant="secondary" className="w-[720px]">
            Salvar
          </Button>
        </div>
      </div>
    </>
  )
}
