import { editProfilePersonalInfoUseStyles } from './EditProfilePersonalInfo.styles'
import {
  InputField,
  InputFieldVariant,
} from 'src/modules/shared/components/general/InputField/InputField'
import { FormProvider, useForm } from 'react-hook-form'
import ImageUpload, {
  ImageUploadStatus,
} from '../../../shared/components/general/ImageUpload/ImageUpload'
import { Button } from 'src/modules/shared/components/general/Button/Button'
import { ButtonVariants } from 'src/modules/shared/components/general/Button/Button.types'
import { yupResolver } from '@hookform/resolvers/yup'
import { editProfileSchema } from './EditProfile.schema'
import { useAuth } from 'src/modules/shared/context/auth.context'
import { updateUserService } from 'src/modules/shared/services/auth.services'
import { useMutation, useQueryClient } from 'react-query'
import { useModal } from 'src/modules/shared/context/modal.context'
import { useNavigate } from 'react-router-dom'
import { useLoader } from 'src/modules/shared/context/loader.context'
import {
  ErrorMessage,
  ProfileImageMessage,
} from 'src/modules/shared/constants/message.constants'
import {
  ModalVariant,
  PopupVariant,
} from 'src/modules/shared/types/modal.types'
import { FormLayout } from 'src/modules/shared/components/Layouts/FormLayout/FormLayout'
import { SharedQueryKey } from 'src/modules/shared/constants/sharedQuery.constants'
import { DeactivateAccountModal } from 'src/modules/shared/components/Modals/DeactivateAccount/DeactivateAccount.modal'
import { deleteStorageData } from 'src/modules/shared/utils/localStorage.utils'
import { LocalStorage } from 'src/modules/shared/constants/localStorage.constants'
import { SetValueOptions } from 'src/modules/shared/constants/form.constants'
import { getFaviconOfUrl } from 'src/modules/shared/utils/icon.utils'
import { makeFieldsValid } from 'src/modules/shared/utils/validation.utils'
import React, { useEffect, useState } from 'react'
import { fileToBase64 } from 'src/modules/shared/utils/file.utils'
import { ImageLoader } from 'src/modules/shared/components/general/ImageLoader/ImageLoader'
import profileEmptyImage from 'src/assets/images/emptyProfilePic.svg'
import { UploadIcon } from 'src/modules/shared/components/Icons/Upload.icon'
import Flex from 'src/modules/shared/components/general/Flex/Flex'
import { FileUpload } from 'src/modules/shared/components/general/FileUpload/FileUpload'
import EditPhoto from 'src/modules/model/components/EditPhoto/EditPhoto'

interface PublicPersonalInfo {
  name: string
  cover_photo: string
  profile_photo: string
  video_link: string
  social_links: string[]
  description: string
}

type PublicPersonalInfoNullable = Omit<
  Record<keyof PublicPersonalInfo, string | null>,
  'social_links'
> & {
  social_links: string[] | null
  cover_photo: string | null | File
  profile_photo: string | null | File
}

const EditProfilePersonalInfo = ({ uuid }: { uuid: string | null }) => {
  const navigate = useNavigate()
  const [uploadedImage, setUploadedImage] = useState<null | string>(null)
  const { provideModalSettings } = useModal()
  const {
    userState: { user },
    updateUser,
  } = useAuth()
  const styles = editProfilePersonalInfoUseStyles()
  const queryClient = useQueryClient()

  const methods = useForm<PublicPersonalInfoNullable>({
    defaultValues: {
      name: user?.name ?? '',
      video_link: user?.video_link ?? '',
      social_links: user?.social_links.length ? user.social_links : null,
      description: user?.description ?? '',
      cover_photo: '',
      profile_photo: '',
    },

    mode: 'all',
    criteriaMode: 'all',
    resolver: yupResolver(editProfileSchema),
  })

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors, isDirty, isValid },
  } = methods

  watch()
  const socialLinks = watch('social_links')

  const { mutate, isLoading } = useMutation(updateUserService, {
    onSuccess: (user) => {
      updateUser({ user })
      queryClient.invalidateQueries(SharedQueryKey.PublicUser, { exact: false })
      if (!user.is_active) {
        deleteStorageData(LocalStorage.a)
        deleteStorageData(LocalStorage.r)
        navigate('/login')
      }

      provideModalSettings({
        isVisible: false,
      })
    },

    onError: () => {
      provideModalSettings({
        content: ErrorMessage.default(),
        modalVariant: ModalVariant.Popup,
      })
    },
  })

  const onSubmit = async (data: PublicPersonalInfoNullable) => {
    if (data.social_links) {
      data.social_links = data.social_links.filter((item: String) => item)
    } else {
      data.social_links = []
    }

    if (uuid) {
      const validProfileData = makeFieldsValid({ uuid, ...data })

      if (!data.description) validProfileData.description = ''
      if (!data.video_link) validProfileData.video_link = ''
      if (validProfileData.cover_photo)
        validProfileData.cover_photo = await fileToBase64(
          validProfileData.cover_photo as File
        )
      if (validProfileData.profile_photo)
        validProfileData.profile_photo = await fileToBase64(
          validProfileData.profile_photo as File
        )

      mutate(validProfileData)
    }
  }

  const handleDeactivateAccount = () => {
    if (uuid) mutate({ uuid, is_active: false })
  }

  const openDeactivateModal = () =>
    provideModalSettings({
      modalVariant: ModalVariant.Modal,
      content: <DeactivateAccountModal onSuccess={handleDeactivateAccount} />,
    })

  const deleteSocialLinkField = (fieldIndex: number) => () => {
    const updatedSocialLinks = socialLinks?.filter(
      (item, index) => index !== fieldIndex
    )

    if (!updatedSocialLinks?.length) {
      setValue('social_links', null, SetValueOptions)
      return
    }
    setValue('social_links', updatedSocialLinks ?? null, SetValueOptions)
  }

  const addSocialLinkField = () => {
    let values = socialLinks ? [...socialLinks, ''] : ['']
    setValue('social_links', values)
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const result = value.length > 300 ? value.slice(0, 300) : value
    setValue('description', result)
  }

  const handleProfileError = (error: string | boolean | null) => {
    const message = typeof error === 'string' ? error : null
    if (message)
      provideModalSettings({
        modalVariant: ModalVariant.Popup,
        popupVariant: PopupVariant.Error,
        content: message,
      })
  }

  const handleEditProfilePicture = (base64: string | null) => {
    if (base64) {
      setUploadedImage(base64)
    }
  }

  const handleSaveCropImage = (base64Image: string | null) => {
    if (base64Image) mutate({ uuid: user?.uuid, profile_photo: base64Image })
  }

  // const handleProfilePictureCrop = () => {
  //   if (uploadedImage) {
  //     provideModalSettings({
  //       modalVariant: ModalVariant.Modal,
  //       content: (
  //         <EditPhoto
  //           handleSave={handleSaveCropImage}
  //           title={'Загрузка логотипа'}
  //           src={uploadedImage}
  //         />
  //       ),
  //     })
  //   }

  // }

  useEffect(() => {
    if (uploadedImage) {
      provideModalSettings({
        modalVariant: ModalVariant.Modal,
        content: (
          <EditPhoto
            handleSave={handleSaveCropImage}
            title={'Загрузка логотипа'}
            src={uploadedImage}
          />
        ),
      })
    }
  }, [uploadedImage])

  useLoader(isLoading)

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <FormLayout isSubmitActive={isDirty && isValid} toLeft>
          <div className={styles.formLayoutContent}>
            <div className={styles.profilePictureWrapper}>
              {/*<div style={{ position: 'relative' }}>*/}
              <ImageLoader
                className={styles.profilePicture}
                src={user?.profile_photo ?? profileEmptyImage}
                alt={user?.name ?? 'profile photo'}
              />

              {/*<Button*/}
              {/*  handleClick={handleProfilePictureCrop}*/}
              {/*  className={styles.imageEditButton}*/}
              {/*  variant={ButtonVariants.Text}*/}
              {/*>*/}
              {/*  <EditImageIcon />*/}
              {/*</Button>*/}
              {/*</div>*/}

              <FileUpload
                className={styles.profilePictureEditButton}
                handleChange={handleEditProfilePicture}
                handleErrorMessage={handleProfileError}
                content={
                  <Flex
                    alignItems={'center'}
                    justifyContent={'center'}
                    style={{ gap: '0 8px' }}
                  >
                    {'Загрузить'}
                    <UploadIcon color={'currentColor'} />
                  </Flex>
                }
              />
            </div>
            <div className={styles.formContentWrapper}>
              <p className={styles.description}>Личная информация</p>

              <InputField
                label="Имя"
                value={getValues('name')}
                register={register('name')}
                errorMessage={errors.name?.message}
                isRequired
              />

              <div style={{ width: '100%', marginBottom: '32px' }}>
                <ImageUpload
                  defaultImage={{
                    name: user?.cover_photo ?? '',
                    isLink: true,
                    linkName: 'Cover photo',
                    status: ImageUploadStatus.Hidden,
                  }}
                  isRequired={false}
                  labelText={'Загрузить обложку'}
                  fieldName={'cover_photo'}
                  message={ProfileImageMessage.Background}
                />
              </div>

              <div style={{ marginBottom: '40px', width: '100%' }}>
                <InputField
                  label="Описание"
                  isRequired={false}
                  variant={InputFieldVariant.Textarea}
                  register={register('description', {
                    onChange: handleDescriptionChange,
                  })}
                  placeholder={'Добавьте описание'}
                  errorMessage={errors.description?.message}
                />
              </div>
              <h1 className={styles.videoTitle}>Видеoпрезентация</h1>

              <InputField
                label="URL"
                placeholder={'Добавьте URL'}
                register={register('video_link')}
                isRequired={false}
                errorMessage={errors.video_link?.message}
              />

              <div className={styles.socialLinksWrapper}>
                <h1 className={styles.title}>Социальная сеть</h1>
                <Button
                  variant={ButtonVariants.Primary}
                  handleClick={addSocialLinkField}
                  className={styles.addButton}
                >
                  Добавить
                </Button>
              </div>

              {socialLinks?.map((socialLink: string, index: number, list) => {
                const itemErrorMessage = errors.social_links?.[index]?.message
                const dublicatedItems =
                  list.filter((item) => item === socialLink && socialLink)
                    .length > 1
                const dublicatedItemIndex =
                  dublicatedItems && list.lastIndexOf(socialLink)

                const notUniqueErrorMessage =
                  index === dublicatedItemIndex
                    ? errors.social_links?.message
                    : itemErrorMessage

                return (
                  <div key={index} className={styles.socialLinkField}>
                    <InputField
                      variant={InputFieldVariant.LinkInput}
                      label="URL"
                      register={register(`social_links.${index}`)}
                      placeholder="Добавьте URL"
                      errorMessage={
                        itemErrorMessage
                          ? itemErrorMessage
                          : notUniqueErrorMessage
                      }
                      handleDelete={deleteSocialLinkField(index)}
                      src={socialLink ? getFaviconOfUrl(socialLink) : null}
                    />
                  </div>
                )
              })}
              <Button
                variant={ButtonVariants.Text}
                className={styles.deactivateButton}
                handleClick={openDeactivateModal}
              >
                Деактивировать аккаунт
              </Button>
            </div>
          </div>
        </FormLayout>
      </form>
    </FormProvider>
  )
}

export default EditProfilePersonalInfo
