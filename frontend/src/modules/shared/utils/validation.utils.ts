import { RegexConstants } from '../constants/regex.constants'
import { ValidImages } from '../constants/validation.contants'
import { ProfileImageMessage } from '../constants/message.constants'
import { AsYouType, getCountryCallingCode } from 'libphonenumber-js'
import { CountryCode } from 'libphonenumber-js/custom'
import { DropdownType } from 'src/modules/shared/components/general/Dropdown/Dropdown'

const KbToMb = 1_048_576

export const imageValidation = (file: File | string) => {
  if (typeof file === 'string') {
    return Boolean(file)
  }

  const fileExtensionExec = RegexConstants.FileExtension.exec(file?.name)
  const fileExtension = fileExtensionExec && fileExtensionExec[1]

  const fileSizeInMb = Math.round(Number(file?.size / KbToMb))
  const isValidType = ValidImages.includes(String(fileExtension).toLowerCase())
  const isLessThanOneMb = fileSizeInMb < 1

  if (!isValidType && !isLessThanOneMb) {
    return `${ProfileImageMessage.SizeError}, \n ${ProfileImageMessage.TypeError}`
  }

  if (!isValidType) {
    return ProfileImageMessage.TypeError
  }

  if (!isLessThanOneMb) {
    return ProfileImageMessage.SizeError
  }

  return ''
}

export const makeFieldsValid = (obj: { [key: string]: any }) => {
  let resultObject: any = {}
  for (const [key, val] of Object.entries(obj)) {
    if (Object.hasOwn(obj ?? {}, key) && (Boolean(val) || val === null)) {
      resultObject[key] = val
    }
  }

  return resultObject
}

export const getDirtyValues = (
  obj: { [key: string]: any },
  dirtyObject: { [key: string]: boolean }
) => {
  let resultObject: any = {}
  for (const [dirtyKey, dirtyValue] of Object.entries(dirtyObject)) {
    if (Object.hasOwn(obj ?? {}, dirtyKey) && Boolean(dirtyValue)) {
      resultObject[dirtyKey] = obj[dirtyKey]
    }
  }

  return resultObject
}

export const phoneNumberValidationOnChange = (
  value: string,
  countryData: DropdownType
) => {
  const asYouType = new AsYouType({
    defaultCountry: countryData.nameId as CountryCode,
  })

  const formattedText = asYouType.input(value)
  let countryCode = getCountryCallingCode(countryData.nameId as CountryCode)
  countryCode = `+${countryCode}`

  if (!value.startsWith(countryCode) && value.startsWith('+')) {
    return countryCode
  }

  if (value.length === 1 && value !== '+') {
    return `${countryCode + formattedText}`
  }

  if (formattedText.length <= countryCode.length) {
    return countryCode
  }

  if (!value.startsWith('+')) {
    return `${countryCode + formattedText}`
  }

  return RegexConstants.NumericPhone.test(formattedText)
    ? formattedText
    : formattedText.replace(RegexConstants.ExceptNumericPhone, '')
}

export const imageUploadValidation = (value: any) => {
  if (typeof value === 'string') {
    return true
  }

  if (!value) return true

  return !imageValidation(value)
}
