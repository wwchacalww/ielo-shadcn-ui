import { env } from '@/env'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

interface SelectPaymentProps {
  setPayment: React.Dispatch<React.SetStateAction<string>>
}
export function SelectPayment({ setPayment }: SelectPaymentProps) {
  const payments = env.VITE_PAYMENTS_LIST
  const listPayments = payments.split(';')
  listPayments.sort((a, b) => a.localeCompare(b))
  return (
    <Select defaultValue="all" onValueChange={setPayment}>
      <SelectTrigger className="h-8 w-[240px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {listPayments.map((lp) => {
          return (
            <SelectItem key={lp} value={lp}>
              {lp}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}
