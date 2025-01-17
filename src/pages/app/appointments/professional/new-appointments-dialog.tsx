import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { set } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { jwtDecode } from 'jwt-decode'
import { CalendarPlus, Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'

import { getProfile } from '@/api/get-profile'
import { newAppointment } from '@/api/new-appointment'
import { selectPatients } from '@/api/select-patients'
import { PayLoad } from '@/api/sign-in'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { queryClient } from '@/lib/react-query'
import { cn } from '@/lib/utils'

import { NewAppointmentForm } from '../appointment-form'

export function NewAppointmentsDialog() {
  const navigate = useNavigate()
  const token = localStorage.getItem('@ielo:token')
  if (!token) {
    navigate('/sign-in')
  }
  const { sub } = jwtDecode<PayLoad>(token ?? '')

  const [appointmentDates, setAppointmentDates] = useState<Date[] | undefined>()
  const [openDialog, setOpenDialog] = useState(false)
  const [openPatients, setOpenPatients] = useState(false)

  const [patient, setPatient] = useState<{
    value: string
    label: string
  } | null>()

  const [local, setLocal] = useState('online')
  const [payment, setPayment] = useState('particular')

  const { data: professional, error: professionalError } = useQuery({
    queryKey: ['profile', sub],
    queryFn: getProfile,
  })
  if (professionalError && professionalError instanceof AxiosError) {
    if (professionalError.status === 401) {
      localStorage.removeItem('@ielo:token')
      navigate('/sign-in')
    }
  }

  const pro = professional?.Professional[0]
  const { data: patients, error: patientsError } = useQuery({
    queryKey: ['patients-select'],
    queryFn: selectPatients,
  })

  if (patientsError && patientsError instanceof AxiosError) {
    if (patientsError.status === 401) {
      localStorage.removeItem('@ielo:token')
      navigate('/sign-in')
    }
  }

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewAppointmentForm>()

  const { mutateAsync: addAppointment } = useMutation({
    mutationFn: newAppointment,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['appointments'],
      })
    },
  })

  async function handleNewAppointment(data: NewAppointmentForm) {
    data.professionalId = pro?.id || ''
    data.patientId = patient?.value || ''
    data.local = local
    data.payment = payment
    appointmentDates?.forEach(async (date) => {
      const st = data.startTime.split(':')
      const et = data.endTime.split(':')
      const sthh = parseInt(st[0])
      const stmm = parseInt(st[1])
      const ethh = parseInt(et[0])
      const etmm = parseInt(et[1])
      const startTime = set(date, { hours: sthh, minutes: stmm })
      const endTime = set(date, { hours: ethh, minutes: etmm })
      const result = await addAppointment({
        specialty: pro?.specialty || '',
        start: startTime.toISOString(),
        end: endTime.toISOString(),
        local: data.local,
        payment: data.payment,
        value: 0,
        professionalId: data.professionalId,
        patientId: data.patientId,
      })
      if (result.status === 201) {
        toast.success('Agendamento realizado com sucesso!')
        setOpenDialog(false)
        reset()
        setPatient(null)
        setAppointmentDates(undefined)
      } else {
        toast.error('Erro ao realizar o agendamento!')
      }
    })
  }
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button
          type="button"
          size="xs"
          className="ml-auto"
          onClick={() => setOpenDialog(true)}
        >
          <CalendarPlus className="mr-2 h-4 w-4" />
          Agendar
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[calc(100vh-8rem)] overflow-y-auto [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 [&::-webkit-scrollbar]:w-2">
        <DialogHeader>
          <DialogTitle>Agendamento</DialogTitle>
          <DialogDescription>
            Preencha os campos correta para efetuar o agendamento
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(handleNewAppointment)}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Dias para serem agendados</Label>
            <Calendar
              mode="multiple"
              selected={appointmentDates}
              onSelect={setAppointmentDates}
              className="rounded-md"
              locale={ptBR}
            />
          </div>
          <div className="space-y-2">
            {patients ? (
              <Popover open={openPatients} onOpenChange={setOpenPatients}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openPatients}
                    className="w-full justify-between"
                  >
                    {patient
                      ? patients.find((p) => p.label === patient.label)?.label
                      : 'Selecione o paciente'}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[450px] p-0">
                  <Command>
                    <CommandInput placeholder="Pesquise o nome do paciente..." />
                    <CommandList>
                      <CommandEmpty>Não encontramos o paciente</CommandEmpty>
                      <CommandGroup>
                        {patients.map((p) => (
                          <CommandItem
                            key={p.value}
                            value={p.label}
                            onSelect={(currentValue) => {
                              setPatient(currentValue === p.value ? null : p)
                              setPatient(p)
                              setOpenPatients(false)
                            }}
                          >
                            {p.label}
                            <Check
                              className={cn(
                                'ml-auto',
                                patient?.value === p.value
                                  ? 'opacity-100'
                                  : 'opacity-0',
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            ) : (
              <> </>
            )}

            <Input
              id="patientId"
              type="hidden"
              value={patient?.value || ''}
              {...register('patientId')}
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
          <div className="space-y-2">
            <Label htmlFor="local">Selecione o local do atendimento</Label>
            <Select defaultValue="all" onValueChange={setLocal}>
              <SelectTrigger className="h-8 w-[240px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="online">Atendimento On-line</SelectItem>
                <SelectItem value="sala01">Sala 01</SelectItem>
                <SelectItem value="sala02">Sala 02</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="payment">Meio de pagamento</Label>
            <Select defaultValue="all" onValueChange={setPayment}>
              <SelectTrigger className="h-8 w-[240px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="particular">Particular</SelectItem>
                <SelectItem value="inass">INASS-GDF Saúde</SelectItem>
                <SelectItem value="fusex">FUSEX</SelectItem>
                <SelectItem value="amil">Amil</SelectItem>
                <SelectItem value="cbm-df">CBM-DF</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Separator />
          <Button
            disabled={isSubmitting}
            type="submit"
            variant="default"
            className="w-full"
          >
            Agendar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
