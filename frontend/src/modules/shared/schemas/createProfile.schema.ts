import { object, string } from 'yup'
import { ErrorMessage, MessageConstants } from '../constants/message.constants'
import { RegexConstants } from 'src/modules/shared/constants/regex.constants'

export const createProfileSchema = object().shape({
  name: string()
    .matches(/[a-zA-Z]/, MessageConstants.ValidName())
    .max(20, MessageConstants.StringMax(20))
    .required(MessageConstants.Required()),
  role: string().required(MessageConstants.Required()),
  cover_photo: string().nullable(),
  profile_photo: string().nullable(),
  referred_code: string()
    .test(
      'is_valid_uuid',
      ErrorMessage['ErrorCode.INVALID_REFERRAL_CODE'](),
      (value) => {
        if (value) {
          return RegexConstants.ValidUuid.test(value)
        }
        return true
      }
    )
    .nullable(),
})
