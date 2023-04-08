import { PurchaseLogType } from '../types/purchase'

import {
  PurchasePlan,
  PurchasePlanCreate,
  PurchasePlanResponse,
} from 'src/modules/model/types/purchase'
import { PaginatedResponse } from '../../shared/types/response.types'
import axiosConfigured from 'src/modules/shared/libs/axios/main.config'

export async function getPurchasePlanList({
  pageNumber,
  pageSize,
}: {
  pageNumber: number
  pageSize: number
}): Promise<PurchasePlanResponse> {
  const queryParams = new URLSearchParams({
    page: pageNumber,
    page_size: pageSize,
  } as any)

  return axiosConfigured
    .get(`/contributors/purchase-plans/?${queryParams}`)
    .then((res) => res.data)
}

export function createPurchasePlan(
  paymentPlan: PurchasePlanCreate
): Promise<PurchasePlan> {
  return axiosConfigured
    .post(`/contributors/purchase-plans/`, paymentPlan, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((res) => res.data)
}

export async function editPurchasePlan(
  paymentPlan: PurchasePlan
): Promise<PurchasePlan> {
  const { id, ...purchaseDataToUpdate } = paymentPlan

  return axiosConfigured
    .patch(`/contributors/purchase-plans/${id}`, purchaseDataToUpdate)
    .then((res) => res.data)
}

export async function deletePurchasePlan({
  id,
}: {
  id: number
}): Promise<PurchasePlanResponse> {
  return axiosConfigured
    .delete(`/contributors/purchase-plans/${id}/`)
    .then((res) => res.data)
}

export async function getPurchaseList({
  pageNumber,
  pageSize,
  uuid,
}: {
  pageNumber: number
  pageSize: number
  uuid: string
}): Promise<PaginatedResponse<PurchaseLogType>> {
  const queryParams = new URLSearchParams({
    page: pageNumber,
    page_size: pageSize,
  } as any)

  return axiosConfigured
    .get(`/contributors/purchasers/${uuid}/?${queryParams}`)
    .then((res) => res.data)
}
