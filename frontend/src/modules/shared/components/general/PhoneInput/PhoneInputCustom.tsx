import { useFormContext } from 'react-hook-form'

import { InputField } from 'src/modules/shared/components/general/InputField/InputField'
import { CountryCodes } from 'src/modules/shared/constants/countryCode.constants'
import React, { useLayoutEffect, useState } from 'react'
import { DropdownType } from 'src/modules/shared/components/general/Dropdown/Dropdown'
import { getCountryCallingCode, parsePhoneNumber } from 'libphonenumber-js'
import { SetValueOptions } from 'src/modules/shared/constants/form.constants'
import { phoneNumberValidationOnChange } from 'src/modules/shared/utils/validation.utils'
import { CountryCode } from 'libphonenumber-js/custom'
import { phoneInputStyles } from 'src/modules/shared/components/general/PhoneInput/PhoneInput.styles'

interface PhoneInputProps {
  name: string
  label: string
  isRequired: boolean
  value: string
}

const defaultCountry = CountryCodes.find((item) => item.nameId === 'RU')

export function PhoneInputCustom({
  name,
  label,

  value,
}: PhoneInputProps) {
  const styles = phoneInputStyles()
  const [countryData, setCountryData] = useState<DropdownType>(
    defaultCountry as DropdownType
  )
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext()

  const handleChange = (e: any) => {
    const validNumber = phoneNumberValidationOnChange(
      e.target.value,
      countryData
    )

    setValue(name, validNumber, SetValueOptions)
  }

  const handleBlurPhoneInput = (e: any) => {
    const phoneNumber = parsePhoneNumber(e.target.value)
    const formatted = phoneNumber.format('INTERNATIONAL')
    setValue(name, formatted, SetValueOptions)
  }

  const handleOption = (item: DropdownType) => {
    const countryCallingCode = getCountryCallingCode(item.nameId as CountryCode)
    setCountryData(item)

    setValue(name, `+${countryCallingCode}`)
  }

  useLayoutEffect(() => {
    const countryCallingCode = getCountryCallingCode(
      defaultCountry?.nameId as CountryCode
    )

    setValue(name, `+${countryCallingCode}`)
  }, [])

  return (
    <InputField
      value={value}
      label={label}
      errorMessage={errors[name]?.message as string}
      handleOption={handleOption}
      optionsClassName={styles.PhoneInputOptionsWrapper}
      options={CountryCodes}
      defaultOption={countryData}
      register={register(name, {
        onBlur: handleBlurPhoneInput,
        onChange: handleChange,
      })}
    />
  )
}
