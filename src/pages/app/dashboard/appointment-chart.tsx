import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import colors from 'tailwindcss/colors'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const data = [
  { date: '06/01', appointments: 27 },
  { date: '07/01', appointments: 12 },
  { date: '08/01', appointments: 20 },
  { date: '09/01', appointments: 15 },
  { date: '10/01', appointments: 9 },
  { date: '11/01', appointments: 30 },
  { date: '13/01', appointments: 11 },
  { date: '14/01', appointments: 22 },
]
export function AppointmentChart() {
  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Atendimentos do período
          </CardTitle>
          <CardDescription>Atendimentos diário no período</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data} style={{ fontSize: 12 }}>
            <XAxis dataKey="date" tickLine={false} axisLine={false} dy={16} />
            <YAxis stroke="#888" axisLine={false} tickLine={false} />
            <Line
              type="linear"
              stroke={colors.orange['500']}
              strokeWidth={2}
              dataKey="appointments"
            />

            <CartesianGrid vertical={false} className="stroke-muted" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
