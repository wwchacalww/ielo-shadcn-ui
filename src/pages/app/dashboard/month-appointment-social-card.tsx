import { useQuery } from '@tanstack/react-query'
import { Speech } from 'lucide-react'

import { getMonthlyAppointmentsCount } from '@/api/appointments/get-monthly-appointments-count'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function MonthAppointmentSocialCard() {
  const { data: monthlyAppointmentsSocialCount, isLoading } = useQuery({
    queryKey: ['monthly-appointments-social-count'],
    queryFn: () => getMonthlyAppointmentsCount({ query: 'social' }),
  })
  return (
    <>
      {!isLoading && monthlyAppointmentsSocialCount ? (
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-semibold">
              Total de atendimentos social (mês)
            </CardTitle>
            <Speech className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-1">
            <span className="text-2xl font-bold tracking-tight">
              {monthlyAppointmentsSocialCount.total}
            </span>
            <p className="text-xs text-muted-foreground">
              <span
                className={`text-${monthlyAppointmentsSocialCount.percentage[0] === '-' ? 'rose' : 'emerald'}-500 dark:text-${monthlyAppointmentsSocialCount.percentage[0] === '-' ? 'rose' : 'emerald'}-400`}
              >
                {monthlyAppointmentsSocialCount.percentage}
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
