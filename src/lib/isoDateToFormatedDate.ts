import { intlFormat } from 'date-fns'

export function isoDateToFormatedDate(isoDate: string) {
  return intlFormat(
    isoDate,
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
    },
    { locale: 'pt-BR' },
  )
}
