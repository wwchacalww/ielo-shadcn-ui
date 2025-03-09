import { useQuery } from '@tanstack/react-query'
import { intlFormat } from 'date-fns'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router'
import { z } from 'zod'

import { getAppointments } from '@/api/appointments/get-appointments'

import {
  AppointmentTableColumn,
  columns,
} from './components/data-table-filter/columns'
import { DataTable } from './components/data-table-filter/data-table'

export function AppointmentsAtendentFiltered() {
  const [searchParams] = useSearchParams()

  const page = z.coerce
    .number()
    .transform((page) => page ?? 1)
    .parse(searchParams.get('page') ?? 1)
  const range = z
    .enum(['dd', 'wk', 'mm'])
    .parse(searchParams.get('range') ?? 'mm')
  const value = z.coerce
    .number()
    .parse(searchParams.get('value') ?? new Date().getMonth() + 1)

  const { data: result } = useQuery({
    queryKey: ['appointments', page, range, value],
    queryFn: handleSearch,
  })

  async function handleSearch() {
    const result = await getAppointments({ page, range, value })

    const dataTable: AppointmentTableColumn[] = result.appointments.map(
      (appointment) => {
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
        const appointmentTime = `${start} às ${end}`
        return {
          id: appointment.id,
          professionalName: appointment.professional.name,
          appointmentTime,
          appointmentDate: appointment.start,
          patientName: appointment.patient.name,
          local: appointment.local,
          status: appointment.status,
          professionalId: '',
          role: 'atendente',
          appoinmentProfessionalId: appointment.professionalId,
          progressId: appointment.progressId || null,
        }
      },
    )

    return dataTable
  }

  return (
    <>
      <Helmet title="Agenda" />
      <div className="flex flex-col gap-4">
        <h1 className="text-lg font-semibold">Agenda</h1>
        <div>{result && <DataTable columns={columns} data={result} />}</div>
      </div>
    </>
  )
}
