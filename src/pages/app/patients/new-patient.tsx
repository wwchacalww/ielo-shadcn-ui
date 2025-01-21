import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { ZodError } from 'zod'

import {
  createPatient,
  NewPatientForm,
  newPatientForm,
} from '@/api/create-patient'
import { SelectPayment } from '@/components/select-payment'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function NewPatient() {
  const [payment, setPayment] = useState('Particular')
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<NewPatientForm>()

  const { mutateAsync: addPatient } = useMutation({
    mutationFn: createPatient,
  })

  async function handleNewPatient(data: NewPatientForm) {
    try {
      data.payment = payment
      newPatientForm.parse(data)
      const response = await addPatient(data)
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
      <Helmet title="Paciente" />
      <div className="flex items-center justify-center">
        <div className="flex w-[360px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tighter">
              Cadastro de Novo Paciente
            </h1>
            <p className="text-sm text-muted-foreground">
              Preencha todos os campos para cadastrar um novo paciente.
            </p>
          </div>

          <form onSubmit={handleSubmit(handleNewPatient)} className="space-y-4">
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
              <SelectPayment setPayment={setPayment} />
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
