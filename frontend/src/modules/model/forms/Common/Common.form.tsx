import ImageUpload, {
  ImageUploadState,
} from '../../../shared/components/general/ImageUpload/ImageUpload'
import { ProfileImageMessage } from '../../../shared/constants/message.constants'
import {
  InputField,
  InputFieldVariant,
} from '../../../shared/components/general/InputField/InputField'
import { ComponentWithChildren } from '../../../shared/types/component.types'

interface SubscriptionAndPurchaseCommonProps extends ComponentWithChildren {
  descriptionData: {
    register: any
    value: string | null
    errorMessage?: string
  }

  imageData?: ImageUploadState | null
  linkData: {
    register: any
    value: string | null
    errorMessage?: string
  }
}

export function SubscriptionAndPurchaseCommon({
  children,
  descriptionData,
  imageData,
  linkData,
}: SubscriptionAndPurchaseCommonProps) {
  return (
    <>
      {children}
      <div style={{ width: '100%', marginBottom: '32px' }}>
        <ImageUpload
          isRequired
          fieldName={'photo'}
          defaultImage={imageData}
          labelText={'Загрузить логотип'}
          message={ProfileImageMessage.PaymentFormImage}
        />
      </div>

      <div style={{ width: '100%', marginBottom: '32px' }}>
        <InputField
          variant={InputFieldVariant.Textarea}
          label={'Описание'}
          placeholder={'Добавьте описание'}
          isRequired
          register={descriptionData.register}
          errorMessage={descriptionData.errorMessage}
          value={descriptionData.value}
        />
      </div>

      <div style={{ width: '100%' }}>
        <InputField
          label={'Cсылка'}
          placeholder={'Добавьте ссылку'}
          isRequired
          errorMessage={linkData.errorMessage}
          register={linkData.register}
          value={linkData.value}
        />
      </div>
    </>
  )
}
