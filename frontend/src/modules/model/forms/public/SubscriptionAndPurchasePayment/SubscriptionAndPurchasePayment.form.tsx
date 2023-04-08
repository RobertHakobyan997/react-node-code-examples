import { FormProvider, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'

import { FormLayout } from '../../../../shared/components/Layouts/FormLayout/FormLayout'
import { InputField } from '../../../../shared/components/general/InputField/InputField'

import { useMutation } from 'react-query'

import { useLoader } from 'src/modules/shared/context/loader.context'

import { subscriptionAndPurchasePaymentSchema } from 'src/modules/model/forms/public/SubscriptionAndPurchasePayment/SubscriptionAndPurchasePayment.schema'
import { subscriptionPaymentUseStyles } from 'src/modules/model/forms/public/SubscriptionAndPurchasePayment/SubscriptionAndPurchasePayment.styles'

import {
  PurchasePayment,
  SubscriptionPayment,
} from 'src/modules/streamer/types/publicModel.types'

import {
  payPurchasePlan,
  paySubscriptionPlan,
} from 'src/modules/model/services/publicModel.services'
import { PlanType } from 'src/modules/model/components/PublicPurchaseAndSubscriptionRenderer/PublicPurchaseAndSubscriptionRenderer'
import { SubscriptionPlan } from 'src/modules/model/types/subscription'
import { PurchasePlan } from 'src/modules/model/types/purchase'
import {
  CurrencyIconVariant,
  CurrencyRenderer,
} from 'src/modules/shared/components/CurrencyRenderer/CurrencyRenderer'
import { PhoneInputCustom } from 'src/modules/shared/components/general/PhoneInput/PhoneInputCustom'

import { useModal } from 'src/modules/shared/context/modal.context'

import { ErrorMessage } from 'src/modules/shared/constants/message.constants'
import { ImageLoader } from 'src/modules/shared/components/general/ImageLoader/ImageLoader'
import { numberWithCommas } from 'src/modules/shared/utils/string.utils'

interface PaymentFormProps {
  planContent: SubscriptionPlan | PurchasePlan
  planType: PlanType
}

export const PlanRendererInsideForm = ({
  planContent,
}: Omit<PaymentFormProps, 'planType'>) => {
  const styles = subscriptionPaymentUseStyles()

  return (
    <div className={styles.planWrapper}>
      <div>
        <p className={styles.planName}>{planContent.name}</p>
      </div>
      <div>
        <ImageLoader
          className={styles.image}
          width={200}
          height={150}
          src={planContent.photo as string}
          alt={planContent.description}
          style={{ borderRadius: '8px', objectFit: 'cover' }}
        />
      </div>
      <div className={styles.planContent}>
        <div>
          <CurrencyRenderer
            currency={planContent.currency}
            variant={CurrencyIconVariant.Small}
          />
          <span className={styles.price}>
            {numberWithCommas(planContent.price)}
          </span>
          <span className={styles.duration}>
            {'duration' in planContent
              ? `/ ${planContent.duration} Месяц`
              : '/ Бессрочная подписка'}
          </span>
        </div>

        <div className={styles.description}>
          <p>{planContent.description}</p>
        </div>
      </div>
    </div>
  )
}

const DefaultValues = {
  nickname: '',
  phone_number: '',
  email: '',
}

export const getContentByPlanType = ({
  planType,
  planId,
  dataToAdd = DefaultValues,
}: {
  dataToAdd?: typeof DefaultValues
  planType: PlanType
  planId: number
}) => {
  switch (planType) {
    case PlanType.Purchases:
      return {
        defaultValues: { ...dataToAdd, purchase_plan: planId },
        service: payPurchasePlan,
      }
    case PlanType.Subscriptions:
      return {
        defaultValues: { ...dataToAdd, subscription_plan: planId },
        service: paySubscriptionPlan,
      }
    default:
      return {
        defaultValues: { ...dataToAdd, subscription_plan: planId },
        service: paySubscriptionPlan,
      }
  }
}

export function SubscriptionAndPurchasePaymentForm({
  planContent,
  planType,
}: PaymentFormProps) {
  const { provideModalSettings } = useModal()
  const { defaultValues, service } = getContentByPlanType({
    planId: planContent.id,
    planType,
  })

  const styles = subscriptionPaymentUseStyles()
  const { mutate, isLoading } = useMutation(service as any, {
    onSuccess: (response: { formUrl: string; orderId: string }) => {
      window.location.href = response.formUrl
      provideModalSettings({
        isVisible: false,
      })
    },
    onError: () => {
      provideModalSettings({
        content: ErrorMessage.default(),
      })
    },
  })

  const methods = useForm<SubscriptionPayment | PurchasePayment>({
    defaultValues,
    mode: 'all',
    criteriaMode: 'all',
    resolver: yupResolver(subscriptionAndPurchasePaymentSchema),
  })

  const handleSubmit = (data: SubscriptionPayment | PurchasePayment) => {
    const { defaultValues } = getContentByPlanType({
      dataToAdd: data,
      planType,
      planId: planContent.id,
    })

    mutate(defaultValues as any)
  }

  useLoader(isLoading)

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleSubmit)}
        className={styles.formStyle}
      >
        <FormLayout
          isSubmitActive={
            methods.formState.isDirty && methods.formState.isValid
          }
          submitText="Продолжить"
        >
          {planType === 'Purchases' ? (
            <p className={styles.title}>Покупка</p>
          ) : (
            <p className={styles.title}>Покупка подписки</p>
          )}

          <div style={{ margin: '40px 0 20px', width: '100%' }}>
            <InputField
              isRequired
              label="Никнейм"
              placeholder="Введите никнейм"
              value={methods.getValues('nickname')}
              register={methods.register('nickname')}
              errorMessage={methods.formState.errors.nickname?.message}
            />
          </div>

          <div className={styles.fieldsCombiner}>
            <InputField
              isRequired
              value={methods.getValues('email')}
              label={'Эл. почта'}
              placeholder="Введите эл. почту"
              errorMessage={methods.formState.errors.email?.message}
              register={methods.register('email')}
            />

            <PhoneInputCustom
              label={'Номер телефона'}
              isRequired
              name={'phone_number'}
              value={methods.getValues('phone_number')}
            />
          </div>

          <PlanRendererInsideForm planContent={planContent} />
        </FormLayout>
      </form>
    </FormProvider>
  )
}
