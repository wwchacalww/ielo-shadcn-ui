import { useQuery } from '@tanstack/react-query'
import { intlFormat } from 'date-fns'
import { Search } from 'lucide-react'

import { getPatient } from '@/api/get-patient'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { AppointmentDetails } from './appointment-details'
import { AppointmentStatus } from './appointment-status'
import { CancelAppointmentDialog } from './apppoinment-cancel-dialog'
import { ChangeStatusAppoiment } from './professional/change-status-appointment'
import { ReSchedule } from './re-schecule-dialog'

type AppointmentStatus =
  | 'agendado'
  | 'reagendado'
  | 'em consulta'
  | 'cancelado'
  | 'faltou'
  | 'aguardando evolução'
  | 'aguardando responsável técnico'
  | 'finalizado'
export interface AppointmentTableRowProps {
  appointment: {
    id: number
    specialty: string
    start: string
    end: string
    local: string
    status: AppointmentStatus
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

  const { status, id } = appointment

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
        {[
          'cancelado',
          'faltou',
          'aguardando responsável técnico',
          'aguardando evolução',
          'finalizado',
        ].includes(status) ? (
          <AppointmentStatus status={status} />
        ) : (
          <ChangeStatusAppoiment status={status} id={id} />
        )}
      </TableCell>
      <TableCell>
        {['agendado', 'reagendado'].includes(status) && (
          <ReSchedule
            id={id}
            appointmentDate={appointment.start}
            patientName={appointment.patient.name}
          />
        )}
      </TableCell>
      <TableCell>
        {['agendado', 'reagendado'].includes(status) && (
          <CancelAppointmentDialog id={appointment.id} />
        )}
      </TableCell>
    </TableRow>
  )
}
