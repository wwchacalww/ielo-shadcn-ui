import { Helmet } from 'react-helmet-async'

import { AppointmentChart } from './appointment-chart'
import { MonthAppointmentCard } from './month-appointment-card'
import { MonthAppointmentParticularCard } from './month-appointment-particular-card'
import { MonthAppointmentPlansCard } from './month-appointment-plans-card'
import { MonthAppointmentSocialCard } from './month-appointment-social-card'
import { PaymentsChart } from './payments-chart'

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className="grid grid-cols-4 gap-4">
          <MonthAppointmentCard />
          <MonthAppointmentPlansCard />
          <MonthAppointmentSocialCard />
          <MonthAppointmentParticularCard />
        </div>

        <div className="grid grid-cols-9 gap-4">
          <AppointmentChart />
          <PaymentsChart />
        </div>
      </div>
    </>
  )
}
