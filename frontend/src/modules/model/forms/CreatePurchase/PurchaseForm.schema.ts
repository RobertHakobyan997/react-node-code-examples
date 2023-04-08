import { mixed, number, object, string } from 'yup'
import { RegexConstants } from 'src/modules/shared/constants/regex.constants'
import { MessageConstants } from 'src/modules/shared/constants/message.constants'
import { isValidUrl } from 'src/modules/shared/utils/string.utils'
import {
  imageUploadValidation,
  imageValidation,
} from 'src/modules/shared/utils/validation.utils'

export const createPaymentSchema = object().shape({
  name: string()
    .max(20, MessageConstants.StringMax(20))
    .matches(RegexConstants.Name, MessageConstants.ValidName())
    .required(MessageConstants.Required()),
  description: string()
    .max(280, MessageConstants.SymbolMax('Описание', 280))
    .required(MessageConstants.Required),
  photo: mixed()
    .test(
      'validImage',
      (data: any) => imageValidation(data.value),
      imageUploadValidation
    )
    .nullable()
    .required(MessageConstants.Required()),
  link: string()
    .test('isValidUrl', MessageConstants.Link(), isValidUrl)
    .required(MessageConstants.Required()),
  price: number()
    .positive(MessageConstants.RoundNumbers())
    .typeError(MessageConstants.RoundNumbers())
    .test('no-leading-zero', MessageConstants.RoundNumbers(), (value: any) => {
      return value !== 0
    })
    .integer(MessageConstants.RoundNumbers())
    .min(1, MessageConstants.RoundNumbers())
    .max(1_000_000, MessageConstants.NumberMax(1_000_000))
    .required(MessageConstants.Required()),
  currency: string().required(MessageConstants.Required()),
})
