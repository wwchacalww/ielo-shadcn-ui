import { Helmet } from 'react-helmet-async'

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { Pagination } from './pagination'
import { ProfessionalTableRow } from './professional-table-row'
import { ProfessionalsTableFilters } from './professionals-table-filters'

export function Professionals() {
  return (
    <>
      <Helmet title="Profissionais" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Profissionais</h1>
        <div className="space-y-2.5">
          <ProfessionalsTableFilters />

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead className="w-[200px]">E-mail</TableHead>
                  <TableHead className="w-[200px]">Celular</TableHead>
                  <TableHead className="w-[200px]">Especialidade</TableHead>
                  <TableHead className="w-[120px]">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 10 }).map((_, i) => {
                  return <ProfessionalTableRow key={i} />
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
