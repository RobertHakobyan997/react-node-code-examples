import {
  Currency,
  PaginatedResponse,
} from 'src/modules/shared/types/response.types'

export interface SubscriptionPlanCreate {
  name: string
  description: string
  photo: string | null | File
  link: string
  price: string
  currency: Currency
  duration: string
}

export interface SubscriptionPlan extends SubscriptionPlanCreate {
  id: number
}

export type SubscriptionPlanResponse = PaginatedResponse<SubscriptionPlan>

export interface SubscriptionLogType {
  subscription_plan: {
    name: string
    currency: Currency
    price: string
    duration: number
  }
  nickname: string
  created_at: string
}
