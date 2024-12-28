import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

export function PatientDetails() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Hakuna Matata</DialogTitle>
        <DialogDescription>hakuna@matata.com</DialogDescription>
      </DialogHeader>
      <div className="space-y-6">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">
                Data de nascimento
              </TableCell>
              <TableCell className="flex justify-end">
                29 de novembro de 2016
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">CPF</TableCell>
              <TableCell className="flex justify-end">345.234.123-23</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Celular</TableCell>
              <TableCell className="flex justify-end">(55) 5555-5555</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Endereço</TableCell>
              <TableCell className="flex justify-end">
                Rua do Bobos número 0
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Pagamento</TableCell>
              <TableCell className="flex justify-end">FUSEX</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">
                Responsável
              </TableCell>
              <TableCell className="flex justify-end">O Próprio</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">
                Parentesco
              </TableCell>
              <TableCell className="flex justify-end">O Próprio</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">
                CPF do Responsável
              </TableCell>
              <TableCell className="flex justify-end">345.234.123-23</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </DialogContent>
  )
}
