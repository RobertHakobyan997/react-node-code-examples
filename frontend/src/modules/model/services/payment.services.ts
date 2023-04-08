import axiosConfigured from 'src/modules/shared/libs/axios/main.config'
import { PaginatedResponse } from 'src/modules/shared/types/response.types'
import { Payment } from 'src/modules/model/types/payment.types'

export async function getPaymentTransactions({
  pageNumber,
  pageSize,
}: {
  pageNumber: number
  pageSize: number
}): Promise<PaginatedResponse<Payment>> {
  const queryParams = new URLSearchParams({
    page: pageNumber,
    page_size: pageSize,
  } as any)

  return axiosConfigured
    .get(`/payments/withdrawal-request/?${queryParams}`)
    .then((res) => res.data)
}
