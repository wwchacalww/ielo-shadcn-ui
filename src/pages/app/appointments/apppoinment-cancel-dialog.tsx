import { useMutation } from '@tanstack/react-query'
import { X } from 'lucide-react'
import { toast } from 'sonner'

import { cancelAppointment } from '@/api/cancel-appointment'
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

export function CancelAppointmentDialog({ id }: { id: number }) {
  const { mutateAsync: cancelAppointmentFn } = useMutation({
    mutationFn: cancelAppointment,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['appointments'],
      })
    },
  })
  async function updateAppointmentsListCache() {
    try {
      const response = await cancelAppointmentFn({ id })
      if (response.status === 201) {
        toast.success('Atendimento cancelado')
      }
    } catch (err) {
      console.error(err)
      toast.error('Não foi possível cancelar o atendimento.')
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="xs">
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancelar Atendimento</DialogTitle>
          <DialogDescription>
            Tem certeza que irá cancelar o atendimento?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              onClick={updateAppointmentsListCache}
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
