import { intlFormat } from 'date-fns'

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

import { ProfessionalTableRowProps } from './professional-table-row'

export function ProfessionalDetails({
  professional,
}: ProfessionalTableRowProps) {
  const birthDate = intlFormat(
    professional.birthDate,
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
        <DialogTitle>{professional.name}</DialogTitle>
        <DialogDescription>{professional.specialty}</DialogDescription>
      </DialogHeader>
      <div className="space-y-6">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">
                Data de nascimento
              </TableCell>
              <TableCell className="flex justify-end">{birthDate}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">E-mail</TableCell>
              <TableCell className="flex justify-end">
                {professional.email}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">CPF</TableCell>
              <TableCell className="flex justify-end">
                {professional.cpf}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Celular</TableCell>
              <TableCell className="flex justify-end">
                {professional.fone}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Endereço</TableCell>
              <TableCell className="flex justify-end">
                {professional.address}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Registro</TableCell>
              <TableCell className="flex justify-end">
                {professional.register}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </DialogContent>
  )
}
