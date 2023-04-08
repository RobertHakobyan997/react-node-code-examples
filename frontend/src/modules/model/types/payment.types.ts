export const enum PaymentStatus {
  not_completed = 'not_completed',
  success = 'success',
  error = 'error',
}

export interface Payment {
  amount: number
  created_date: string
  status: PaymentStatus
}
