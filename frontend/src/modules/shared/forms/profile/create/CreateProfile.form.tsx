import { profileFormUseStyles } from '../profileForm.styles'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Dropdown,
  DropdownType,
} from '../../../components/general/Dropdown/Dropdown'
import {
  UserRolePlaceholder,
  UserRoles,
} from '../../../constants/role.constants'
import Flex from '../../../components/general/Flex/Flex'
import { InputField } from '../../../components/general/InputField/InputField'

import { Button } from '../../../components/general/Button/Button'
import { ButtonVariants } from '../../../components/general/Button/Button.types'

import { useMutation } from 'react-query'
import { updateUserService } from '../../../services/auth.services'
import { useAuth } from '../../../context/auth.context'
import { User, UserProfileCreate } from '../../../types/user.types'
import { createProfileSchema } from '../../../schemas/createProfile.schema'
import { ComponentWithChildren } from '../../../types/component.types'
import { useModal } from '../../../context/modal.context'
import { useLoader } from '../../../context/loader.context'
import { errorHandler } from '../../../utils/error.utils'
import { ErrorResponse } from '../../../types/error.types'
import { makeFieldsValid } from '../../../utils/validation.utils'
import { AppThemeConstants } from '../../../constants/style.constants'

export const FieldWrapper = ({ children }: ComponentWithChildren) => {
  const styles = profileFormUseStyles()
  return <div className={styles.fieldWrapper}>{children}</div>
}

type FormFieldsType = Omit<UserProfileCreate, 'uuid' | 'is_active'>

type FormFieldsTypeNullable = Record<keyof FormFieldsType, string | null>

const formDefaultValues: FormFieldsTypeNullable = {
  name: '',
  role: '',
  cover_photo: '',
  profile_photo: '',
  referred_code: '',
}

const setValueOptions = {
  shouldValidate: true,
  shouldDirty: true,
}

export function CreateProfileForm() {
  const {
    header,
    createProfileWrapper,
    formContent,
    content,
    formStyle,
    submitWrapper,
  } = profileFormUseStyles()
  const { provideModalSettings } = useModal()
  const {
    userState: { user, uuid },
    updateUser,
  } = useAuth()

  const { mutate, isLoading } = useMutation(updateUserService, {
    onSuccess,
    onError,
  })

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { isValid, isDirty, errors },
  } = useForm<FormFieldsTypeNullable>({
    defaultValues: {
      ...formDefaultValues,
      name: user?.name ?? null,
      role: user?.role,
    },
    mode: 'all',
    criteriaMode: 'all',
    resolver: yupResolver(createProfileSchema),
  })

  const isButtonActive = isValid && isDirty

  const handleRole = (dropdownItem: DropdownType) => {
    setValue('role', dropdownItem.nameId, setValueOptions)
  }

  // const handleBackgroundUpload = (base64File: string | null) =>
  //   setValue('cover_photo', base64File, setValueOptions)
  //
  // const handleProfileUpload = (base64File: string | null) => {
  //   setValue('profile_photo', base64File, setValueOptions)
  // }

  const onSubmit = (data: FormFieldsTypeNullable) => {
    const validProfileData = makeFieldsValid({ uuid, ...data })

    mutate(validProfileData)
  }

  function onSuccess(user: User) {
    reset()
    updateUser({ user })
  }

  function onError(error: ErrorResponse) {
    provideModalSettings({ content: errorHandler(error) })
  }

  useLoader(isLoading)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={formStyle}>
      <Flex alignItems="center" justifyContent="center" className={formContent}>
        <Flex
          alignItems="flex-start"
          justifyContent="center"
          className={createProfileWrapper}
        >
          <div className={content}>
            <div className={header}>
              <span>Заполнение профиля</span>
            </div>

            <FieldWrapper>
              <Dropdown
                isRequired
                title="Тип Профиля"
                items={UserRoles}
                placeholder={UserRolePlaceholder}
                handleChange={handleRole}
              />
              <div style={{ marginTop: '0.25rem' }}>
                <p
                  style={{
                    color: AppThemeConstants.textDarker,
                    fontSize: '13px',
                  }}
                >
                  Выбранную роль нельзя изменить
                </p>
              </div>
            </FieldWrapper>

            <FieldWrapper>
              <InputField
                isRequired
                placeholder={'Введите ваше имя'}
                value={getValues('name')}
                errorMessage={errors.name?.message}
                label={'Имя'}
                register={register('name')}
              />
            </FieldWrapper>

            <FieldWrapper>
              <InputField
                placeholder={'Введите ваш реферальный код'}
                errorMessage={errors.referred_code?.message}
                label={'Реферальный код'}
                register={register('referred_code')}
              />
            </FieldWrapper>

            {/*<ImageUpload*/}
            {/*  handleDelete={() => {*/}
            {/*    setValue('cover_photo', null, setValueOptions)*/}
            {/*  }}*/}
            {/*  handleError={() => {*/}
            {/*    setValue(*/}
            {/*      'cover_photo',*/}
            {/*      formDefaultValues.cover_photo,*/}
            {/*      setValueOptions*/}
            {/*    )*/}
            {/*  }}*/}
            {/*  onChange={handleProfileUpload}*/}
            {/*  placeholder="File"*/}
            {/*  labelText={'Загрузить логотип'}*/}
            {/*  message={ProfileImageMessage.Profile}*/}
            {/*/>*/}

            {/*<ImageUpload*/}
            {/*  handleDelete={() => {*/}
            {/*    setValue('profile_photo', null, setValueOptions)*/}
            {/*  }}*/}
            {/*  handleError={() => {*/}
            {/*    setValue(*/}
            {/*      'profile_photo',*/}
            {/*      formDefaultValues.profile_photo,*/}
            {/*      setValueOptions*/}
            {/*    )*/}
            {/*  }}*/}
            {/*  onChange={handleBackgroundUpload}*/}
            {/*  placeholder="File"*/}
            {/*  labelText={'Загрузить обложку'}*/}
            {/*  message={ProfileImageMessage.Background}*/}
            {/*/>*/}

            <div className={submitWrapper}>
              <div>
                <Button
                  type={isButtonActive ? 'submit' : 'button'}
                  isButtonInteractive={isButtonActive}
                  variant={ButtonVariants.Primary}
                >
                  Продолжить
                </Button>
              </div>
            </div>
          </div>
        </Flex>
      </Flex>
    </form>
  )
}
