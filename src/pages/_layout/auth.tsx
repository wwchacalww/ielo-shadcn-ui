import { Outlet } from 'react-router'

import LandingImage from '@/assets/landing-image.png'

export function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-2">
      <div className="flex h-full flex-col justify-between border-r border-foreground/5 bg-ieloBlue600">
        <div className="flex h-full items-center justify-center">
          <img src={LandingImage} alt="Landing" width={480} />
        </div>

        <footer className="text-sm text-slate-200">
          &copy; Instituto Terapêutico Elo - {new Date().getFullYear()}
        </footer>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  )
}
