import { createBrowserRouter } from 'react-router'

import { AppLayout } from './pages/_layout/app'
import { AuthLayout } from './pages/_layout/auth'
import { AppProfessionalLayout } from './pages/_layout/professionals'
import { NotFound } from './pages/404'
import { AppointmentsAtendentFiltered } from './pages/app/appointments/appointments-filtered'
import { AppointmentsFiltered } from './pages/app/appointments/professional/page'
import { AppointmentsSupervisorFiltered } from './pages/app/appointments/supervisor/page'
import { Dashboard } from './pages/app/dashboard/dashboard'
import { EditPatient } from './pages/app/patients/edit-patient'
import { NewPatient } from './pages/app/patients/new-patient'
import { Patients } from './pages/app/patients/patients'
import { EditProfessional } from './pages/app/professionals/edit-professional'
import { NewProfessional } from './pages/app/professionals/new-professional'
import { Professionals } from './pages/app/professionals/professionals'
import { EditProgress } from './pages/app/progress/edit-progress'
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
        path: '/profissional/:professionalId',
        element: <EditProfessional />,
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
        path: '/paciente/:patientId',
        element: <EditPatient />,
      },
      {
        path: '/agenda',
        element: <AppointmentsAtendentFiltered />,
      },
      {
        path: '/supervisora/agenda',
        element: <AppointmentsSupervisorFiltered />,
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
        element: <AppointmentsFiltered />,
      },
      {
        path: '/profissional/progress/:appointmentId',
        element: <NewProgress />,
      },
      {
        path: '/profissional/progress/edit/:appointmentId',
        element: <EditProgress />,
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
