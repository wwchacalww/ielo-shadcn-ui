import { useSearchParams } from 'react-router'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function FilterByMonth() {
  const [searchParams, setSearchParams] = useSearchParams()
  const range = z
    .enum(['dd', 'wk', 'mm'])
    .parse(searchParams.get('range') ?? 'mm')
  const value = z.coerce
    .number()
    .parse(searchParams.get('value') ?? new Date().getMonth() + 1)
  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ]

  let month = months[new Date().getMonth()]

  if (range === 'mm') {
    month = months[value - 1]
  }

  function handleFilterByMonth(mm?: number) {
    if (!mm) {
      mm = new Date().getMonth() + 1
    }
    setSearchParams((prev) => {
      prev.set('page', '1')
      prev.set('range', 'mm')
      prev.set('value', mm.toString())
      return prev
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="xs">
          {month}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {months.map((month, i) => (
          <DropdownMenuItem
            key={month}
            onClick={() => handleFilterByMonth(i + 1)}
          >
            <span>{month}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
