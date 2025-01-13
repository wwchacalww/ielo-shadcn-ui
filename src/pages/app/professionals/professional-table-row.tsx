import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { ProfessionalDetails } from './profissional-details'

export interface ProfessionalTableRowProps {
  professional: {
    name: string
    birthDate: string
    email: string
    cpf: string
    fone: string
    address: string
    status: boolean
    id: string
    createdAt: string
    updatedAt: string | null
    register: string
    specialty: string
    description: string
    userId: string
  }
}

export function ProfessionalTableRow({
  professional,
}: ProfessionalTableRowProps) {
  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do profissional</span>
            </Button>
          </DialogTrigger>
          <ProfessionalDetails professional={professional} />
        </Dialog>
      </TableCell>
      <TableCell className="font-medium">{professional.name}</TableCell>
      <TableCell>{professional.email}</TableCell>
      <TableCell>{professional.fone}</TableCell>
      <TableCell>{professional.specialty}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          {professional.status ? (
            <>
              <span className="h-2 w-2 rounded-full bg-green-500" />
              <span className="font-medium text-muted-foreground">Ativo</span>
            </>
          ) : (
            <>
              <span className="h-2 w-2 rounded-full bg-rose-500" />
              <span className="font-medium text-muted-foreground">Inativo</span>
            </>
          )}
        </div>
      </TableCell>
    </TableRow>
  )
}
