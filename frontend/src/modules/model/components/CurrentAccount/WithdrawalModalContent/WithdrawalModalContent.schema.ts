import {
  CreditCardMessages,
  MessageConstants,
  WithdrawalMessages,
} from 'src/modules/shared/constants/message.constants'
import { object, string, number } from 'yup'
import { RegexConstants } from 'src/modules/shared/constants/regex.constants'

import {
  checkLuhn,
  validCreditCardType,
} from 'src/modules/shared/utils/creditCardValidation.utils'

export const withdrawalModalContentSchema = object({
  full_name: string()
    .test('validCardName', CreditCardMessages.ValidName, (value) => {
      return RegexConstants.ValidCreditCardholderName.test(value ?? '')
    })
    .max(50, CreditCardMessages.ValidName)
    .required(CreditCardMessages.RequiredName),
  amount: number()
    .positive()
    .integer(MessageConstants.RoundNumbers())
    .typeError(MessageConstants.RoundNumbers())
    .test('no-leading-zero', MessageConstants.RoundNumbers(), (value: any) => {
      return value !== 0
    })
    .min(2000, WithdrawalMessages.minAmount(2000))
    .max(100000, WithdrawalMessages.maxAmount(100000))
    .required(MessageConstants.Required())
    .when('$userBalance', (userBalance, schema) => {
      return schema.test(
        'is-smaller-than-balance',
        MessageConstants.InvalidAmount(),
        (value: number) => {
          const val = value ?? 0
          return Boolean(val <= userBalance)
        }
      )
    }),
  card: string()
    .required(CreditCardMessages.Number)
    .test('validCardType', 'Неправильный номер или формат карты', (value) => {
      const cardWithoutSpace = value ? value.replace(/\s/g, '') : ''
      const creditCardData = validCreditCardType(cardWithoutSpace ?? '')

      return Boolean(
        creditCardData.length === 1 &&
          creditCardData[0]?.lengths.includes(cardWithoutSpace?.length ?? 0) &&
          checkLuhn(value)
      )
    }),
})
