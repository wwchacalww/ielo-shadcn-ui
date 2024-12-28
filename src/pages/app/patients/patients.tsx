import { Helmet } from 'react-helmet-async'

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { Pagination } from './pagination'
import { PatientTableRow } from './patient-table-row'
import { PatientsTableFilters } from './patients-table-filters'

export function Patients() {
  return (
    <>
      <Helmet title="Pacientes" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Pacientes</h1>
        <div className="space-y-2.5">
          <PatientsTableFilters />

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead className="w-[200px]">E-mail</TableHead>
                  <TableHead className="w-[200px]">Celular</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead className="w-[120px]">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 10 }).map((_, i) => {
                  return <PatientTableRow key={i} />
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
