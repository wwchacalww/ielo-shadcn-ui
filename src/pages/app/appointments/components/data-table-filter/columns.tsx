'use client'

import { ColumnDef } from '@tanstack/react-table'
import { intlFormat } from 'date-fns'
import { ArrowUpDown, FilePenLine } from 'lucide-react'
import { Link } from 'react-router'

import { Button } from '@/components/ui/button'

import { AppointmentStatus } from '../../appointment-status'
import { CancelAppointmentDialog } from '../../apppoinment-cancel-dialog'
import { EvaluateProgressDialog } from '../evaluate-progress-dialog'
import { PrintProgress } from '../PrintProgress'
import { ChangeStatusAppoiment } from '../../professional/change-status-appointment'
import { ChangeStatusProgressDialog } from '../../professional/change-statuts-progress-dialog'
import { ReSchedule } from '../../re-schecule-dialog'

type AppointmentStatus =
  | 'agendado'
  | 'reagendado'
  | 'em consulta'
  | 'cancelado'
  | 'faltou'
  | 'aguardando evolução'
  | 'aguardando responsável técnico'
  | 'finalizado'

export type AppointmentTableColumn = {
  id: number
  professionalName: string
  appointmentTime: string
  appointmentDate: string
  patientName: string
  local: string
  status: AppointmentStatus
  professionalId: string
  appoinmentProfessionalId: string
  role: 'atendente' | 'profissional' | 'supervisora'
  progressId?: string | null
}

export const columns: ColumnDef<AppointmentTableColumn>[] = [
  {
    accessorKey: 'professionalName',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Profissional
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'appointmentDate',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Dia
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const { appointmentDate } = row.original
      const appointmentDateFormatted = intlFormat(
        new Date(appointmentDate),
        {
          month: 'long',
          day: 'numeric',
          weekday: 'long',
        },
        { locale: 'pt-BR' },
      )
      return <span>{appointmentDateFormatted}</span>
    },
  },
  {
    accessorKey: 'appointmentTime',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Horário
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'patientName',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Paciente
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'local',
    header: 'Local',
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const status = row.getValue('status') as AppointmentStatus

      return (
        <div className="justify-right flex items-center">
          {[
            'aguardando responsável técnico',
            'aguardando evolução',
            'finalizado',
          ].includes(status) ? (
            <AppointmentStatus status={status} />
          ) : (
            <ChangeStatusAppoiment status={status} id={row.original.id} />
          )}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'actions',
    header: 'Opções',
    cell: ({ row }) => {
      const { id, progressId, professionalId, appoinmentProfessionalId } =
        row.original
      const progressLink = progressId
        ? `/profissional/progress/edit/${id}?id=${progressId}`
        : `/profissional/progress/${id}`
      const progressCheck = professionalId === appoinmentProfessionalId
      const printProgressCheck = [
        'aguardando responsável técnico',
        'finalizado',
      ].includes(row.original.status)
      const rescheculeCheck = ['agendado', 'reagendado'].includes(
        row.original.status,
      )
      if (rescheculeCheck) {
        return (
          <ReSchedule
            id={row.original.id}
            appointmentDate={row.original.appointmentDate}
            patientName={row.original.patientName}
          />
        )
      }

      if (progressCheck && row.original.status === 'aguardando evolução') {
        return (
          <Button variant="destructive" size="xs" asChild>
            <Link to={progressLink}>
              <FilePenLine className="mr-2 h-3 w-3" />
              Evolução
            </Link>
          </Button>
        )
      }

      if (
        progressId &&
        row.original.role === 'supervisora' &&
        printProgressCheck
      ) {
        return <PrintProgress id={progressId} />
      }
    },
  },
  {
    accessorKey: 'dialogs',
    header: '',
    cell: ({ row }) => {
      const {
        id,
        status,
        progressId,
        role,
        professionalId,
        appoinmentProfessionalId,
      } = row.original
      if (['agendado', 'reagendado'].includes(status)) {
        return <CancelAppointmentDialog id={id} />
      }

      if (
        progressId &&
        status === 'aguardando evolução' &&
        professionalId === appoinmentProfessionalId
      ) {
        return <ChangeStatusProgressDialog id={progressId} />
      }

      if (
        role === 'supervisora' &&
        progressId &&
        status === 'aguardando responsável técnico'
      ) {
        return <EvaluateProgressDialog id={progressId} />
      }
    },
  },
]
