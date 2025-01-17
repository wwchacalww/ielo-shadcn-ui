import { jwtDecode } from 'jwt-decode'
import { Navigate, Outlet } from 'react-router'

import { Header } from '@/components/header'

interface PayLoad {
  sub: string
  role: string
  iat: number
  exp: number
}

export function AppProfessionalLayout() {
  const token = localStorage.getItem('@ielo:token')
  if (!token) {
    return <Navigate to="/sign-in" replace />
  }
  const { exp, role } = jwtDecode<PayLoad>(token)
  if (role !== 'profissional') {
    localStorage.removeItem('@ielo:token')
    return <Navigate to="/sign-in" replace />
  }
  const check = Number(exp) * 1000 > new Date().getTime()
  if (check) {
    return (
      <div className="flex min-h-screen flex-col antialiased">
        <Header role={role} />

        <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
          <Outlet />
        </div>
      </div>
    )
  } else {
    return <Navigate to="/sign-in" replace />
  }
}
