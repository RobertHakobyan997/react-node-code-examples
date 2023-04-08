import { creditCardUseStyles } from 'src/modules/shared/components/CreditCardField/CreditCardField.styles'
import {
  InputField,
  RequiredIndicator,
} from 'src/modules/shared/components/general/InputField/InputField'
import {
  AppThemeConstants,
  BreakPointSize,
} from 'src/modules/shared/constants/style.constants'
import Flex from 'src/modules/shared/components/general/Flex/Flex'
import React, { useState } from 'react'

import { CreditCardIcons } from 'src/modules/shared/constants/component.constants'
import { FieldPath, useFormContext } from 'react-hook-form'

import {
  creditCardCvvValidator,
  creditCardMonthValidator,
  creditCardMonthValidatorOnblur,
  creditCardNameValidator,
  creditCardNumberValidator,
  creditCardYearValidator,
} from 'src/modules/shared/utils/creditCardValidation.utils'

import { EmptyCreditCardIcon } from 'src/modules/shared/components/Icons/CreditCard.icon'
import { CreditCardType } from 'credit-card-type/src/types'
import { useWindowSize } from 'src/modules/shared/hooks/useWindowSize'

const cardInputStyle = {
  background: AppThemeConstants.modalBackground,
  paddingRight: 0,
  paddingLeft: '8px',
  borderWidth: '0.5px',
  fontSize: '0.75rem',
}

export const getCreditCardComponent = (cardData?: CreditCardType | null) => {
  if (cardData === null) {
    return <EmptyCreditCardIcon />
  }

  if (!cardData) {
    return false
  }

  return (
    CreditCardIcons.find((item) => item.nameId === cardData.type)?.content ??
    CreditCardIcons[0].content
  )
}

interface CreditCardFieldType {
  credit_card: {
    name: string
    number: string
    code: string
    expiry_year: string
    expiry_month: string
  }
}

const CreditCardFieldName: {
  [key: string]: FieldPath<CreditCardFieldType>
} = {
  Numbers: 'credit_card.number',
  Name: 'credit_card.name',
  Code: 'credit_card.code',
  ExpiryYear: 'credit_card.expiry_year',
  ExpiryMonth: 'credit_card.expiry_month',
}

export function CreditCardField() {
  const styles = creditCardUseStyles()
  const { width } = useWindowSize()
  const [cardData, setCardData] = useState<null | CreditCardType>()
  const creditCardIcon = getCreditCardComponent(cardData)
  const {
    register,
    setValue,
    watch,
    formState: { errors },
    getValues,
  } = useFormContext<CreditCardFieldType>()

  const isFieldsValid = watch(Object.values(CreditCardFieldName)).every(
    (item) => Boolean(item)
  )

  const handleCardNumbers = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, cardData } = creditCardNumberValidator({
      value: String(e.target.value).trim(),
    })

    setCardData(cardData ?? null)
    setValue(CreditCardFieldName.Numbers, value)
  }

  const handleCreditCardName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(CreditCardFieldName.Name, creditCardNameValidator(e.target.value))

  const handleCreditCardMonth = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(
      CreditCardFieldName.ExpiryMonth,
      creditCardMonthValidator(e.target.value)
    )

  const handleCreditCardMonthOnBlur = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue(
      CreditCardFieldName.ExpiryMonth,
      creditCardMonthValidatorOnblur(e.target.value)
    )
  }

  const handleCreditCardYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(
      CreditCardFieldName.ExpiryYear,
      creditCardYearValidator(e.target.value).value
    )
  }

  const handleCreditCardCvv = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    const codeSize = (cardData && cardData.code.size) ?? 3
    setValue(CreditCardFieldName.Code, creditCardCvvValidator(value, codeSize))
  }

  const handleCreditCardCvvBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { value } = e.target
    const cvvSize = (cardData && cardData.code.size) ?? 3

    if (value.length < cvvSize && value.length === 3) {
      setValue(CreditCardFieldName.Code, `${value}0`)
    }
  }

  if (width <= BreakPointSize.Laptop) {
    return (
      <div className={styles.cardWrapperResponsive}>
        <Flex
          alignItems="flex-start"
          direction="column"
          className={styles.cardLogoWrapperResponsive}
        >
          <p className={styles.responsiveHeaderText}>Способ оплаты</p>
          <div className={styles.cardIconLogoResponsive}>{creditCardIcon}</div>
        </Flex>

        <div style={{ marginBottom: '32px', width: '100%' }}>
          <InputField
            className={styles.input}
            isRequired
            value={getValues(CreditCardFieldName.Numbers) as string}
            label={'Номер карты'}
            errorMessage={errors.credit_card?.number?.message}
            register={register(CreditCardFieldName.Numbers, {
              onChange: handleCardNumbers,
            })}
          />
        </div>

        <div style={{ marginBottom: '32px' }}>
          <InputField
            isRequired
            value={getValues(CreditCardFieldName.Name) as string}
            className={styles.input}
            label={'Имя и фамилия на карте'}
            errorMessage={errors.credit_card?.name?.message}
            register={register(CreditCardFieldName.Name, {
              onChange: handleCreditCardName,
            })}
          />
        </div>

        <p className={styles.durationTitleResponsive}>
          Срок действия{' '}
          <RequiredIndicator
            isEmpty={
              !(
                (getValues(CreditCardFieldName.ExpiryMonth) as string).length &&
                (getValues(CreditCardFieldName.ExpiryYear) as string).length
              )
            }
          />
        </p>
        <Flex
          alignItems="center"
          justifyContent="flex-start"
          style={{ marginBottom: '32px', width: '100%', gap: '0 20px' }}
        >
          <div style={{ maxWidth: '120px', width: '100%' }}>
            <InputField
              className={styles.input}
              isRequired
              placeholder={'ММ'}
              value={getValues(CreditCardFieldName.ExpiryMonth) as string}
              placeHolderStyles={{ fontSize: '14px', lineHeight: '17px' }}
              errorMessage={errors.credit_card?.expiry_month?.message && ' '}
              register={register(CreditCardFieldName.ExpiryMonth, {
                onChange: handleCreditCardMonth,
                onBlur: handleCreditCardMonthOnBlur,
              })}
            />
          </div>

          <div>
            <span className={styles.dateSeparator}>/</span>
          </div>

          <div style={{ maxWidth: '120px', width: '100%' }}>
            <InputField
              isRequired
              placeholder={'ГГ'}
              value={getValues(CreditCardFieldName.ExpiryYear) as string}
              className={styles.input}
              placeHolderStyles={{ fontSize: '14px', lineHeight: '17px' }}
              errorMessage={errors.credit_card?.expiry_year?.message && ' '}
              register={register(CreditCardFieldName.ExpiryYear, {
                onChange: handleCreditCardYear,
              })}
            />
          </div>
        </Flex>
        <div style={{ maxWidth: '120px', width: '100%' }}>
          <InputField
            isActive={Boolean(
              watch(CreditCardFieldName.Numbers) && !errors.credit_card?.number
            )}
            value={getValues(CreditCardFieldName.Code) as string}
            isRequired
            className={styles.input}
            label={'CVV/CVC код'}
            errorMessage={errors.credit_card?.code?.message}
            register={register(CreditCardFieldName.Code, {
              onChange: handleCreditCardCvv,
              onBlur: handleCreditCardCvvBlur,
            })}
          />
        </div>
      </div>
    )
  }

  return (
    <div className={styles.cardWrapper}>
      <p className={styles.responsiveHeaderText}>
        Способ оплаты <RequiredIndicator isEmpty={!isFieldsValid} />
      </p>

      <div className={styles.card}>
        <div className={styles.cardIconLogo}>{creditCardIcon}</div>
        <div className={styles.frontCardContent}>
          <InputField
            style={cardInputStyle}
            value={getValues(CreditCardFieldName.Numbers) as string}
            label={'Номер карты'}
            className={styles.input}
            errorMessage={errors.credit_card?.number?.message}
            register={register(CreditCardFieldName.Numbers, {
              onChange: handleCardNumbers,
            })}
          />

          <div className={styles.frontCardContentBottom}>
            <div style={{ maxWidth: '200px', width: '100%' }}>
              <InputField
                style={cardInputStyle}
                className={styles.input}
                label={'Имя и фамилия на карте'}
                errorMessage={errors.credit_card?.name?.message}
                register={register(CreditCardFieldName.Name, {
                  onChange: handleCreditCardName,
                })}
              />
            </div>

            <div style={{ marginLeft: '20px' }}>
              <p className={styles.durationTitle}>Срок действия</p>

              <Flex alignItems="center">
                <div style={{ maxWidth: '60px' }}>
                  <InputField
                    placeholder={'ММ'}
                    className={styles.input}
                    placeHolderStyles={{ fontSize: '12px' }}
                    style={cardInputStyle}
                    errorMessage={
                      errors.credit_card?.expiry_month?.message && ' '
                    }
                    register={register(CreditCardFieldName.ExpiryMonth, {
                      onChange: handleCreditCardMonth,
                      onBlur: handleCreditCardMonthOnBlur,
                    })}
                  />
                </div>

                <div className={styles.separator}>/</div>

                <div style={{ maxWidth: '60px' }}>
                  <InputField
                    placeholder={'ГГ'}
                    className={styles.input}
                    placeHolderStyles={{ fontSize: '12px' }}
                    errorMessage={
                      errors.credit_card?.expiry_year?.message && ' '
                    }
                    style={cardInputStyle}
                    register={register(CreditCardFieldName.ExpiryYear, {
                      onChange: handleCreditCardYear,
                    })}
                  />
                </div>
              </Flex>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.cardBack}>
        <div className={styles.cvv}>
          <InputField
            style={cardInputStyle}
            className={styles.input}
            label={'CVV/CVC код'}
            isActive={Boolean(
              watch(CreditCardFieldName.Numbers) && !errors.credit_card?.number
            )}
            errorMessage={errors.credit_card?.code?.message}
            register={register(CreditCardFieldName.Code, {
              onChange: handleCreditCardCvv,
              onBlur: handleCreditCardCvvBlur,
            })}
          />
        </div>
      </div>
    </div>
  )
}
