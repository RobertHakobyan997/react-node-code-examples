import { object, string } from 'yup'
import { MessageConstants } from '../constants/message.constants'

export const editProfileSchema = object().shape({
  name: string()
    .matches(/[a-zA-Z]/, MessageConstants.ValidName())
    .max(20, MessageConstants.StringMax(20))
    .required(MessageConstants.Required()),
  cover_photo: string().nullable(),
  profile_photo: string().nullable(),
})
