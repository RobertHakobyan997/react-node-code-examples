import { SubscriptionPlan } from 'src/modules/model/types/subscription'
import {
  Currency,
  PaginatedResponse,
} from 'src/modules/shared/types/response.types'

export type PurchasePlanCreate = Omit<PurchasePlan, 'id'>

export type PurchasePlan = Omit<SubscriptionPlan, 'duration'>

export type PurchasePlanResponse = PaginatedResponse<PurchasePlan>

export interface PurchaseLogType {
  purchase_plan: { name: string; currency: Currency; price: number }
  nickname: string
  created_at: string
}
