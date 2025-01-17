import { AccountMenu } from './account-menu'
import { LogoDarkIcon } from './icons/logo-dark'
import { LogoLightIcon } from './icons/logo-light'
import { NavMenu } from './navigation-menu'
import { ModeToggle } from './theme/mode-toggle'
import { useTheme } from './theme/theme-provider'
import { Separator } from './ui/separator'

export function Header({ role = 'professional' }) {
  const { theme } = useTheme()

  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        {theme !== 'light' ? (
          <LogoDarkIcon width={90} height={85} />
        ) : (
          <LogoLightIcon width={90} height={85} />
        )}

        <Separator orientation="vertical" className="h-6" />

        {/* <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to="/dashboard">
            <Home className="h-4 w-4" />
            Painel
          </NavLink>
          <NavLink to="/professionals">
            <Home className="h-4 w-4" />
            Profissionais
          </NavLink>
        </nav> */}
        {role === 'atendente' && <NavMenu />}

        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
          <AccountMenu />
        </div>
      </div>
    </div>
  )
}
