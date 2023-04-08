import axiosConfigured from '../libs/axios/main.config'
import { TokensResponse } from '../types/auth.types'
import { User, UserProfileCreate } from '../types/user.types'

export async function logoutService({
  refresh,
}: {
  refresh: string
}): Promise<TokensResponse> {
  return axiosConfigured
    .post('/accounts/logout/', { refresh })
    .then((res) => res.data)
}

export async function getUser({ uuid }: { uuid: string }): Promise<User> {
  return axiosConfigured.get(`/accounts/user/${uuid}/`).then((res) => res.data)
}

export async function updateUserService(
  updateData: Partial<UserProfileCreate>
): Promise<User> {
  const { uuid, ...body } = updateData

  return axiosConfigured
    .patch(`/accounts/user/${uuid}/`, body, {
      headers: { 'Content-Type': 'application/json' },
    })
    .then((res) => res.data)
}

export async function otpVerify(request: {
  email: string
  passcode: string
}): Promise<TokensResponse> {
  return axiosConfigured
    .post(`/accounts/otp/verify/`, request)
    .then((res) => res.data)
}
