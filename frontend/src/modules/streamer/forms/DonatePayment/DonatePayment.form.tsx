import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { donatePaymentFormUseStyles } from 'src/modules/streamer/forms/DonatePayment/DonatePaymentForm.styles'
import {
  InputField,
  InputFieldVariant,
} from 'src/modules/shared/components/general/InputField/InputField'
import { PriceOptions } from 'src/modules/shared/constants/component.constants'
import { DropdownType } from 'src/modules/shared/components/general/Dropdown/Dropdown'
import { Currency } from 'src/modules/shared/types/response.types'
import { SetValueOptions } from 'src/modules/shared/constants/form.constants'
import { FieldWrapper } from 'src/modules/shared/forms/profile/create/CreateProfile.form'
import { Checkbox } from 'src/modules/shared/components/general/Checkbox/Checkbox'
import { publicPaymentSchema } from 'src/modules/streamer/forms/DonatePayment/DonatePaymentForm.schema'
import { useMutation } from 'react-query'
import { createDonation } from 'src/modules/streamer/services/donation.services'
import { FormLayout } from 'src/modules/shared/components/Layouts/FormLayout/FormLayout'
import { DonateCreate } from 'src/modules/streamer/types/donation.types'
import { useModal } from 'src/modules/shared/context/modal.context'
import { ErrorMessage } from 'src/modules/shared/constants/message.constants'
import { useLoader } from 'src/modules/shared/context/loader.context'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'

type DonatePaymentFormValues = Omit<DonateCreate, 'user_uuid'>

const defaultValues: DonatePaymentFormValues = {
  amount: '',
  currency: Currency.RUB,
  email: '',
  nickname: '',
  notes: '',
}

const separateNumber = (number: number) => number.toLocaleString('en-US')

const getPaymentPrice = ({
  isWithCommission,
  amount,
  isNumber,
  hasError,
}: {
  isWithCommission: boolean
  amount: number | string
  isNumber: boolean
  hasError?: boolean | string
}) => {
  const price = Number(amount)

  const priceWithCommission = Number(Math.floor((price * 9) / 100 + price))

  if (hasError) {
    return 0
  }

  if (isWithCommission)
    return isNumber ? priceWithCommission : separateNumber(priceWithCommission)

  return isNumber ? price : separateNumber(price)
}

export function DonatePaymentForm({
  receiverUuid,
  isModal = true,
}: {
  receiverUuid: string
  isModal?: boolean
}) {
  const [isChecked, setIsChecked] = useState(true)
  const styles = donatePaymentFormUseStyles({ isModal })
  const navigation = useNavigate()
  const { provideModalSettings } = useModal()
  const donationMutation = useMutation(createDonation, {
    onSuccess: (response) => {
      window.location.href = response.formUrl
      provideModalSettings({
        isVisible: false,
      })
    },
    onError: () => {
      provideModalSettings({ content: ErrorMessage.default() })
    },
  })

  const methods = useForm({
    defaultValues,
    mode: 'all',
    criteriaMode: 'all',
    resolver: yupResolver(publicPaymentSchema),
  })

  methods.watch()

  const onSubmit = (response: DonatePaymentFormValues) => {
    donationMutation.mutate({
      user_uuid: receiverUuid,
      ...response,
      amount: getPaymentPrice({
        isWithCommission: isChecked,
        amount: response.amount,
        isNumber: true,
        hasError: methods.formState.errors.amount?.message,
      }).toString(),
    })
  }
  const handleCurrency = (item: DropdownType) => {
    methods.setValue('currency', item.nameId as Currency, SetValueOptions)
  }

  const handleNotesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const result = value.length > 240 ? value.slice(0, 240) : value
    methods.setValue('notes', result)
  }

  const handleFormClose = () => {
    if (isModal) {
      provideModalSettings({
        isVisible: false,
      })
      return
    }
    navigation(-1)
  }

  const handleCheck = () => setIsChecked(!isChecked)

  const isSubmitActive = methods.formState.isDirty && methods.formState.isValid

  useLoader(donationMutation.isLoading)

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={styles.form}>
        <FormLayout
          handleClose={handleFormClose}
          submitText={'Продолжить'}
          isSubmitActive={isSubmitActive}
        >
          <div className={styles.formContentWrapper}>
            <div className={styles.header}>
              <span>Донат</span>
            </div>
            <div style={{ width: '100%' }}>
              <FieldWrapper>
                <div className={styles.priceWrapper}>
                  <div className={styles.amountWrapper}>
                    <InputField
                      value={methods.getValues('amount')}
                      isRequired
                      options={PriceOptions}
                      label={'Сумма'}
                      placeholder={'Сумма доната'}
                      errorMessage={methods.formState.errors.amount?.message}
                      handleOption={handleCurrency}
                      register={methods.register('amount')}
                    />
                  </div>

                  <InputField
                    label="Эл. почта"
                    placeholder={'Введите эл. почту'}
                    isRequired
                    value={methods.getValues('email')}
                    register={methods.register('email')}
                    errorMessage={methods.formState.errors.email?.message}
                  />
                </div>
              </FieldWrapper>

              <FieldWrapper>
                <InputField
                  isRequired
                  label="Никнейм"
                  placeholder={'Введите никнейм'}
                  value={methods.getValues('nickname')}
                  register={methods.register('nickname')}
                  errorMessage={methods.formState.errors.nickname?.message}
                />
              </FieldWrapper>

              <InputField
                variant={InputFieldVariant.Textarea}
                label="Добавить комментарий"
                placeholder={'Добавьте комментарий'}
                register={methods.register('notes', {
                  onChange: handleNotesChange,
                })}
                errorMessage={methods.formState.errors.notes?.message}
              />

              <div
                style={{
                  marginTop: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div className={styles.checkboxWrapper}>
                  <Checkbox
                    handleCheck={handleCheck}
                    isChecked={isChecked}
                    description={'Oплатить комиссию'}
                  />
                </div>
                {
                  <div className={styles.priceWithCommision}>
                    <span>
                      ₽{' '}
                      {getPaymentPrice({
                        isWithCommission: isChecked,
                        amount: methods.getValues('amount'),
                        isNumber: false,
                        hasError: methods.formState.errors.amount?.message,
                      })}
                    </span>
                  </div>
                }
              </div>
            </div>
          </div>
        </FormLayout>
      </form>
    </FormProvider>
  )
}
