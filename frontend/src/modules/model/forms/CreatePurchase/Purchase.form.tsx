import { FormProvider, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'

import { FormLayout } from '../../../shared/components/Layouts/FormLayout/FormLayout'
import { InputField } from '../../../shared/components/general/InputField/InputField'

import { SubscriptionAndPurchaseCommon } from '../Common/Common.form'

import { Currency } from 'src/modules/shared/types/response.types'
import { createPaymentSchema } from 'src/modules/model/forms/CreatePurchase/PurchaseForm.schema'

import {
  PurchasePlan,
  PurchasePlanCreate,
} from 'src/modules/model/types/purchase'
import { ImageUploadStatus } from 'src/modules/shared/components/general/ImageUpload/ImageUpload'
import { SetValueOptions } from 'src/modules/shared/constants/form.constants'
import { getDirtyValues } from 'src/modules/shared/utils/validation.utils'
import { useMutation, useQueryClient } from 'react-query'
import { useModal } from 'src/modules/shared/context/modal.context'
import { ModelQueryKey } from 'src/modules/model/constants/queryKeys.constants'
import { ErrorResponse } from 'src/modules/shared/types/error.types'
import { ModalVariant } from 'src/modules/shared/types/modal.types'
import { errorHandler } from 'src/modules/shared/utils/error.utils'
import { SubscriptionPlan } from 'src/modules/model/types/subscription'
import {
  createPurchasePlan,
  editPurchasePlan,
} from 'src/modules/model/services/purchase.services'
import { useLoader } from 'src/modules/shared/context/loader.context'
import { DropdownType } from 'src/modules/shared/components/general/Dropdown/Dropdown'
import { PriceOptions } from 'src/modules/shared/constants/component.constants'
import { purchaseFormUseStyles } from 'src/modules/model/forms/CreatePurchase/PurchaseForm.styles'
import { fileToBase64 } from 'src/modules/shared/utils/file.utils'
import { removeIdField } from 'src/modules/shared/utils/object.utils'

const DefaultValues: PurchasePlanCreate = {
  name: '',
  description: '',
  photo: null,
  link: '',
  price: '',
  currency: Currency.RUB,
}

export function PurchaseForm({
  onSubmit,
  isLoading,
  defaultValues,
}: {
  onSubmit: (data: any) => void
  isLoading: boolean
  defaultValues: PurchasePlanCreate
}) {
  const styles = purchaseFormUseStyles()

  const methods = useForm({
    defaultValues: defaultValues,
    mode: 'all',
    criteriaMode: 'all',
    resolver: yupResolver(createPaymentSchema),
  })

  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors, dirtyFields, isDirty, isValid },
  } = methods

  const handleInnerSubmit = async (data: typeof defaultValues) => {
    const photo =
      typeof data.photo === 'string'
        ? null
        : await fileToBase64(data.photo as File)

    onSubmit(
      getDirtyValues(
        { ...data, photo },
        { ...dirtyFields, currency: true, photo: Boolean(photo) }
      )
    )
  }
  const handleCurrency = (item: DropdownType) => {
    setValue('currency', item.nameId as Currency, SetValueOptions)
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
                    linkName: 'DonatePayment photo',
                    status: ImageUploadStatus.Hidden,
                  }
                : null
            }
          >
            <div style={{ marginBottom: '40px', width: '100%' }}>
              <h1 className={styles.header}>Настроить покупку</h1>
            </div>

            <div className={styles.purchaseWrapperPayment}>
              <InputField
                isRequired
                value={getValues('name')}
                label={'Название плана'}
                placeholder={'Введите название'}
                errorMessage={errors.name?.message}
                register={register('name')}
              />

              <InputField
                isRequired
                value={getValues('price')}
                label={'Стоимость'}
                placeholder={'Введите сумму'}
                register={register('price', { valueAsNumber: true })}
                errorMessage={errors.price?.message}
                handleOption={handleCurrency}
                options={PriceOptions}
              />
            </div>
          </SubscriptionAndPurchaseCommon>
        </FormLayout>
      </form>
    </FormProvider>
  )
}

export function CreatePurchaseForm() {
  const queryClient = useQueryClient()
  const { provideModalSettings } = useModal()

  const purchasesPlanCreateMutation = useMutation(createPurchasePlan, {
    onSuccess: () => {
      provideModalSettings({
        isVisible: false,
      })

      queryClient.invalidateQueries({
        queryKey: ModelQueryKey.PurchasePlanList,
        exact: true,
      })
    },

    onError: (error: ErrorResponse) => {
      provideModalSettings({
        modalVariant: ModalVariant.Popup,
        content: errorHandler(error, 'Покупка'),
      })
    },
  })

  const onSubmit = (data: typeof DefaultValues) =>
    purchasesPlanCreateMutation.mutate(data)

  return (
    <PurchaseForm
      onSubmit={onSubmit}
      isLoading={purchasesPlanCreateMutation.isLoading}
      defaultValues={DefaultValues}
    />
  )
}

export function EditPurchaseForm({ purchase }: { purchase: PurchasePlan }) {
  const queryClient = useQueryClient()

  const { provideModalSettings } = useModal()
  const purchasePlanEditMutation = useMutation(editPurchasePlan, {
    onSuccess: () => {
      provideModalSettings({
        isVisible: false,
      })

      queryClient.invalidateQueries({
        queryKey: ModelQueryKey.PurchasePlanList,
        exact: true,
      })
    },

    onError: (error: ErrorResponse) => {
      provideModalSettings({
        modalVariant: ModalVariant.Popup,
        content: errorHandler(error, 'Покупка'),
      })
    },
  })

  const onSubmit = (data: SubscriptionPlan) =>
    purchasePlanEditMutation.mutate({ ...data, id: purchase.id })

  return (
    <PurchaseForm
      onSubmit={onSubmit}
      isLoading={purchasePlanEditMutation.isLoading}
      defaultValues={removeIdField(purchase)}
    />
  )
}
