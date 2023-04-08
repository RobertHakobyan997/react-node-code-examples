import { CreditCard } from 'src/modules/shared/types/creditCard.types'

export interface SubscriptionPayment {
  nickname: string
  email: string
  phone_number: string
  credit_card: CreditCard
  subscription_plan: number
}

export type PurchasePayment = Omit<SubscriptionPayment, 'subscription_plan'> & {
  purchase_plan: number
}
