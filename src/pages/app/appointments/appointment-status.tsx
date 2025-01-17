type AppointmentStatus =
  | 'agendado'
  | 'reagendado'
  | 'em consulta'
  | 'cancelado'
  | 'faltou'
  | 'aguardando evolução'
  | 'aguardando responsável técnico'
  | 'finalizado'

interface AppointmentStatusProps {
  status: AppointmentStatus
}

export function AppointmentStatus({ status }: AppointmentStatusProps) {
  return (
    <div className="flex items-center gap-2">
      {['agendado', 'reagendado'].includes(status) && (
        <span className="h-2 w-2 rounded-full bg-orange-500" />
      )}

      {status === 'em consulta' && (
        <span className="h-2 w-2 rounded-full bg-green-500" />
      )}

      {['cancelado', 'faltou'].includes(status) && (
        <span className="h-2 w-2 rounded-full bg-red-500" />
      )}

      {['aguardando evolução', 'aguardando responsável técnico'].includes(
        status,
      ) && <span className="h-2 w-2 rounded-full bg-yellow-500" />}

      {status === 'finalizado' && (
        <span className="h-2 w-2 rounded-full bg-lime-400" />
      )}
      <span className="font-medium text-muted-foreground">{status}</span>
    </div>
  )
}
