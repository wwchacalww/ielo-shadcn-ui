import { intlFormat } from 'date-fns'

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

import { PatientTableRowProps } from './patient-table-row'

export function PatientDetails({ patient }: PatientTableRowProps) {
  const dataNascimento = intlFormat(
    patient.birthDate,
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      // weekday: 'long',
    },
    { locale: 'pt-BR' },
  )
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{patient.name}</DialogTitle>
        <DialogDescription>{patient.email}</DialogDescription>
      </DialogHeader>
      <div className="space-y-6">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">
                Data de nascimento
              </TableCell>
              <TableCell className="flex justify-end">
                {dataNascimento}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">CPF</TableCell>
              <TableCell className="flex justify-end">{patient.cpf}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Celular</TableCell>
              <TableCell className="flex justify-end">{patient.fone}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Endereço</TableCell>
              <TableCell className="flex justify-end">
                {patient.address}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Pagamento</TableCell>
              <TableCell className="flex justify-end">
                {patient.payment}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">
                Responsável
              </TableCell>
              <TableCell className="flex justify-end">
                {patient.responsible}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">
                Parentesco
              </TableCell>
              <TableCell className="flex justify-end">
                {patient.parent}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">
                CPF do Responsável
              </TableCell>
              <TableCell className="flex justify-end">
                {patient.cpfResponsible}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </DialogContent>
  )
}
