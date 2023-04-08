import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { subscriptionFormUseStyles } from './SubscriptionForm.styles'
import { InputField } from '../../../shared/components/general/InputField/InputField'

import { FormLayout } from '../../../shared/components/Layouts/FormLayout/FormLayout'
import { SubscriptionAndPurchaseCommon } from '../Common/Common.form'
import { DropdownType } from '../../../shared/components/general/Dropdown/Dropdown'

import { useMutation, useQueryClient } from 'react-query'
import {
  createSubscriptionPlan,
  editSubscriptionPlan,
} from 'src/modules/model/services/subscription.services'
import { createSubscriptionSchema } from 'src/modules/model/forms/CreateSubscription/SubscriptionForm.schema'
import {
  SubscriptionPlan,
  SubscriptionPlanCreate,
} from 'src/modules/model/types/subscription'
import { SetValueOptions } from 'src/modules/shared/constants/form.constants'
import { useLoader } from 'src/modules/shared/context/loader.context'
import { useModal } from 'src/modules/shared/context/modal.context'
import { ModelQueryKey } from 'src/modules/model/constants/queryKeys.constants'
import { ImageUploadStatus } from 'src/modules/shared/components/general/ImageUpload/ImageUpload'
import { getDirtyValues } from 'src/modules/shared/utils/validation.utils'

import { ModalVariant } from 'src/modules/shared/types/modal.types'
import { errorHandler } from 'src/modules/shared/utils/error.utils'
import { ErrorResponse } from 'src/modules/shared/types/error.types'
import { Currency } from 'src/modules/shared/types/response.types'
import { PriceOptions } from 'src/modules/shared/constants/component.constants'
import { fileToBase64 } from 'src/modules/shared/utils/file.utils'
import { removeIdField } from 'src/modules/shared/utils/object.utils'

const SubscriptionDurationOptions: DropdownType[] = [
  {
    id: 1,
    content: 'Месяц',
    nameId: 'month',
  },
]

const DefaultValues: SubscriptionPlanCreate = {
  name: '',
  description: '',
  photo: null,
  link: '',
  price: '',
  currency: Currency.RUB,
  duration: '',
}

function SubscriptionForm({
  onSubmit,
  isLoading,
  defaultValues,
}: {
  onSubmit: (data: any) => void
  isLoading: boolean
  defaultValues: SubscriptionPlanCreate
}) {
  const styles = subscriptionFormUseStyles()

  const methods = useForm({
    defaultValues,
    mode: 'all',
    criteriaMode: 'all',
    resolver: yupResolver(createSubscriptionSchema),
  })

  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors, dirtyFields, isDirty, isValid },
  } = methods

  const handleCurrency = (item: DropdownType) => {
    setValue('currency', item.nameId as Currency, SetValueOptions)
  }

  const handleInnerSubmit = async (data: typeof defaultValues) => {
    const photo =
      typeof data.photo === 'string'
        ? null
        : await fileToBase64(data.photo as File)

    onSubmit(
      getDirtyValues(
        { ...data, photo },
        {
          ...dirtyFields,
          currency: true,
          photo: Boolean(photo),
        }
      )
    )
  }

  useLoader(isLoading)

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(handleInnerSubmit)}
        className={styles.formStyle}
      >
        <FormLayout isSubmitActive={isDirty && isValid}>
          <SubscriptionAndPurchaseCommon
            descriptionData={{
              value: getValues('description'),
              register: register('description'),
              errorMessage: errors.description?.message,
            }}
            linkData={{
              value: getValues('link'),
              errorMessage: errors.link?.message,
              register: register('link'),
            }}
            imageData={
              defaultValues.photo
                ? {
                    name: defaultValues.photo as string,
                    isLink: true,
                    linkName: 'CreateSubscription photo',
                    status: ImageUploadStatus.Hidden,
                  }
                : null
            }
          >
            <div style={{ marginBottom: '40px', width: '100%' }}>
              <h1 className={styles.header}>Настроить подписку</h1>
            </div>

            <div style={{ width: '100%' }}>
              <InputField
                isRequired
                value={getValues('name')}
                errorMessage={errors.name?.message}
                label={'Название плана'}
                placeholder={'Введите название'}
                register={register('name')}
              />
            </div>
            <div className={styles.purchaseWrapper}>
              <InputField
                value={getValues('duration')}
                isRequired
                errorMessage={errors.duration?.message}
                label={'Продолжительность'}
                placeholder={'Укажите количество '}
                options={SubscriptionDurationOptions}
                register={register('duration', { valueAsNumber: true })}
              />

              <InputField
                value={getValues('price')}
                isRequired
                options={PriceOptions}
                label={'Стоимость'}
                placeholder={'Введите сумму'}
                errorMessage={errors.price?.message}
                handleOption={handleCurrency}
                register={register('price', { valueAsNumber: true })}
              />
            </div>
          </SubscriptionAndPurchaseCommon>
        </FormLayout>
      </form>
    </FormProvider>
  )
}

export function CreateSubscriptionForm() {
  const queryClient = useQueryClient()
  const { provideModalSettings } = useModal()
  const subscriptionPlanCreateMutation = useMutation(createSubscriptionPlan, {
    onSuccess: () => {
      provideModalSettings({
        isVisible: false,
      })

      queryClient.invalidateQueries({
        queryKey: ModelQueryKey.SubscriptionPlanList,
        exact: true,
      })
    },

    onError: (error: ErrorResponse) => {
      provideModalSettings({
        modalVariant: ModalVariant.Popup,
        content: errorHandler(error, 'Подписка'),
      })
    },
  })

  const onSubmit = (data: typeof DefaultValues) =>
    subscriptionPlanCreateMutation.mutate(data)

  useLoader(subscriptionPlanCreateMutation.isLoading)

  return (
    <SubscriptionForm
      onSubmit={onSubmit}
      isLoading={subscriptionPlanCreateMutation.isLoading}
      defaultValues={DefaultValues}
    />
  )
}

export function EditSubscriptionForm({
  subscription,
}: {
  subscription: SubscriptionPlan
}) {
  const queryClient = useQueryClient()
  const { provideModalSettings } = useModal()
  const subscriptionPlanEditMutation = useMutation(editSubscriptionPlan, {
    onSuccess: () => {
      provideModalSettings({
        isVisible: false,
      })
      queryClient.invalidateQueries({
        queryKey: ModelQueryKey.SubscriptionPlanList,
        exact: true,
      })
    },

    onError: (error: ErrorResponse) => {
      provideModalSettings({
        modalVariant: ModalVariant.Popup,
        content: errorHandler(error, 'Подписка'),
      })
    },
  })

  const onSubmit = (data: SubscriptionPlan) =>
    subscriptionPlanEditMutation.mutate({ ...data, id: subscription.id })

  return (
    <SubscriptionForm
      onSubmit={onSubmit}
      isLoading={subscriptionPlanEditMutation.isLoading}
      defaultValues={removeIdField(subscription)}
    />
  )
}
