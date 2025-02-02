import { useQuery } from '@tanstack/react-query'
import { intlFormat } from 'date-fns'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams, useSearchParams } from 'react-router'
import { z } from 'zod'

import { getAppointmentById } from '@/api/get-appointment-by-id'
import { getProgressById } from '@/api/get-progress-by-id'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
import { progressTextProps } from '@/dtos'
import { isoDateToFormatedDate } from '@/lib/isoDateToFormatedDate'

import { ProgressHeader } from './components/header'
import { PatientProfessionalData } from './components/patient-professional-data'

export function EditProgress() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  let birthDate: string = ''
  const progressForEdit: progressTextProps = {
    appointmentDate: '',
    text: '',
  }
  const { appointmentId } = useParams()
  const appId = z.coerce
    .number()
    .transform((appId) => appId)
    .parse(appointmentId)
  const progressId = z.string().uuid().parse(searchParams.get('id'))
  const {
    data: progress,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['progress', progressId],
    queryFn: () => getProgressById({ id: progressId }),
  })

  const { data: appointment } = useQuery({
    queryKey: ['appointment', appId],
    queryFn: () => getAppointmentById({ id: appId }),
  })

  if (appointment && progress) {
    progress.progressData.progress.forEach((p) => {
      if (p.appointmentDate === appointment.appointment.start) {
        progressForEdit.appointmentDate = isoDateToFormatedDate(
          p.appointmentDate,
        )
        progressForEdit.text = p.text
      }
    })
  }

  if (isError) {
    navigate('/profissional/agenda')
  }

  if (!isLoading && progress) {
    birthDate = intlFormat(
      progress.patient.birthDate,
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        // weekday: 'long',
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
            Edição do Registro de Atendimento - Evolução
          </h1>
          <p className="text-sm text-muted-foreground">
            Preencha todos os campos para o registro de atendimento do paciente.
          </p>
        </div>
        <div className="flex min-h-[1010px] w-[720px] flex-col border-2 border-solid bg-white p-2 shadow-[rgba(0,0,15,0.5)_10px_5px_4px_0px]">
          <ProgressHeader />
          {isLoading && <Skeleton className="h-28 w-full" />}
          {progress && (
            <PatientProfessionalData
              name={progress.patient.name}
              birthDate={birthDate}
              phoneNumber={progress.patient.fone}
              paymentMethod={progress.patient.payment}
              psychologistName={progress.professional.name}
              psychologistRegister={progress.professional.register}
              supervisorName={progress.supervisor.name}
              supervisorRegister={progress.supervisor.register}
            />
          )}

          <div className="flex justify-center py-2 text-center">
            <h1 className="text-xl font-semibold uppercase text-black">
              Registro de Atendimentos
            </h1>
          </div>

          <div className="flex flex-col rounded-md border-2 p-2">
            <h2 className="text-black">1 - Queixa principal e CID: </h2>
            <Textarea
              className="mt-2 bg-white text-black"
              rows={4}
              defaultValue={progress?.progressData.majorComplaint}
            />
          </div>
          <div className="mt-2 flex flex-col rounded-md border-2 p-2">
            <h2 className="text-black">
              2 - Procedimento Técnico e Científico:
            </h2>
            <Textarea
              className="mt-2 bg-white text-black"
              rows={4}
              defaultValue={progress?.progressData.procedures}
            />
          </div>

          <div className="mt-2 flex flex-col rounded-md border-2 p-2">
            <h2 className="text-black">3 - Evoluções:</h2>
            {progress ? (
              progress.progressData.progress.map((p) => {
                if (p.appointmentDate === appointment?.appointment.start) {
                  return (
                    <>
                      <span
                        key={p.appointmentDate}
                        className="text-right text-sm font-semibold text-black"
                      >
                        {isoDateToFormatedDate(p.appointmentDate)}
                      </span>
                      <Textarea
                        key={p.appointmentDate}
                        className="mt-2 bg-white text-black"
                        rows={4}
                        defaultValue={p.text}
                      />
                    </>
                  )
                }
                return (
                  <>
                    <span
                      key={p.appointmentDate}
                      className="mt-1 text-right text-sm font-semibold text-black"
                    >
                      {isoDateToFormatedDate(p.appointmentDate)}
                    </span>
                    <span
                      key={p.appointmentDate}
                      className="font-regular text-sm text-black"
                    >
                      {p.text}
                    </span>
                  </>
                )
              })
            ) : (
              <Skeleton className="h-28 w-full" />
            )}
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
