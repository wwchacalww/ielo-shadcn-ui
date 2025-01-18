import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import {
  changeStatusAppointment,
  ChangeStatusAppointmentBody,
} from '@/api/change-status-appointment'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { queryClient } from '@/lib/react-query'

export function ChangeStatusAppoiment({
  id,
  status,
}: ChangeStatusAppointmentBody) {
  const { mutateAsync: changeStatus } = useMutation({
    mutationFn: changeStatusAppointment,
    onSuccess: () => {
      toast.success('Status alterado!')
      return queryClient.invalidateQueries({
        queryKey: ['appointments'],
      })
    },
    onError: () => {
      toast.error('Não foi possível alterar o status!')
    },
  })
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex select-none items-center gap-2"
        >
          {['agendado', 'reagendado'].includes(status) && (
            <span className="h-2 w-2 rounded-full bg-orange-500" />
          )}
          {status === 'em consulta' && (
            <span className="h-2 w-2 rounded-full bg-green-500" />
          )}
          {['aguardando evolução', 'aguardando responsável técnico'].includes(
            status,
          ) && <span className="h-2 w-2 rounded-full bg-yellow-500" />}
          {status}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => changeStatus({ id, status: 'em consulta' })}
        >
          <span className="h-2 w-2 rounded-full bg-green-500" />
          <span>Em atendimento</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => changeStatus({ id, status: 'aguardando evolução' })}
        >
          <span className="h-2 w-2 rounded-full bg-lime-400" />
          <span>Atendido</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => changeStatus({ id, status: 'faltou' })}
        >
          <span className="h-2 w-2 rounded-full bg-red-500" />
          <span>Faltou</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
