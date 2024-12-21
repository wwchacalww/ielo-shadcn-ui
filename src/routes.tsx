import { Route, Routes } from 'react-router'

import App from './App'
import { AppLayout } from './pages/_layout/app'
import { AuthLayout } from './pages/_layout/auth'
import { Dashboard } from './pages/app/dashboard'
import { SignIn } from './pages/auth/sign-in'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<App />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route path="/sign-in" element={<AuthLayout />}>
        <Route index element={<SignIn />} />
      </Route>
    </Routes>
  )
}
