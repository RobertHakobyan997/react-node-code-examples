import { string } from 'yup'
import { MessageConstants } from 'src/modules/shared/constants/message.constants'
import { isValidPhoneNumber } from 'libphonenumber-js'

export const phoneNumberSchema = string()
  .test('validPhoneNumber', MessageConstants.InvalidPhone(), (value) => {
    return isValidPhoneNumber(value ?? '')
  })
  .required(MessageConstants.Required())
