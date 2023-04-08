import { object, string } from 'yup'
import { RegexConstants } from 'src/modules/shared/constants/regex.constants'
import { MessageConstants } from 'src/modules/shared/constants/message.constants'

import { phoneNumberSchema } from 'src/modules/shared/components/general/PhoneInput/PhoneInputSchema'

export const subscriptionAndPurchasePaymentSchema = object().shape({
  nickname: string()
    .matches(RegexConstants.Name, MessageConstants.ValidName())
    .max(40, MessageConstants.SymbolMax('Никнейм', 40))
    .required(MessageConstants.ValidName()),
  phone_number: phoneNumberSchema,
  email: string()
    .email(MessageConstants.InvalidEmail())
    .required(MessageConstants.Required()),
  // credit_card: creditCardSchema,
})
