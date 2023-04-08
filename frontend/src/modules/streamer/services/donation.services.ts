import axiosConfigured from 'src/modules/shared/libs/axios/main.config'

import {
  DonateCreate,
  DonationResponse,
} from 'src/modules/streamer/types/donation.types'

export async function getDonationList({
  pageNumber,
  pageSize,
  uuid,
}: {
  pageNumber: number
  pageSize: number
  uuid: string
}): Promise<DonationResponse> {
  const queryParams = new URLSearchParams({
    page: pageNumber,
    page_size: pageSize,
  } as any)

  return axiosConfigured
    .get(`/contributors/donators/${uuid}/?${queryParams}`)
    .then((res) => res.data)
}

export async function createDonation(
  donateCreateRequest: DonateCreate
): Promise<{ formUrl: string; orderId: string }> {
  return axiosConfigured
    .post(`/contributors/public-donator/`, donateCreateRequest, {
      headers: {
        'Frontend-api-key': process.env.REACT_APP_FRONTEND_API_KEY_VALUE,
      },
    })
    .then((res) => res.data)
}
