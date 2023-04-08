import { ErrorMessage } from 'src/modules/shared/constants/message.constants'
import {
  deleteStorageData,
  getStorageData,
  saveStorageData,
} from 'src/modules/shared/utils/localStorage.utils'
import { LocalStorage } from 'src/modules/shared/constants/localStorage.constants'
import axios, { AxiosRequestConfig } from 'axios'
import axiosConfigured from 'src/modules/shared/libs/axios/main.config'

export const defaultErrorData = {
  detail: {
    message: ErrorMessage.default(),
    code: null,
    provider: null,
  },
}

export const headerConfigs = {
  headers: {
    Accept: 'application/json',
  },
}

export const interceptorsRequest = async (config: AxiosRequestConfig) => {
  const accessToken = getStorageData(LocalStorage.a)

  const hasOwnContentType =
    // eslint-disable-next-line no-prototype-builtins
    config?.headers && config?.headers?.hasOwnProperty('Content-Type')
  const contentType = hasOwnContentType
    ? config?.headers?.['Content-Type']
    : 'application/json'

  if (accessToken) {
    config.headers = {
      ...config.headers,
      Accept: 'application/json',
      'Content-Type': contentType,
      Authorization: `Bearer ${accessToken}`,
    }
  }

  return config
}

export const interceptorsResponseErrorHandler = async (error: any) => {
  const originalConfig = error.config

  if (error.response) {
    if (error.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_AUTH_BASE_URL}/accounts/token/refresh/`,
        {
          refresh: getStorageData(LocalStorage.r),
        }
      )

      if (response.status === 200 && response.data.access) {
        saveStorageData(LocalStorage.a, response.data.access)
        return axiosConfigured(originalConfig)
      } else {
        deleteStorageData(LocalStorage.r)
        deleteStorageData(LocalStorage.a)
        window.dispatchEvent(new Event('logoutUser'))
        return Promise.reject(ErrorMessage.default())
      }
    }

    if (error.response.status === 400) {
      return Promise.reject(error.response.data)
    }

    if (error.response.status === 404) {
      return Promise.reject(ErrorMessage.default())
    }
  }

  return Promise.reject(defaultErrorData)
}
