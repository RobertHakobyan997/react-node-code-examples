import axiosConfigured from '../libs/axios/main.config'
import { Withdrawal } from '../types/user.types'

export async function withdrawalRequest(payload: any): Promise<Withdrawal> {
  return axiosConfigured
    .post(`/payments/withdrawal-request/`, payload)
    .then((res) => res.data)
}
