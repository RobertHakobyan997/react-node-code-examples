import { format } from 'date-fns'

export const regularDateFormatter = (dateString: string) => {
  return format(new Date(dateString), 'dd/MM/yyyy')
}
