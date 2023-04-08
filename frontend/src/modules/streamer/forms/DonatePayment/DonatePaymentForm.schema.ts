import { number, object, string } from 'yup'
import {
  ErrorMessage,
  MessageConstants,
} from 'src/modules/shared/constants/message.constants'
import { RegexConstants } from 'src/modules/shared/constants/regex.constants'

export const publicPaymentSchema = object({
  currency: string(),

  email: string()
    .email(ErrorMessage.invalidEmail())
    .required(MessageConstants.Required()),
  nickname: string()
    .matches(RegexConstants.Name, MessageConstants.ValidName())
    .max(40, MessageConstants.SymbolMax('Никнейм', 40))
    .required(MessageConstants.ValidName()),

  notes: string(),
  amount: number()
    .positive()
    .integer(MessageConstants.RoundNumbers())
    .typeError(MessageConstants.RoundNumbers())
    .test('no-leading-zero', MessageConstants.RoundNumbers(), (value: any) => {
      return value !== 0
    })
    .min(50, MessageConstants.MinAmount())
    .required(MessageConstants.Required()),
})
