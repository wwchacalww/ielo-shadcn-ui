import { useQuery } from '@tanstack/react-query'
import { Speech } from 'lucide-react'

import { getMonthlyAppointmentsCount } from '@/api/appointments/get-monthly-appointments-count'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function MonthAppointmentCard() {
  const { data: monthlyAppointmentsCount, isLoading } = useQuery({
    queryKey: ['monthly-appointments-count'],
    queryFn: () => getMonthlyAppointmentsCount({ query: 'all' }),
  })
  return (
    <>
      {!isLoading && monthlyAppointmentsCount ? (
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-semibold">
              Total de atendimentos (mês)
            </CardTitle>
            <Speech className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-1">
            <span className="text-2xl font-bold tracking-tight">
              {monthlyAppointmentsCount.total}
            </span>
            <p className="text-xs text-muted-foreground">
              <span
                className={`text-${monthlyAppointmentsCount.percentage[0] === '-' ? 'rose' : 'emerald'}-500 dark:text-${monthlyAppointmentsCount.percentage[0] === '-' ? 'rose' : 'emerald'}-400`}
              >
                {monthlyAppointmentsCount.percentage}
              </span>{' '}
              em relação ao mês passado
            </p>
          </CardContent>
        </Card>
      ) : (
        <Skeleton className="h-28 w-full" />
      )}
    </>
  )
}
