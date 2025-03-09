'use client'

import { Table } from '@tanstack/react-table'
import { getDayOfYear } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { X } from 'lucide-react'
import { useState } from 'react'
import { useSearchParams } from 'react-router'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'

import { NewAppointmentsWithProfessionalDialog } from '../../new-appointments-with-professional-dialog'
import { NewAppointmentsDialog } from '../../professional/new-appointments-dialog'
import { FilterByMonth } from '../FilterByMonth'
import { statuses } from './data/data'
import { DataTableFacetedFilter } from './data-table-faceted-filter'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  role?: string
}

export function DataTableToolbar<TData>({
  table,
  role,
}: DataTableToolbarProps<TData>) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [, setSearchParams] = useSearchParams()

  function onChangeRangeAndDay(
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

  function handleDateChange(dt: Date) {
    setDate(dt)
    onChangeRangeAndDay(1, 'dd', getDayOfYear(dt))
  }

  function handleClearFilters(mm?: number) {
    if (!mm) {
      mm = new Date().getMonth() + 1
    }
    onChangeRangeAndDay(1, 'mm', mm)
  }

  const isFiltered = table.getState().columnFilters.length > 0
  return (
    <div className="flex items-end justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <span className="text-sm font-semibold">Filtros</span>
        <Input
          placeholder="Nome do paciente..."
          value={
            (table.getColumn('patientName')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('patientName')?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn('status') && (
          <DataTableFacetedFilter
            column={table.getColumn('status')}
            title="Status"
            options={statuses}
          />
        )}
        <FilterByMonth />
        {isFiltered ? (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Remover filtros
            <X />
          </Button>
        ) : (
          <Button
            variant="ghost"
            onClick={() => handleClearFilters()}
            className="h-8 px-2 lg:px-3"
          >
            <X className="mr-2 h-4 w-4" />
            Remover filtros
          </Button>
        )}

        {role && role === 'profissional' ? (
          <NewAppointmentsDialog />
        ) : (
          <NewAppointmentsWithProfessionalDialog />
        )}
      </div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={(dt) => handleDateChange(dt ?? new Date())}
        className="rounded-md"
        locale={ptBR}
      />
    </div>
  )
}
