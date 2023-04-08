import { ErrorResponse } from '../types/error.types'
import { ErrorMessage } from '../constants/message.constants'

export const errorHandler = (errorResponse: ErrorResponse, param?: string) => {
  if (!errorResponse.detail) {
    return ErrorMessage.default()
  }

  if (errorResponse.detail) {
    return ErrorMessage[errorResponse.detail.code](
      param ?? errorResponse.detail?.provider
    )
  }

  return ErrorMessage.default()
}
