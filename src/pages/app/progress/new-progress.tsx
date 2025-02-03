import { useMutation, useQuery } from '@tanstack/react-query'
import { intlFormat } from 'date-fns'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'sonner'
import { z } from 'zod'

import { getProgressByAppointmentId } from '@/api/get-progress-by-appointment-id'
import { registerProgress } from '@/api/register-progress'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
import { NewProgressBody } from '@/dtos'
import { isoDateToFormatedDate } from '@/lib/isoDateToFormatedDate'

import { ProgressHeader } from './components/header'
import { PatientProfessionalData } from './components/patient-professional-data'

const newProgressFormSchema = z.object({
  majorComplaint: z.string(),
  procedures: z.string(),
  progress: z.string(),
})

type NewProgressForm = z.infer<typeof newProgressFormSchema>

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
    queryKey: ['appointment', appId],
    queryFn: () => getProgressByAppointmentId({ id: appId }),
  })

  const { mutateAsync: saveProgress } = useMutation({
    mutationFn: registerProgress,
    onSuccess: () => {
      navigate('/profissional/agenda')
    },
    onError: () => toast.error('Erro ao salvar evolução. Tente novamente.'),
  })

  if (isError) {
    navigate('/profissional/agenda')
  }

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = useForm<NewProgressForm>()

  if (!isLoading && result) {
    birthDate = intlFormat(
      result.progress.patient.birthDate,
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
    setValue('majorComplaint', result.progress.progressData.majorComplaint)
    setValue('procedures', result.progress.progressData.procedures)
  }
  async function handleNewProgress(data: NewProgressForm) {
    const body: NewProgressBody = {
      status: 'rascunho',
      appointmentDate: result?.appointment.start ?? '',
      appointmentId: appId,
      patientId: result?.appointment.patientId ?? '',
      professionalId: result?.appointment.professionalId ?? '',
      supervisorId: result?.appointment.professionalId ?? '',
      ...data,
    }
    await saveProgress(body)
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
        <form onSubmit={handleSubmit(handleNewProgress)} className="space-y-4">
          <div className="flex min-h-[1010px] w-[720px] flex-col border-2 border-solid bg-white p-2 shadow-[rgba(0,0,15,0.5)_10px_5px_4px_0px]">
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
                supervisorName={result.progress.supervisor.name}
                supervisorRegister={result.progress.supervisor.register}
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
                {...register('majorComplaint')}
              />
            </div>
            <div className="mt-2 flex flex-col rounded-md border-2 p-2">
              <h2 className="text-black">
                2 - Procedimento Técnico e Científico:
              </h2>
              <Textarea
                className="mt-2 bg-white text-black"
                {...register('procedures')}
                rows={4}
              />
            </div>

            <div className="mt-2 flex flex-col rounded-md border-2 p-2">
              <h2 className="text-black">3 - Evoluções:</h2>
              {result ? (
                result.progress.progressData.progress.map((p) => {
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
              <span className="text-right text-sm font-semibold text-black">
                {appointmentDate}
              </span>
              <Textarea
                className="mt-2 bg-white text-black"
                {...register('progress')}
                rows={8}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="secondary"
              className="w-[720px]"
            >
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}
