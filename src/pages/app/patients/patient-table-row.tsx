import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { PatientDetails } from './patient-details'

export function PatientTableRow() {
  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do paciente</span>
            </Button>
          </DialogTrigger>
          <PatientDetails />
        </Dialog>
      </TableCell>
      <TableCell className="font-medium">Hakuna Matata</TableCell>
      <TableCell>hakuna@matata.psi</TableCell>
      <TableCell>(55) 5555-5555</TableCell>
      <TableCell>O Próprio</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          <span className="font-medium text-muted-foreground">Ativo</span>
        </div>
      </TableCell>
    </TableRow>
  )
}
