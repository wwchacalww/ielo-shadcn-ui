import { Helmet } from 'react-helmet-async'

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { AppointmentTableRow } from './appointment-table-row'
import { AppointmentsTableFilters } from './appointments-table-filters'
import { Pagination } from './pagination'

export function Appointments() {
  return (
    <>
      <Helmet title="Agenda" />
      <div className="flex flex-col gap-4">
        <div className="space-y-2.5">
          <AppointmentsTableFilters />
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
                {Array.from({ length: 10 }).map((_, i) => {
                  return <AppointmentTableRow key={i} />
                })}
              </TableBody>
            </Table>
          </div>
          <Pagination pageIndex={0} totalCount={15} perPage={10} />
        </div>
      </div>
    </>
  )
}
