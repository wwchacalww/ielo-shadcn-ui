import { env } from '@/env'

import { SelectContent, SelectItem } from './ui/select'

export function SelectItemsPayment() {
  const payments = env.VITE_PAYMENTS_LIST
  const listPayments = payments.split(';')
  listPayments.sort((a, b) => a.localeCompare(b))
  return (
    <SelectContent>
      {listPayments.map((lp) => {
        return (
          <SelectItem key={lp} value={lp}>
            {lp}
          </SelectItem>
        )
      })}
    </SelectContent>
  )
}
