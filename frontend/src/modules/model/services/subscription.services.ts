import axiosConfigured from 'src/modules/shared/libs/axios/main.config'

import {
  SubscriptionLogType,
  SubscriptionPlan,
  SubscriptionPlanCreate,
  SubscriptionPlanResponse,
} from 'src/modules/model/types/subscription'
import { PaginatedResponse } from 'src/modules/shared/types/response.types'

export async function getSubscriptionPlanList({
  pageNumber,
  pageSize,
}: {
  pageNumber: number
  pageSize: number
}): Promise<SubscriptionPlanResponse> {
  const queryParams = new URLSearchParams({
    page: pageNumber,
    page_size: pageSize,
  } as any)

  return axiosConfigured
    .get(`/contributors/subscription-plans/?${queryParams}`)
    .then((res) => res.data)
}

export async function createSubscriptionPlan(
  subscriptionPlan: SubscriptionPlanCreate
): Promise<SubscriptionPlan> {
  return axiosConfigured
    .post(`/contributors/subscription-plans/`, subscriptionPlan, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((res) => res.data)
}

export async function editSubscriptionPlan(
  subscriptionPlan: SubscriptionPlan
): Promise<SubscriptionPlan> {
  const { id, ...subscriptionDataToUpdate } = subscriptionPlan

  return axiosConfigured
    .patch(`/contributors/subscription-plans/${id}`, subscriptionDataToUpdate)
    .then((res) => res.data)
}

export async function deleteSubscriptionPlan({
  id,
}: {
  id: number
}): Promise<SubscriptionPlanResponse> {
  return axiosConfigured
    .delete(`/contributors/subscription-plans/${id}/`)
    .then((res) => res.data)
}

export async function getSubscriptionList({
  pageNumber,
  pageSize,
  uuid,
}: {
  pageNumber: number
  pageSize: number
  uuid: string
}): Promise<PaginatedResponse<SubscriptionLogType>> {
  const queryParams = new URLSearchParams({
    page: pageNumber,
    page_size: pageSize,
  } as any)

  return axiosConfigured
    .get(`/contributors/subscribers/${uuid}/?${queryParams}`)
    .then((res) => res.data)
}
