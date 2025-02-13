import { useMutation } from '@tanstack/react-query'
import { Check } from 'lucide-react'
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

export function EvaluateProgressDialog({ id }: { id: string }) {
  const { mutateAsync: changeStatusProgressFn } = useMutation({
    mutationFn: changeStatusProgress,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['appointments'],
      })
    },
  })

  async function handleApproveProgress() {
    await changeStatusProgressFn({ id, status: 'finalizado' })
    toast.success('Evolução aprovada')
  }

  async function handleRejectProgress() {
    await changeStatusProgressFn({ id, status: 'rascunho' })
    toast.success('Evolução devolvida para o profissional')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="success" size="xs">
          <Check className="mr-2 h-3 w-3" />
          Aprovar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Aprovar o Registro de atendimento: Evolução</DialogTitle>
          <DialogDescription>
            Visualize antes o Registro de atendimento, Evolução, antes de
            avaliar.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              onClick={handleApproveProgress}
              variant="success"
            >
              Aprovar
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              onClick={handleRejectProgress}
              variant="destructive"
            >
              Devolver
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancelar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
