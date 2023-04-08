import { RegexConstants } from '../constants/regex.constants'

export const otpPasteUtil = ({
  pasteData,
  otp,
  activeOtpIndex,
}: {
  pasteData: string
  otp: string[]
  activeOtpIndex: number
}) => {
  let otpLength = otp.length
  let pasteDataIndex = activeOtpIndex
  let dataIndex = 0

  while (pasteDataIndex <= otpLength) {
    const pasteItem = pasteData[dataIndex]
    const isNumber = RegexConstants.Numeric.test(pasteItem)

    if (isNumber) {
      otp[pasteDataIndex] = pasteData[dataIndex]
    }
    pasteDataIndex += 1
    dataIndex += 1
  }

  otp.length = otpLength

  const otpStringLength = otp.join('').length
  const lastIndex = otpStringLength > 0 ? otpStringLength - 1 : 0

  return { newOtp: otp, lastIndex }
}

export const otpChangeUtil = ({ inputValue }: { inputValue: string }) => {
  const isNumber = RegexConstants.Numeric.test(inputValue)
  const normalizedInputValue = inputValue
    .trim()
    .substring(inputValue.length - 1)

  return { normalizedInputValue, isNumber }
}
