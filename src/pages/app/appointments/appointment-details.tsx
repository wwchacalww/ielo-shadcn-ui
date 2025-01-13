import { intlFormat } from 'date-fns'

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

export interface AppointmentDetailsProps {
  patient: {
    id: string
    name: string
    email: string | null
    birthDate: string
    cpf: string | null
    status: string
    fone: string
    address: string
    payment: string
    responsible: string
    parent: string
    cpfResponsible: string | null
    createdAt: Date
    updatedAt: Date | null
  }
  appointment: {
    id: number
    specialty: string
    start: string
    end: string
    local: string
    status: string
    payment: string
    value: string
    professionalId: string
    patientId: string
    createdAt: string
    updatedAt: string
    professional: {
      name: string
    }
    patient: {
      name: string
    }
  }
}
export function AppointmentDetails({
  appointment,
  patient,
}: AppointmentDetailsProps) {
  const birthDate = intlFormat(
    patient.birthDate,
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      // weekday: 'long',
    },
    { locale: 'pt-BR' },
  )
  const appointmentDate = intlFormat(
    appointment.start,
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    },
    { locale: 'pt-BR' },
  )
  const start = intlFormat(
    appointment.start,
    {
      hour: 'numeric',
      minute: 'numeric',
    },
    { locale: 'pt-BR' },
  )
  const end = intlFormat(
    appointment.end,
    {
      hour: 'numeric',
      minute: 'numeric',
    },
    { locale: 'pt-BR' },
  )
  return (
    // h-['calc(100vh-12rem)'] overflow-y-auto
    <DialogContent className="h-[calc(100vh-8rem)] overflow-y-auto [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 [&::-webkit-scrollbar]:w-2">
      <DialogHeader>
        <DialogTitle>{patient.name}</DialogTitle>
        <DialogDescription>
          {appointmentDate}, das {start} às {end}
        </DialogDescription>
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
                {appointment.payment}
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
              <TableCell className="flex justify-end">
                {appointment.professional.name}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">
                Especialidade
              </TableCell>
              <TableCell className="flex justify-end">
                {appointment.specialty}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Horário</TableCell>
              <TableCell className="flex justify-end">
                Das {start} às {end}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Local</TableCell>
              <TableCell className="flex justify-end">
                {appointment.local}
              </TableCell>
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
              <TableCell className="flex justify-end">
                {appointment.payment}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </DialogContent>
  )
}
