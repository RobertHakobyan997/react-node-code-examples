import React, { useEffect, useId, useState } from 'react'
import { imageUploadUseStyles } from './ImageUpload.styles'
import { FileUploadIcon } from '../../Icons/FileUpload.icon'
import Flex from '../Flex/Flex'
import { ImageIcon } from '../../Icons/Image.icon'
import { UploadIcon } from '../../Icons/Upload.icon'
import { stringShorter } from '../../../utils/string.utils'
import { buttonUseStyles } from '../Button/Button.styles'
import { imageValidation } from '../../../utils/validation.utils'
import { Button } from '../Button/Button'
import { ButtonVariants } from '../Button/Button.types'
import { SpinnerIcon } from '../../Icons/Spinner.icon'
import { SuccessIcon } from '../../Icons/Success.icon'
import { ComponentWithChildren } from '../../../types/component.types'
import { useWindowSize } from '../../../hooks/useWindowSize'
import { BreakPointSize } from '../../../constants/style.constants'
import { RecycleIcon } from '../../Icons/Recycle.icon'
import { RequiredIndicator } from 'src/modules/shared/components/general/InputField/InputField'
import { ImageLoader } from 'src/modules/shared/components/general/ImageLoader/ImageLoader'
import { useFormContext } from 'react-hook-form'
import { SetValueOptions } from 'src/modules/shared/constants/form.constants'

export enum ImageUploadStatus {
  Loading = 'Loading',
  Success = 'Success',
  Hidden = 'Hidden',
}

export interface ImageUploadState {
  name: null | string
  isLink: boolean
  linkName?: null | string
  status: ImageUploadStatus
  file?: string | null
}

interface ImageEmptyProps {
  handleDrag: (e: any) => void
  handleDrop: (e: any) => void
  dragActive: boolean
  message: string
  errorMessage?: string | null
  name: string
}

export const FileUploadText = {
  DragActive: 'Скинь картинку сюда',
  DragInactive: 'Загрузитe или переташите ',
}

const IconWrapper = ({ children }: ComponentWithChildren) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      style={{ width: '1.5rem', height: '1.5rem' }}
    >
      {children}
    </Flex>
  )
}

const ImageUploadIndicator = ({ status }: { status: ImageUploadStatus }) => {
  switch (status) {
    case ImageUploadStatus.Hidden:
      return null
    case ImageUploadStatus.Loading:
      return <SpinnerIcon />
    case ImageUploadStatus.Success:
      return (
        <IconWrapper>
          <SuccessIcon />
        </IconWrapper>
      )
    default:
      return null
  }
}

const ImageEmpty = ({
  handleDrag,
  handleDrop,
  dragActive,
  message,
  errorMessage,
  name,
}: ImageEmptyProps) => {
  const styles = imageUploadUseStyles()

  return (
    <>
      <div
        className={styles.uploadWrapper}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <label htmlFor={name} className={styles.inputWrapper}>
          <Flex alignItems="center" direction="column" justifyContent="center">
            {dragActive ? (
              <p>{FileUploadText.DragActive}</p>
            ) : (
              <>
                <div style={{ marginBottom: '8px' }}>
                  <FileUploadIcon />
                </div>

                <p className={styles.stateText}>
                  {FileUploadText.DragInactive}
                </p>
              </>
            )}
          </Flex>
        </label>
      </div>

      {errorMessage ? (
        <div className={styles.errorWrapper}>
          <p className={styles.errorText}>{errorMessage}</p>
        </div>
      ) : (
        <div className={styles.imageMessage}>
          <p>{message}</p>
        </div>
      )}
    </>
  )
}

const ImageRendererByStatus = ({
  status,
  imageFile,
}: {
  status: ImageUploadStatus
  imageFile?: string | null
}) => {
  const styles = imageUploadUseStyles()

  switch (status) {
    case ImageUploadStatus.Hidden:
      return (
        <ImageLoader
          className={styles.smallImage}
          src={imageFile ?? null}
          alt="uploaded"
        />
      )
    case ImageUploadStatus.Loading:
      return <ImageIcon />
    case ImageUploadStatus.Success:
      return (
        <ImageLoader
          className={styles.smallImage}
          src={imageFile ?? ''}
          alt="uploaded"
        />
      )
  }
}

const ImageFull = ({
  imageData,
  handleDelete,
  errorMessage,
  name,
}: {
  imageData: ImageUploadState
  handleDelete: () => void
  errorMessage?: string
  name: string
}) => {
  const { width } = useWindowSize()

  const [isFieldHover, setIsFieldHover] = useState(false)
  const [isButtonHover, setIsButtonHover] = useState(false)
  const buttonStyles = buttonUseStyles({})
  const styles = imageUploadUseStyles()

  const toggleFieldHover = () => setIsFieldHover((prev) => !prev)

  const toggleButtonHover = () => setIsButtonHover((prev) => !prev)

  const isRecycleVisible = width <= BreakPointSize.Laptop || isFieldHover

  return (
    <div>
      <div
        className={styles.container}
        onMouseEnter={toggleFieldHover}
        onMouseLeave={toggleFieldHover}
      >
        <div className={styles.imageWrapper}>
          <ImageRendererByStatus
            status={imageData.status}
            imageFile={imageData.isLink ? imageData.name : imageData.file}
          />
          {imageData?.isLink ? (
            <a
              className={styles.imageFullText}
              target="_blank"
              href={imageData.name ?? 'name'}
              rel="noreferrer"
            >
              {imageData.linkName}
            </a>
          ) : (
            <p className={styles.imageFullText}>
              {stringShorter({ string: imageData.name ?? '' })}
            </p>
          )}

          <Flex style={{ margin: '0 0.75rem' }}>
            <ImageUploadIndicator status={imageData.status} />

            {isRecycleVisible && (
              <Button variant={ButtonVariants.Text} handleClick={handleDelete}>
                <IconWrapper>
                  <RecycleIcon />
                </IconWrapper>
              </Button>
            )}
          </Flex>
        </div>

        <label
          htmlFor={name}
          onMouseEnter={toggleButtonHover}
          onMouseLeave={toggleButtonHover}
          className={styles.label}
        >
          <div className={`${buttonStyles.outlined} ${styles.uploadButton}`}>
            <Flex
              alignItems="flex-start"
              justifyContent="center"
              direction="row"
              style={{ gap: '0 8px' }}
            >
              <span>Загрузить</span>

              <UploadIcon isHovered={isButtonHover} />
            </Flex>
          </div>
        </label>
      </div>
      {errorMessage && (
        <div className={styles.errorWrapper}>
          <p className={styles.errorText}>{errorMessage}</p>
        </div>
      )}
    </div>
  )
}

interface IFileInputProps {
  placeholder?: string
  fieldName: string
  isRequired?: boolean
  labelText?: string
  message: string
  defaultImage?: ImageUploadState | null
}

export const imageInitialState: ImageUploadState = {
  name: null,
  status: ImageUploadStatus.Hidden,
  linkName: null,
  isLink: false,
  file: null,
}

/*
 use this component only FormProvider context, otherwise it will return error
 */

export default function ImageUpload({
  labelText,
  isRequired,
  fieldName,
  message,
  defaultImage,
}: IFileInputProps) {
  const name = useId()
  const styles = imageUploadUseStyles()
  const [imageData, setImageData] = useState<ImageUploadState>(
    defaultImage ?? imageInitialState
  )
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext()

  const errorMessage = errors[fieldName]?.message
  const [dragActive, setDragActive] = useState<boolean>(false)

  const handleChange = async (e: any) => {
    const uploadedFile = e?.target?.files?.[0]
    const validationErrorMessage = imageValidation(uploadedFile)

    setValue(fieldName, uploadedFile, SetValueOptions)

    if (validationErrorMessage) {
      setImageData(defaultImage ?? imageInitialState)
      return
    }

    setImageData({
      name: uploadedFile.name,
      status: ImageUploadStatus.Loading,
      linkName: '',
      isLink: false,
      file: URL.createObjectURL(uploadedFile),
    })
  }

  const handleDeleteInner = () => {
    setImageData(imageInitialState)
    setValue(fieldName, null, SetValueOptions)
  }

  const handleDrag = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true)
    if (e.type === 'dragleave') setDragActive(false)
  }

  const handleDrop = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const firstFile = e.dataTransfer.files[0]

    const validationErrorMessage = imageValidation(firstFile)

    setValue(fieldName, firstFile, SetValueOptions)

    if (validationErrorMessage) {
      setImageData(imageInitialState)
      return
    }

    if (firstFile) {
      setImageData({
        name: firstFile.name,
        status: ImageUploadStatus.Loading,
        isLink: false,
        file: URL.createObjectURL(firstFile),
      })
    }
  }

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null

    if (imageData.status === ImageUploadStatus.Loading) {
      timeout = setTimeout(() => {
        setImageData((prev) => ({ ...prev, status: ImageUploadStatus.Success }))
      }, 1500)
    }

    if (imageData.status === ImageUploadStatus.Success) {
      timeout = setTimeout(() => {
        setImageData((prev) => ({ ...prev, status: ImageUploadStatus.Hidden }))
      }, 5000)
    }

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [imageData.status])

  return (
    <div className={styles.wrapper}>
      {labelText && (
        <label htmlFor={name} className={styles.label}>
          {labelText}
          {isRequired && <RequiredIndicator isEmpty={!imageData.name} />}
        </label>
      )}

      {imageData.name ? (
        <ImageFull
          handleDelete={handleDeleteInner}
          imageData={imageData}
          errorMessage={errorMessage && String(errorMessage)}
          name={name}
        />
      ) : (
        <ImageEmpty
          message={message}
          handleDrop={handleDrop}
          errorMessage={errorMessage && String(errorMessage)}
          handleDrag={handleDrag}
          dragActive={dragActive}
          name={name}
        />
      )}

      <input
        type="file"
        accept=".png, .jpg, .webp"
        id={name}
        className={styles.input}
        {...register(fieldName)}
        onChange={handleChange}
      />
    </div>
  )
}
