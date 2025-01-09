import { useQuery } from '@tanstack/react-query'
import { ChevronDown, LogOut, RectangleEllipsis } from 'lucide-react'
import { useNavigate } from 'react-router'

import { getProfile } from '@/api/get-profile'

import { ChangeMyPasswordDialog } from './change-my-password-dialog'
import { Button } from './ui/button'
import { Dialog, DialogTrigger } from './ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export function AccountMenu() {
  const navigate = useNavigate()
  const { data: profile, error: profileError } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  })
  if (profileError) {
    navigate('/sign-in')
  }

  function handleSignOut() {
    localStorage.removeItem('@ielo:token')
    navigate('/sign-in')
  }
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex select-none items-center gap-2"
          >
            {profile?.name}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col">
            <span>{profile?.email}</span>
            <span className="text-sm font-normal text-muted-foreground">
              {profile?.Professional && profile?.Professional.length > 0
                ? profile?.Professional[0].specialty
                : profile?.role}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DialogTrigger asChild>
            <DropdownMenuItem>
              <RectangleEllipsis className="mr-2 h-4 w-4" />
              <span>Trocar senha</span>
            </DropdownMenuItem>
          </DialogTrigger>

          <DropdownMenuItem
            className="text-rose-500 dark:text-rose-400"
            onClick={handleSignOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sair</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ChangeMyPasswordDialog />
    </Dialog>
  )
}
