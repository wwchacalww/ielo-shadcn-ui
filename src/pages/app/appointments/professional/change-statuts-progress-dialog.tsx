import { useMutation } from '@tanstack/react-query'
import { FileInput } from 'lucide-react'
import { toast } from 'sonner'

import { changeStatusProgress } from '@/api/progress/change-status-progress'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { queryClient } from '@/lib/react-query'

interface ChangeStatusProps {
  id: string
}

export function ChangeStatusProgressDialog({ id }: ChangeStatusProps) {
  const { mutateAsync: changeStatusFn } = useMutation({
    mutationFn: changeStatusProgress,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['appointments'],
      })
    },
  })
  async function handleChangeStatusProgress() {
    try {
      const response = await changeStatusFn({
        id,
        status: 'aguardando responsável técnico',
      })
      if (response.status === 201) {
        toast.success('Evolução eviada!')
      }
    } catch (err) {
      console.error(err)
      toast.error('Não foi possível enviar a evolução.')
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="success" size="xs">
          <FileInput className="mr-2 h-3 w-3" />
          Enviar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enviar evolução</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja enviar esta evolução para o responsável
            técnico?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              onClick={handleChangeStatusProgress}
              variant="destructive"
            >
              Sim
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Não
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
