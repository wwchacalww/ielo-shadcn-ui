import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { z, ZodError } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const newPatientForm = z.object({
  name: z.string().min(10, { message: 'Nome muito curto' }),
  email: z.string().email('E-mail inválido'),
  birthDate: z.string().date('Data inválida'),
  cpf: z.string().min(10, { message: 'CPF inválido' }),
  address: z.string().min(10, { message: 'Endereço muito curto' }),
  fone: z.string().min(8, { message: 'Telefone inválido' }),
  responsible: z.string().optional(),
  parent: z.string().optional(),
  cpfResponsible: z.string().optional(),
  payment: z.string(),
})

// 	"payment":"Convênio-INAS"

type NewPatientForm = z.infer<typeof newPatientForm>

export function NewPatient() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<NewPatientForm>()

  async function handleNewPatient(data: NewPatientForm) {
    try {
      newPatientForm.parse(data)
      const token = localStorage.getItem('@ielo:token')
      const response = await fetch('http://localhost:3333/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })
      if (response.status === 201) {
        navigate('/dashboard')
      }
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error)
        error.errors.forEach((err) => {
          toast.error(err.message)
        })
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
              <Input id="payment" type="text" {...register('payment')} />
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
