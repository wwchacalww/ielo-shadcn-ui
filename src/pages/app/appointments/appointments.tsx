import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router'
import { z } from 'zod'

import { getAppointments } from '@/api/get-appointments'
import { Pagination } from '@/components/pagination'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { AppointmentTableRow } from './appointment-table-row'
import { AppointmentsTableFilters } from './appointments-table-filters'

export function Appointments() {
  const [searchParams, setSearchParams] = useSearchParams()
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
    queryFn: () => getAppointments({ page, range, value }),
  })

  function handleChangeRangeAndDay(
    page: number,
    range: 'dd' | 'wk' | 'mm',
    value: number,
  ) {
    setSearchParams((prev) => {
      prev.set('page', page.toString())
      prev.set('range', range)
      prev.set('value', value.toString())
      return prev
    })
  }

  function handlePaginate(page: number) {
    setSearchParams((prev) => {
      prev.set('page', page.toString())
      return prev
    })
  }
  return (
    <>
      <Helmet title="Agenda" />
      <div className="flex flex-col gap-4">
        <div className="space-y-2.5">
          <AppointmentsTableFilters
            onChangeRangeAndDay={handleChangeRangeAndDay}
          />
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead>Profissional</TableHead>
                  <TableHead className="w-[200px]">Dia</TableHead>
                  <TableHead className="w-[120px]">Horário</TableHead>
                  <TableHead>Paciente</TableHead>
                  <TableHead className="w-[120px]">Local</TableHead>
                  <TableHead className="w-[180px]">Status</TableHead>
                  <TableHead className="w-[120px]"></TableHead>
                  <TableHead className="w-[120px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result &&
                  result.appointments.map((appointment) => {
                    return (
                      <AppointmentTableRow
                        key={appointment.id}
                        appointment={appointment}
                      />
                    )
                  })}
              </TableBody>
            </Table>
          </div>
          {result && (
            <Pagination
              pageIndex={result.meta.page}
              totalCount={result.meta.totalCount}
              perPage={result.meta.perPage}
              onPageChange={handlePaginate}
              itemName="agendamentos"
            />
          )}
        </div>
      </div>
    </>
  )
}
