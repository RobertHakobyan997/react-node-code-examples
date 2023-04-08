import { object, string } from 'yup'
import { MessageConstants } from '../constants/message.constants'

export const authSchema = object().shape({
  email: string()
    .email(MessageConstants.InvalidEmail())
    .required(MessageConstants.Required()),
})
