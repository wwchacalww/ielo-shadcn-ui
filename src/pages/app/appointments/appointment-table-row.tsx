import { useQuery } from '@tanstack/react-query'
import { intlFormat } from 'date-fns'
import { CalendarSearch, Search, X } from 'lucide-react'

import { getPatient } from '@/api/get-patient'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { AppointmentDetails } from './appointment-details'

export interface AppointmentTableRowProps {
  appointment: {
    id: number
    specialty: string
    start: string
    end: string
    local: string
    status: string
    payment: string
    value: string
    professionalId: string
    patientId: string
    createdAt: string
    updatedAt: string
    professional: {
      name: string
    }
    patient: {
      name: string
    }
  }
}

export function AppointmentTableRow({ appointment }: AppointmentTableRowProps) {
  const appointmentDate = intlFormat(
    appointment.start,
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    },
    { locale: 'pt-BR' },
  )
  const start = intlFormat(
    appointment.start,
    {
      hour: 'numeric',
      minute: 'numeric',
    },
    { locale: 'pt-BR' },
  )
  const end = intlFormat(
    appointment.end,
    {
      hour: 'numeric',
      minute: 'numeric',
    },
    { locale: 'pt-BR' },
  )
  const { data: patient } = useQuery({
    queryKey: ['patient', appointment.patientId],
    queryFn: () => getPatient({ patientId: appointment.patientId }),
  })

  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do agendamento</span>
            </Button>
          </DialogTrigger>
          {patient && (
            <AppointmentDetails
              appointment={appointment}
              patient={patient.patient}
            />
          )}
        </Dialog>
      </TableCell>
      <TableCell className="font-medium">
        {appointment.professional.name}
      </TableCell>
      <TableCell>{appointmentDate}</TableCell>
      <TableCell>
        {start} às {end}
      </TableCell>
      <TableCell>{appointment.patient.name}</TableCell>
      <TableCell>{appointment.local}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-orange-500" />
          <span className="font-medium text-muted-foreground">
            {appointment.status}
          </span>
        </div>
      </TableCell>
      <TableCell>
        <Button variant="outline" size="xs">
          <CalendarSearch className="mr-2 h-3 w-3" />
          Reagendar
        </Button>
      </TableCell>
      <TableCell>
        <Button variant="ghost" size="xs">
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
