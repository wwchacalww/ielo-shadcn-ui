import { jwtDecode } from 'jwt-decode'
import { Navigate, Outlet } from 'react-router'

import { Header } from '@/components/header'

export function AppLayout() {
  const token = localStorage.getItem('@ielo:token')
  if (!token) {
    return <Navigate to="/sign-in" replace />
  }
  const { exp } = jwtDecode(token)
  console.log(exp)
  const check = Number(exp) * 1000 > new Date().getTime()
  if (check) {
    return (
      <div className="flex min-h-screen flex-col antialiased">
        <Header />

        <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
          <Outlet />
        </div>
      </div>
    )
  } else {
    return <Navigate to="/sign-in" replace />
  }
}
