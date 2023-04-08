import axiosConfigured from '../libs/axios/main.config'

export async function generateSumsubAccessToken(): Promise<{
  access_token: string
}> {
  return axiosConfigured
    .post('/verification/create-access-token/')
    .then((res) => res.data)
}
