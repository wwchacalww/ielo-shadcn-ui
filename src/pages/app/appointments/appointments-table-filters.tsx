import { ptBR } from 'date-fns/locale'
import { Search, X } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { NewAppointmentsDialog } from './new-appointments-dialog'

export function AppointmentsTableFilters() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <form className="flex flex-col items-center gap-2">
      <div className="flex w-full justify-between">
        <div className="flex w-full flex-col justify-between p-8">
          <h1 className="text-3xl font-bold tracking-tight">Agenda</h1>

          <div className="flex w-full items-center gap-2">
            <span className="text-sm font-semibold">Filtros</span>
            <Input placeholder="Nome do Paciente" className="h-8 w-[320px]" />
            <Select defaultValue="all">
              <SelectTrigger className="h-8 w-[240px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent id="professionalId">
                <SelectItem value="all">Todos os Profissionais</SelectItem>
                <SelectItem value="psicóloga">Sigmund Freud</SelectItem>
                <SelectItem value="fonaulióloga">Jean Jaque Derrida</SelectItem>
                <SelectItem value="psicopedagóga">Deleuse</SelectItem>
                <SelectItem value="nutricionista">Domic La Capra</SelectItem>
              </SelectContent>
            </Select>

            <Button type="submit" variant="secondary" size="xs">
              <Search className="mr-2 h-4 w-4" />
              Filtrar resultados
            </Button>
            <Button type="button" variant="outline" size="xs">
              <X className="mr-2 h-4 w-4" />
              Remover filtros
            </Button>

            <NewAppointmentsDialog />
          </div>
        </div>

        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md"
          locale={ptBR}
        />
      </div>
    </form>
  )
}
