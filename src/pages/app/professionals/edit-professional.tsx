import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'sonner'
import { z, ZodError } from 'zod'

import { getProfessional } from '@/api/professional/get-professional'
import { updateProfessional } from '@/api/professional/update-professional'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const updateProfessionalForm = z.object({
  id: z.string().uuid(),
  name: z.string().optional().nullable(),
  birthDate: z.string().date().optional().nullable(),
  email: z.string().email().optional().nullable(),
  cpf: z.string().optional().nullable(),
  fone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  register: z.string().optional().nullable(),
  specialty: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
})
type UpdateProfessionalForm = z.infer<typeof updateProfessionalForm>

export function EditProfessional() {
  const { professionalId } = useParams()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<UpdateProfessionalForm>()

  const { data: professional } = useQuery({
    queryKey: ['professional', professionalId],
    queryFn: () => getProfessional({ professionalId: professionalId ?? '' }),
  })

  if (professional) {
    const { professional: pro } = professional
    const birthDay = new Date(pro.birthDate).toISOString().split('T')[0]
    setValue('name', pro.name)
    setValue('email', pro.email)
    setValue('birthDate', birthDay)

    setValue('cpf', pro.cpf)
    setValue('fone', pro.fone)
    setValue('address', pro.address)
    setValue('register', pro.register)

    setValue('specialty', pro.specialty)
    setValue('description', pro.description)
  }

  const { mutateAsync: editProfessional } = useMutation({
    mutationFn: updateProfessional,
  })

  async function handleEditProfessional(data: UpdateProfessionalForm) {
    try {
      data.id = professional?.professional.id ?? ''
      updateProfessionalForm.parse(data)
      const response = await editProfessional(data)
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
      <Helmet title="Profissional" />
      <div className="flex items-center justify-center">
        <div className="flex w-[360px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tighter">
              Alteração de dados do Profissional
            </h1>
            <p className="text-sm text-muted-foreground">
              Preencha os dados que deseja alterar.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleEditProfessional)}
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
              <Label htmlFor="register">Registro</Label>
              <Input id="register" type="text" {...register('register')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialty">Especialidade</Label>
              <Input id="specialty" type="text" {...register('specialty')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Input
                id="description"
                type="text"
                {...register('description')}
              />
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
