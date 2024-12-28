import { Route, Routes } from 'react-router'

import App from './App'
import { AppLayout } from './pages/_layout/app'
import { AuthLayout } from './pages/_layout/auth'
import { Dashboard } from './pages/app/dashboard'
import { NewPatient } from './pages/app/patients/new-patient'
import { Patients } from './pages/app/patients/patients'
import { NewProfessional } from './pages/app/professionals/new-professional'
import { Professionals } from './pages/app/professionals/professionals'
import { SignIn } from './pages/auth/sign-in'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<App />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profissionais" element={<Professionals />} />
        <Route path="/profissional/novo" element={<NewProfessional />} />
        <Route path="/paciente/novo" element={<NewPatient />} />
        <Route path="/pacientes" element={<Patients />} />
      </Route>
      <Route path="/sign-in" element={<AuthLayout />}>
        <Route index element={<SignIn />} />
      </Route>
    </Routes>
  )
}
