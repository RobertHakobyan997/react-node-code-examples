import axiosConfigured from '../libs/axios/main.config'
import { PublicUser } from '../types/user.types'

const { REACT_APP_FRONTEND_API_KEY_VALUE } = process.env

export async function getPublicUser({
  uuid,
}: {
  uuid: string
}): Promise<PublicUser> {
  return axiosConfigured
    .get(`/accounts/public-user/${uuid}/`, {
      headers: {
        'Frontend-Api-Key': REACT_APP_FRONTEND_API_KEY_VALUE,
      },
    })
    .then((res) => res.data)
}
