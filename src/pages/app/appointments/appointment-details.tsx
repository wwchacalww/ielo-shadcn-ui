import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

export function AppointmentDetails() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Hakuna Matata</DialogTitle>
        <DialogDescription>
          Sábado, 8 de dezembro de 2024, das 08:00 às 08:50
        </DialogDescription>
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

            <TableRow>
              <TableCell
                colSpan={2}
                className="font-semibold text-muted-foreground"
                align="center"
              >
                Agendamento
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">
                Profissional
              </TableCell>
              <TableCell className="flex justify-end">Sigmund Freud</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">
                Especialidade
              </TableCell>
              <TableCell className="flex justify-end">Terapeuta</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Horário</TableCell>
              <TableCell className="flex justify-end">
                Das 08:00 às 08:50
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Local</TableCell>
              <TableCell className="flex justify-end">Sala 01</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Status</TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-orange-500" />
                  <span className="font-medium text-muted-foreground">
                    Aguardando evolução
                  </span>
                </div>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Pagamento</TableCell>
              <TableCell className="flex justify-end">FUSEX</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </DialogContent>
  )
}
