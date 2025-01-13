import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { PatientDetails } from './patient-details'

export interface PatientTableRowProps {
  patient: {
    email: string | null
    cpf: string | null
    status: string
    id: string
    name: string
    birthDate: string
    fone: string
    address: string
    payment: string
    responsible: string
    parent: string
    cpfResponsible: string | null
    createdAt: Date
    updatedAt: Date | null
  }
}

export function PatientTableRow({ patient }: PatientTableRowProps) {
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
          <PatientDetails patient={patient} />
        </Dialog>
      </TableCell>
      <TableCell className="font-medium">{patient.name}</TableCell>
      <TableCell>{patient.email}</TableCell>
      <TableCell>{patient.fone}</TableCell>
      <TableCell>{patient.responsible}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          <span className="font-medium text-muted-foreground">Ativo</span>
        </div>
      </TableCell>
    </TableRow>
  )
}
