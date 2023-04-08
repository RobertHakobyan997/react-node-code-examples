import { object, string } from 'yup'
import {
  CreditCardMessages,
  MessageConstants,
} from 'src/modules/shared/constants/message.constants'

import {
  checkLuhn,
  validCreditCardType,
} from 'src/modules/shared/utils/creditCardValidation.utils'

export const creditCardSchema = object({
  name: string()
    .test('validCardName', CreditCardMessages.RequiredName, (value) => {
      return Boolean(value?.includes(' '))
    })
    .required(CreditCardMessages.RequiredName),
  number: string()
    .required(CreditCardMessages.Number)
    .test('validCardType', 'Неправильный номер или формат карты', (value) => {
      const creditCardData = validCreditCardType(value ?? '')

      return Boolean(
        creditCardData.length === 1 &&
          creditCardData[0]?.lengths.includes(value?.length ?? 0) &&
          checkLuhn(value)
      )
    }),

  code: string()
    .min(3, CreditCardMessages.Code)
    .max(4, CreditCardMessages.Code)
    .required(MessageConstants.Required()),
  expiry_month: string()
    .required(MessageConstants.Required())
    .test((value) => {
      const numberValue = Number(value)

      return !!(numberValue && numberValue <= 12 && numberValue > 0)
    }),
  expiry_year: string()
    .test('validYear', 'Недействительный год', (value) => {
      const currentYearLastDigits = Number(
        new Date().getFullYear().toString().slice(-2)
      )

      return Number(value) >= currentYearLastDigits
    })
    .required(MessageConstants.Required()),
})
