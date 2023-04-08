import {
  PurchasePayment,
  SubscriptionPayment,
} from 'src/modules/streamer/types/publicModel.types'
import axiosConfigured from 'src/modules/shared/libs/axios/main.config'

const headers = {
  'Frontend-Api-Key': process.env.REACT_APP_FRONTEND_API_KEY_VALUE,
}

export async function paySubscriptionPlan(
  subscriptionPayment: SubscriptionPayment
): Promise<{ formUrl: string; orderId: string }> {
  return axiosConfigured
    .post(`/contributors/public-subscriber/`, subscriptionPayment, {
      headers,
    })
    .then((res) => res.data)
}

export async function payPurchasePlan(
  purchasePayment: PurchasePayment
): Promise<PurchasePayment> {
  return axiosConfigured
    .post(`/contributors/public-purchaser/`, purchasePayment, {
      headers,
    })
    .then((res) => res.data)
}
