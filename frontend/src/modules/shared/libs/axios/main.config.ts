import axios from 'axios'

import {
  defaultErrorData,
  headerConfigs,
  interceptorsRequest,
  interceptorsResponseErrorHandler,
} from 'src/modules/shared/libs/axios/axios.configs'

const axiosConfigured = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_AUTH_BASE_URL,
  ...headerConfigs,
})

axiosConfigured.interceptors.request.use(interceptorsRequest, () => {
  return Promise.reject(defaultErrorData)
})

axiosConfigured.interceptors.response.use(
  (response) => response,
  interceptorsResponseErrorHandler
)

export default axiosConfigured
