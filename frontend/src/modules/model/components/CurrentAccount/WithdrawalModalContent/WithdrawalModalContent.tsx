import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { InputField } from 'src/modules/shared/components/general/InputField/InputField'
import { FormLayout } from 'src/modules/shared/components/Layouts/FormLayout/FormLayout'
import {
  creditCardNameValidator,
  creditCardNumberValidator,
} from 'src/modules/shared/utils/creditCardValidation.utils'
import { withdrawalModalContentSchema } from './WithdrawalModalContent.schema'
import { withdrawalModalContentUseStyles } from './WithdrawalModalContent.styles'

import { profileFormUseStyles } from 'src/modules/shared/forms/profile/profileForm.styles'
import Flex from 'src/modules/shared/components/general/Flex/Flex'
import { Dropdown } from 'src/modules/shared/components/general/Dropdown/Dropdown'
import { InfoIcon } from '../../../../shared/components/Icons/Info.icon'
import {
  CreditCardIcons,
  PriceOptions,
} from 'src/modules/shared/constants/component.constants'

import React, { ChangeEvent, useState } from 'react'
import { CreditCardType } from 'credit-card-type/src/types'

import { useMutation, useQueryClient } from 'react-query'
import { withdrawalRequest } from 'src/modules/shared/services/withdrawal.services'
import { useModal } from 'src/modules/shared/context/modal.context'
import { useLoader } from 'src/modules/shared/context/loader.context'
import { EmptyCreditCardIcon } from 'src/modules/shared/components/Icons/CreditCard.icon'
import { SetValueOptions } from 'src/modules/shared/constants/form.constants'
import { SuccessModal } from 'src/modules/shared/components/Modals/Success/SuccessModal'
import { errorHandler } from 'src/modules/shared/utils/error.utils'

import { useAuth } from 'src/modules/shared/context/auth.context'
import { ModalVariant } from 'src/modules/shared/types/modal.types'
import { ModelQueryKey } from 'src/modules/model/constants/queryKeys.constants'

interface WithDrawalTypes {
  amount: number | string
  method: string
  card: number | string
  full_name: string
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

const WithDrawalModalContent = () => {
  const [cardData, setCardData] = useState<null | CreditCardType>()
  const [priceWithCommision, setPriceWithCommision] = useState('0')
  const { provideModalSettings } = useModal()
  const {
    userState: { user },
    fetchUserData,
  } = useAuth()

  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isDirty, isValid },
  } = useForm<WithDrawalTypes>({
    defaultValues: {
      amount: '',
      card: '',
      full_name: '',
    },
    mode: 'all',
    criteriaMode: 'all',
    resolver: yupResolver(withdrawalModalContentSchema),
    context: { userBalance: user?.balance ?? 0 },
  })

  const getAmountWithCommissions = (amount: string, isNumber: boolean) => {
    const price = Number(amount)
    const priceWithCommission = Math.floor(price - (price * 9) / 100)

    const resultPrice = isNumber
      ? priceWithCommission
      : priceWithCommission.toLocaleString('en-US')

    setPriceWithCommision(priceWithCommission.toLocaleString('en-US'))

    return resultPrice
  }

  const handleCardNumbers = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, cardData } = creditCardNumberValidator({
      value: e.target.value,
    })

    setCardData(cardData ?? null)
    setValue('card', value, SetValueOptions)
  }

  const styles = withdrawalModalContentUseStyles()
  const { formStyle } = profileFormUseStyles()
  const creditCardIcon = getCreditCardComponent(cardData)

  const handleCreditCardName = (e: ChangeEvent<HTMLInputElement>) =>
    setValue('full_name', creditCardNameValidator(e.target.value))

  const { mutate, isLoading } = useMutation(withdrawalRequest, {
    onSuccess: () => {
      fetchUserData()
      queryClient.invalidateQueries(ModelQueryKey.PaymentTransactions, {
        exact: false,
      })

      provideModalSettings({
        modalVariant: ModalVariant.Modal,
        content: <SuccessModal message={'Вывод средств прошел успешно'} />,
      })
    },
    onError: (error: any) => {
      const errorMessage = errorHandler(error?.amount)
      provideModalSettings({
        content: errorMessage,
      })
    },
  })

  const onSubmit = (data: any) => {
    mutate({
      ...data,
      card: data.card.replace(/\s/g, ''),
    })
  }

  useLoader(isLoading)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={formStyle}>
      <FormLayout
        isSubmitActive={isDirty && isValid}
        submitText={'Подтвердить'}
        toLeft
      >
        <h1 className={styles.title}>Вывод средств</h1>
        <Flex
          style={{ width: '100%' }}
          justifyContent="space-between"
          flexWrap="wrap"
          alignItems="center"
        >
          <div className={styles.inputWrapper}>
            <InputField
              className={styles.input}
              isRequired
              value={getValues('amount') as string}
              label={'Сумма запроса'}
              errorMessage={errors.amount?.message}
              errorStyles={{ position: 'absolute' }}
              register={register('amount', {
                onChange: (event) => {
                  getAmountWithCommissions(event.target.value, false)
                },

                valueAsNumber: true,
              })}
              options={PriceOptions}
              placeholder={'Введите сумму'}
            />
          </div>

          <div className={styles.inputWrapper}>
            <Dropdown
              style={{ height: '40px' }}
              title="Метод вывода"
              defaultValue={{
                id: 0,
                nameId: 'bankCard',
                content: 'Банковская карта',
              }}
              items={[
                {
                  id: 0,
                  nameId: 'bankCard',
                  content: 'Банковская карта',
                },
              ]}
              placeholder={{
                content: 'Метод вывода',
                id: 1,
                nameId: 'methods',
              }}
            />
            <div style={{ marginTop: '0.25rem' }} />
          </div>

          <div
            className={styles.inputWrapper}
            style={{
              position: 'relative',
            }}
          >
            <div className={styles.cardIconLogo}>{creditCardIcon}</div>
            <InputField
              style={{ height: '40px' }}
              className={styles.input}
              isErrorIconVisible={false}
              isRequired
              value={getValues('card') as string}
              label={'Номер карты'}
              errorMessage={errors.card?.message}
              placeholder={'XXXX XXXX XXXX XXXX'}
              errorStyles={{ position: 'absolute' }}
              register={register('card', {
                onChange: handleCardNumbers,
              })}
            />
          </div>

          <div className={styles.inputWrapper}>
            <InputField
              className={styles.input}
              isRequired
              value={getValues('full_name') as string}
              label={'Имя и фамилия на карте'}
              placeholder={'Введите имя и фамилию'}
              errorMessage={errors.full_name?.message}
              register={register('full_name', {
                onChange: handleCreditCardName,
              })}
              errorStyles={{ position: 'absolute' }}
            />
          </div>
        </Flex>
        <hr color="#38425C" style={{ width: '100%' }} />

        <Flex
          alignItems="center"
          justifyContent="space-between"
          style={{ width: '100%', marginTop: '20px' }}
        >
          <div>
            <h2 className={styles.subTitle}>Сумма к получению</h2>
            <div className={styles.description}>
              <div
                style={{
                  marginRight: '8px',
                  display: 'inline-block',
                  lineHeight: '17px',
                }}
              >
                <InfoIcon />
              </div>
              С учетом комиссии в 9%
            </div>
          </div>
          <div className={styles.amount}>
            ₽ {!errors.amount?.message ? priceWithCommision : 0}
          </div>
        </Flex>
      </FormLayout>
    </form>
  )
}

export default WithDrawalModalContent
