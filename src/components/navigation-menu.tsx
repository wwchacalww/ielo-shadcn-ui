import { jwtDecode } from 'jwt-decode'
import * as React from 'react'
import { Navigate } from 'react-router'

import { PayLoad } from '@/api/account/sign-in'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'

const profissional: { title: string; href: string; description: string }[] = [
  {
    title: 'Novo Profissional',
    href: '/profissional/novo',
    description:
      'Registre uma nova Terapeuta, Psicopedagoga, Fonaldióloga, enfim um novo professional para clínica.',
  },
  {
    title: 'Lista de Profissionais',
    href: '/profissionais',
    description: 'Lista com todos os profissionais do Instituto.',
  },
]

export function NavMenu() {
  const token = localStorage.getItem('@ielo:token')
  if (!token) {
    return <Navigate to="/sign-in" replace />
  }
  const { role } = jwtDecode<PayLoad>(token)

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="/" className={navigationMenuTriggerStyle()}>
            Painel
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Profissionais</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {profissional.map((pro) => (
                <ListItem key={pro.title} title={pro.title} href={pro.href}>
                  {pro.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Pacientes</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <ListItem title="Novo Paciente" href="/paciente/novo">
                Registre um novo paciente, não esqueça de preencher todos os
                dados.
              </ListItem>
              <ListItem title="Lista de Pacientes" href="/pacientes">
                Lista de todos os pacientes
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            href={role === 'atendente' ? '/agenda' : '/supervisora/agenda'}
            className={navigationMenuTriggerStyle()}
          >
            Agenda
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'
