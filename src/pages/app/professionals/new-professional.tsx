import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { ZodError } from 'zod'

import {
  createProfessional,
  NewProfessionalForm,
  newProfessionalForm,
} from '@/api/create-professional'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function NewProfessional() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<NewProfessionalForm>()

  const { mutateAsync: addProfessional } = useMutation({
    mutationFn: createProfessional,
  })

  async function handleNewProfessional(data: NewProfessionalForm) {
    try {
      newProfessionalForm.parse(data)
      const response = await addProfessional(data)
      if (response.status === 201) {
        navigate('/')
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
              Cadastro de Novo Profissional
            </h1>
            <p className="text-sm text-muted-foreground">
              Preencha todos os campos para cadastrar um novo profissional.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleNewProfessional)}
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
              Finalizar cadastro
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
