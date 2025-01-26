import { createBrowserRouter } from 'react-router'

import { AppLayout } from './pages/_layout/app'
import { AuthLayout } from './pages/_layout/auth'
import { AppProfessionalLayout } from './pages/_layout/professionals'
import { NotFound } from './pages/404'
import { Appointments } from './pages/app/appointments/appointments'
import { ProfessionalAppointments } from './pages/app/appointments/professional/appointments'
import { Dashboard } from './pages/app/dashboard/dashboard'
import { NewPatient } from './pages/app/patients/new-patient'
import { Patients } from './pages/app/patients/patients'
import { NewProfessional } from './pages/app/professionals/new-professional'
import { Professionals } from './pages/app/professionals/professionals'
import { NewProgress } from './pages/app/progress/new-progress'
import { SignIn } from './pages/auth/sign-in'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/profissionais',
        element: <Professionals />,
      },
      {
        path: '/profissional/novo',
        element: <NewProfessional />,
      },
      {
        path: '/paciente/novo',
        element: <NewPatient />,
      },
      {
        path: '/pacientes',
        element: <Patients />,
      },
      {
        path: '/agenda',
        element: <Appointments />,
      },
    ],
  },
  {
    path: '/',
    element: <AppProfessionalLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/profissional/agenda',
        element: <ProfessionalAppointments />,
      },
      {
        path: '/profissional/progress/:appointmentId',
        element: <NewProgress />,
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        element: <SignIn />,
      },
    ],
  },
])
