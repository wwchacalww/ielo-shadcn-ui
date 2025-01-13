import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router'
import { z } from 'zod'

import { getPatients } from '@/api/get-patients'
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
  const [searchParams, setSearchParams] = useSearchParams()
  const page = z.coerce
    .number()
    .transform((page) => page ?? 1)
    .parse(searchParams.get('page') ?? 1)
  const { data: result } = useQuery({
    queryKey: ['patients-list', page],
    queryFn: () => getPatients({ page }),
  })

  function handlePaginate(page: number) {
    setSearchParams((prev) => {
      prev.set('page', page.toString())
      return prev
    })
  }
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
                {result &&
                  result.patients.map((patient) => {
                    return (
                      <PatientTableRow key={patient.id} patient={patient} />
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
            />
          )}
        </div>
      </div>
    </>
  )
}
