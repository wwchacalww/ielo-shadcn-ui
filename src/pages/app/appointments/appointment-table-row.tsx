import { CalendarSearch, Search, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { AppointmentDetails } from './appointment-details'

export function AppointmentTableRow() {
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
          <AppointmentDetails />
        </Dialog>
      </TableCell>
      <TableCell className="font-medium">Sigmund Freud</TableCell>
      <TableCell>Sábado, 28 de dezembro</TableCell>
      <TableCell>08:00 às 08:50</TableCell>
      <TableCell>Hakuna Matata</TableCell>
      <TableCell>Sala 01</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-orange-500" />
          <span className="font-medium text-muted-foreground">
            Aguardando evolução
          </span>
        </div>
      </TableCell>
      <TableCell>
        <Button variant="outline" size="xs">
          <CalendarSearch className="mr-2 h-3 w-3" />
          Reagendar
        </Button>
      </TableCell>
      <TableCell>
        <Button variant="ghost" size="xs">
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}
