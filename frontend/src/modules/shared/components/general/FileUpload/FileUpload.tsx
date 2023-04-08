import React, { useId } from 'react'
import { imageValidation } from 'src/modules/shared/utils/validation.utils'
import { fileUploadUseStyles } from 'src/modules/shared/components/general/FileUpload/FileUpload.styles'
import { Button } from 'src/modules/shared/components/general/Button/Button'
import { ButtonVariants } from 'src/modules/shared/components/general/Button/Button.types'
import { fileToBase64 } from 'src/modules/shared/utils/file.utils'
import { ErrorMessage } from 'src/modules/shared/constants/message.constants'

export const enum FileUploadVariant {
  Image = '.png, .jpg, .webp',
}

export function FileUpload({
  handleChange,
  variant = FileUploadVariant.Image,
  className,
  content,
  handleErrorMessage,
}: {
  className?: string
  variant?: FileUploadVariant
  content: string | React.ReactNode
  handleChange: (base64: string | null) => void
  handleErrorMessage: (message: string | null | boolean) => void
}) {
  const name = useId()
  const styles = fileUploadUseStyles()

  const handleInnerChange = async (
    e: React.ChangeEvent<HTMLInputElement> | undefined
  ) => {
    const uploadedFile = e?.target?.files?.[0]

    if (uploadedFile) {
      const validationErrorMessage = imageValidation(uploadedFile)
      const base64 = await fileToBase64(uploadedFile)

      handleErrorMessage(validationErrorMessage ? validationErrorMessage : null)
      handleChange(validationErrorMessage ? null : base64)
      return
    }

    handleErrorMessage(ErrorMessage.default())
    handleChange(null)
  }

  return (
    <div>
      <Button className={className} variant={ButtonVariants.Outlined}>
        <label htmlFor={name} style={{ display: 'block', cursor: 'pointer' }}>
          {content}
        </label>
      </Button>

      <input
        type="file"
        accept={variant}
        id={name}
        className={styles.input}
        onChange={handleInnerChange}
      />
    </div>
  )
}
