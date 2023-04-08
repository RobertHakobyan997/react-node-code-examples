import { RegexConstants } from 'src/modules/shared/constants/regex.constants'
import creditCardType, {
  getTypeInfo,
  types as CardType,
} from 'credit-card-type'
import { CreditCardType } from 'credit-card-type/src/types'

export const checkLuhn = (ccNum?: string) => {
  if (!ccNum) return false

  let nCheck = 0
  let bEven = false

  ccNum = ccNum.replace(/\D/g, '')

  for (let n = ccNum.length - 1; n >= 0; n--) {
    let cDigit = ccNum.charAt(n),
      nDigit = parseInt(cDigit, 10)

    if (bEven) {
      if ((nDigit *= 2) > 9) nDigit -= 9
    }

    nCheck += nDigit
    bEven = !bEven
  }

  return nCheck % 10 === 0
}

export const validCreditCardType = (value: string) => {
  creditCardType.updateCard(creditCardType.types.MIR, {
    patterns: [2200, 2201, 2202, 2203, 2204],
  })

  return creditCardType(value).filter((cardType: CreditCardType) => {
    return (
      cardType.type === CardType.MASTERCARD ||
      cardType.type === CardType.VISA ||
      cardType.type === CardType.AMERICAN_EXPRESS ||
      cardType.type === CardType.UNIONPAY ||
      cardType.type === CardType.MIR
    )
  })
}

const prettyCardNumber = (cardNumber: string, cardType?: string) => {
  let card = cardType ? getTypeInfo(cardType) : null

  if (card) {
    // @ts-ignore
    const offsets = [].concat(0, card.gaps, cardNumber.length)
    const components = []

    for (let i = 0; offsets[i] < cardNumber.length; i++) {
      let start = offsets[i]
      let end = Math.min(offsets[i + 1], cardNumber.length)
      components.push(cardNumber.substring(start, end))
    }

    return components.join(' ')
  }

  return cardNumber
}

export const creditCardNumberValidator = ({ value }: { value: string }) => {
  let result: {
    value: string
    cardData: CreditCardType | null
  } = {
    value: '',
    cardData: null,
  }

  let max = 15

  const formattedValue = value.replace(/\D/g, '').slice(0, value.length).trim()

  const cardData = validCreditCardType(formattedValue)
  result.cardData = formattedValue ? cardData[0] : null

  if (RegexConstants.Numeric.test(value)) {
    if (!cardData.length) {
      result.cardData = null
    }

    if (cardData.length === 1) result.cardData = cardData[0]

    max = Math.max(...(result.cardData?.lengths ?? [max]))

    if (value.length <= max) {
      result.value = prettyCardNumber(value, result.cardData?.type)
    } else {
      const formattedValue = value.replace(/\D/g, '').slice(0, max)

      return {
        cardData: result.cardData,
        value: prettyCardNumber(formattedValue, result.cardData?.type),
      }
    }
  } else {
    const formattedValue = value.replace(/\D/g, '').slice(0, value.length)

    return {
      cardData: result.cardData,
      value: prettyCardNumber(formattedValue, result.cardData?.type),
    }
  }

  return result
}

export const creditCardNameValidator = (value: string) => {
  if (RegexConstants.LatinLetters.test(value)) {
    return value.toUpperCase()
  } else {
    return value.replace(RegexConstants.ExceptLatinLetters, '')
  }
}

export const creditCardMonthValidatorOnblur = (value: string) => {
  return value && value.length < 2 ? `0${value}` : value
}

export const creditCardMonthValidator = (value: string) => {
  if (
    RegexConstants.Numeric.test(value) &&
    Number(value) <= 12 &&
    Number(value) > 0
  ) {
    return value
  } else {
    return value.slice(0, -1)
  }
}

let yearPrevError = ''
export const creditCardYearValidator = (value: string) => {
  let result = { value: '', errorMessage: '' }
  const currentYearLastDigits = Number(
    new Date().getFullYear().toString().slice(-2)
  )

  if (RegexConstants.Numeric.test(value) && value.length <= 2) {
    result.value = value
    if (Number(value) < currentYearLastDigits) {
      result.errorMessage = 'Not valid'
      yearPrevError = 'Not valid'
    } else {
      yearPrevError = ''
    }

    return result
  } else {
    result.errorMessage = yearPrevError ? yearPrevError : ''
    result.value = value.slice(0, -1)
  }
  return result
}

export const creditCardCvvValidator = (
  value: string,
  codeLength: number = 4
) => {
  if (RegexConstants.Numeric.test(value)) {
    if (value.length > codeLength) {
      return value.slice(0, -1)
    } else {
      return value
    }
  } else {
    return value.slice(0, -1)
  }
}
