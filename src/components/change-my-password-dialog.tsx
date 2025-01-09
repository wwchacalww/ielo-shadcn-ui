import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { changeMyPassword } from '@/api/change-my-password'

import { Button } from './ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'

const changeMyPasswordSchema = z.object({
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  newPassword: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
})

type ChangeMyPasswordSchema = z.infer<typeof changeMyPasswordSchema>

export function ChangeMyPasswordDialog() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ChangeMyPasswordSchema>({
    resolver: zodResolver(changeMyPasswordSchema),
  })

  const { mutateAsync: changeMyPasswordFn } = useMutation({
    mutationFn: changeMyPassword,
    onSuccess: () => {
      toast.success('Senha alterada com sucesso!')
    },
  })

  async function handleChangeMyPassword({
    password,
    newPassword,
  }: ChangeMyPasswordSchema) {
    try {
      await changeMyPasswordFn({ password, newPassword })
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data.message || 'Erro ao tentar trocar a senha.',
        )
      } else {
        toast.error('Error ao tentar trocar a senha.')
      }
    }
  }
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Trocar a senha</DialogTitle>
        <DialogDescription>
          A senha deve ter ao menos 6 caracteres
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(handleChangeMyPassword)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="password">
              Senha
            </Label>
            <Input
              className="col-span-3"
              type="password"
              {...register('password')}
              id="password"
            />
          </div>
        </div>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="newPassword">
              Nova senha
            </Label>
            <Input
              className="col-span-3"
              type="password"
              {...register('newPassword')}
              id="newPassword"
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" type="button">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" variant="success" disabled={isSubmitting}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
