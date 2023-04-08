import { mixed, number, object, string } from 'yup'
import { MessageConstants } from 'src/modules/shared/constants/message.constants'
import { RegexConstants } from 'src/modules/shared/constants/regex.constants'
import { isValidUrl } from 'src/modules/shared/utils/string.utils'
import {
  imageUploadValidation,
  imageValidation,
} from 'src/modules/shared/utils/validation.utils'

export const createSubscriptionSchema = object().shape({
  id: number(),
  name: string()
    .max(20, MessageConstants.StringMax(20))
    .matches(RegexConstants.Name, MessageConstants.ValidName())
    .required(MessageConstants.Required()),
  description: string()
    .max(280, MessageConstants.SymbolMax('Описание', 280))
    .required(MessageConstants.Required()),
  photo: mixed()
    .test(
      'validImage',
      (data: any) => imageValidation(data.value),
      imageUploadValidation
    )
    .required(MessageConstants.Required())
    .nullable(),
  link: string()
    .test('isValidUrl', MessageConstants.Link(), isValidUrl)
    .required(MessageConstants.Required()),
  price: number()
    .min(1, MessageConstants.RoundNumbers())
    .max(1_000_000, MessageConstants.NumberMax(1_000_000))
    .typeError(MessageConstants.RoundNumbers())
    .positive(MessageConstants.RoundNumbers())
    .required(MessageConstants.Required())
    .integer(MessageConstants.RoundNumbers())
    .test('no-leading-zero', MessageConstants.RoundNumbers(), (value: any) => {
      return value !== 0
    }),
  duration: number()
    .positive()
    .integer(MessageConstants.NumbersSpace(1, 12))
    .typeError(MessageConstants.NumbersSpace(1, 12))
    .test(
      'no-leading-zero',
      MessageConstants.NumbersSpace(1, 12),
      (value: any) => {
        return value !== 0
      }
    )
    .min(1, MessageConstants.NumbersSpace(1, 12))
    .max(12, MessageConstants.NumbersSpace(1, 12))
    .required(MessageConstants.Required()),
  currency: string().required(MessageConstants.Required()),
})
