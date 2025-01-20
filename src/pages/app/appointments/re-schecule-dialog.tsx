import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { intlFormat, set } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarSearch } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { reSchedule } from '@/api/re-schedule'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { queryClient } from '@/lib/react-query'

const reScheduleForm = z.object({
  startTime: z.string().regex(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Horário inválido',
  }),
  endTime: z.string().regex(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Horário inválido',
  }),
})
type ReScheduleForm = z.infer<typeof reScheduleForm>
interface ReScheduleProps {
  id: number
  patientName: string
  appointmentDate: string
}
export function ReSchedule({
  id,
  appointmentDate,
  patientName,
}: ReScheduleProps) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting },
  } = useForm<ReScheduleForm>({
    resolver: zodResolver(reScheduleForm),
  })
  const date = new Date(appointmentDate)
  const formatedDate = intlFormat(
    appointmentDate,
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    },
    { locale: 'pt-BR' },
  )
  const [appointment, setAppointment] = useState<Date | undefined>(date)

  const { mutateAsync: reScheduleFn } = useMutation({
    mutationFn: reSchedule,
    onSuccess: () => {
      toast.success('Atendimento reagendado')
      reset()
      return queryClient.invalidateQueries({
        queryKey: ['appointments'],
      })
    },
    onError: () => {
      toast.error('Não foi possível reagendar')
    },
  })
  async function handleReScheduleFn(data: ReScheduleForm) {
    const st = data.startTime.split(':')
    const et = data.endTime.split(':')
    const sthh = parseInt(st[0])
    const stmm = parseInt(st[1])
    const ethh = parseInt(et[0])
    const etmm = parseInt(et[1])
    if (appointment) {
      const startTime = set(appointment, {
        hours: sthh,
        minutes: stmm,
        seconds: 1,
      })
      const endTime = set(appointment, {
        hours: ethh,
        minutes: etmm,
      })
      if (endTime > startTime) {
        await reScheduleFn({
          id,
          start: startTime.toISOString(),
          end: endTime.toISOString(),
        })
      } else {
        toast.error(
          'O primeiro horário marcado deve ser antes do último horário selecionado.',
        )
      }
    } else {
      toast.error('Selecione uma data')
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="xs">
          <CalendarSearch className="mr-2 h-3 w-3" />
          Reagendar
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[calc(100vh-15rem)] overflow-y-auto [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 [&::-webkit-scrollbar]:w-2">
        <DialogHeader>
          <DialogTitle>Reagendar</DialogTitle>
          <DialogDescription>
            {patientName} - {formatedDate}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleReScheduleFn)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Dias para serem agendados</Label>
            <Calendar
              mode="single"
              selected={appointment}
              onSelect={setAppointment}
              disabled={{ before: new Date() }}
              className="rounded-md"
              locale={ptBR}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="appointmentTime">
              Selecione o horário de atendimento
            </Label>
            <div className="flex flex-row items-center gap-2 text-muted-foreground">
              Das{' '}
              <Input
                id="startTime"
                type="time"
                className="w-[96px]"
                {...register('startTime')}
              />{' '}
              às
              <Input
                id="endTime"
                {...register('endTime')}
                type="time"
                className="w-[96px]"
              />
            </div>
          </div>

          <Separator />
          <DialogClose asChild>
            <Button
              disabled={isSubmitting}
              type="submit"
              variant="default"
              className="w-full"
            >
              Agendar
            </Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  )
}
