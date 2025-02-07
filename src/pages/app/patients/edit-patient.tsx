import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'sonner'
import { z, ZodError } from 'zod'

import { getPatient } from '@/api/patient/get-patient'
import { updatePatient } from '@/api/patient/update-patient'
import { SelectItemsPayment } from '@/components/select-items-payment'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select'

const updatePatientForm = z.object({
  id: z.string().uuid(),
  name: z.string().optional().nullable(),
  birthDate: z.string().date().optional().nullable(),
  email: z.string().email().optional().nullable(),
  cpf: z.string().optional().nullable(),
  fone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  payment: z.string().optional().nullable(),
  responsible: z.string().optional().nullable(),
  parent: z.string().optional().nullable(),
  cpfResponsible: z.string().optional().nullable(),
  status: z.string().optional().default('Ativo').optional().nullable(),
})
type UpdatePatientForm = z.infer<typeof updatePatientForm>

export function EditPatient() {
  const { patientId } = useParams()

  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<UpdatePatientForm>()
  async function getPatientAndSetPayment() {
    const { patient } = await getPatient({ patientId: patientId ?? '' })
    return patient
  }
  const { data: patient } = useQuery({
    queryKey: ['patient', patientId],
    queryFn: getPatientAndSetPayment,
  })

  if (patient) {
    const birthDay = new Date(patient.birthDate).toISOString().split('T')[0]
    setValue('name', patient.name)
    setValue('email', patient.email)
    setValue('birthDate', birthDay)
    setValue('cpf', patient.cpf)
    setValue('fone', patient.fone)
    setValue('address', patient.address)
    setValue('responsible', patient.responsible)
    setValue('parent', patient.parent)
    setValue('cpfResponsible', patient.cpfResponsible)
    setValue('payment', patient.payment)
    setValue('status', patient.status)
  }

  const { mutateAsync: updatePatientFn } = useMutation({
    mutationFn: updatePatient,
  })

  async function handleUpdatePatient(data: UpdatePatientForm) {
    try {
      data.id = patientId ?? ''
      updatePatientForm.parse(data)
      const response = await updatePatientFn(data)
      if (response.status === 201) {
        navigate(-1)
      }
    } catch (error) {
      if (error instanceof ZodError) {
        error.errors.forEach((err) => {
          toast.error(err.message)
        })
      }
      if (error instanceof AxiosError) {
        error.response?.data.errors.details.forEach(
          (err: { message: string }) => {
            toast.error(err.message)
          },
        )
      }
    }
  }

  return (
    <>
      <Helmet title="Paciente" />
      <div className="flex items-center justify-center">
        <div className="flex w-[360px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tighter">
              Alteração de dados do Paciente
            </h1>
            <p className="text-sm text-muted-foreground">
              Preencha os dados que deseja alterar.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleUpdatePatient)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" type="text" {...register('name')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthDate">Data de nascimento</Label>
              <Input id="birthDate" type="date" {...register('birthDate')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cpf">CPF</Label>
              <Input id="cpf" type="text" {...register('cpf')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Endereço</Label>
              <Input id="address" type="text" {...register('address')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fone">Celular</Label>
              <Input id="fone" type="text" {...register('fone')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="responsible">Responsável</Label>
              <Input
                id="responsible"
                type="text"
                {...register('responsible')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="parent">Parentesco</Label>
              <Input id="parent" type="text" {...register('parent')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cpfResponsible">CPF do Responsável</Label>
              <Input
                id="cpfResponsible"
                type="text"
                {...register('cpfResponsible')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="payment">Pagamento</Label>
              {patient && (
                <Select
                  onValueChange={(e) => setValue('payment', e)}
                  defaultValue={patient.payment}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={patient.payment} />
                  </SelectTrigger>
                  <SelectItemsPayment />
                </Select>
              )}
            </div>

            <Button disabled={isSubmitting} className="w-full" type="submit">
              Salvar alteração
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
