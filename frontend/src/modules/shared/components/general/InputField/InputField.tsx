import { inputFieldUseStyles, requiredFieldStyles } from './InputField.styles'
import { InputErrorIcon } from '../../Icons/Error.icon'
import { Dropdown, DropdownType, DropdownVariant } from '../Dropdown/Dropdown'
import Flex from 'src/modules/shared/components/general/Flex/Flex'
import React, { CSSProperties } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { DeleteIcon } from '../../Icons/Delete.icon'
import { Button } from '../Button/Button'
import { ButtonVariants } from '../Button/Button.types'
import { ImageLoader } from '../ImageLoader/ImageLoader'

export enum InputFieldVariant {
  Input = 'Input',
  Textarea = 'Textarea',
  LinkInput = 'LinkInput',
}

interface InputFieldProps {
  register: UseFormRegisterReturn<any> | null
  errorMessage?: string
  isErrorIconVisible?: boolean
  errorStyles?: CSSProperties
  className?: string
  hasDelete?: boolean
  label?: string
  value?: string | null | number
  placeholder?: string
  variant?: InputFieldVariant
  defaultOption?: DropdownType
  isRequired?: boolean
  options?: DropdownType[]
  optionsClassName?: string
  handleOption?: (item: DropdownType) => void
  style?: CSSProperties
  handleKeyUp?: (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  placeHolderStyles?: CSSProperties
  isActive?: boolean
  handleDelete?: () => void
  src?: string | null
}

export const InputField = ({
  register,
  variant = InputFieldVariant.Input,
  errorMessage,
  label,
  placeholder,
  hasDelete = true,
  placeHolderStyles: placeholderStyles,
  value,
  isRequired,
  className,
  options,
  defaultOption,
  handleOption,
  isActive = true,
  optionsClassName,
  handleKeyUp,
  handleDelete,
  src = '',
  isErrorIconVisible = true,
  style,
  errorStyles,
}: InputFieldProps) => {
  const inputFieldStyles = inputFieldUseStyles({
    isError: Boolean(errorMessage),
    hasDropdown: Boolean(options),
    placeHolderStyles: placeholderStyles,
    hasDelete: Boolean(hasDelete),
    isLinkInput: Boolean(variant === InputFieldVariant.LinkInput),
  })

  const handleTextAreaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { target } = e
    target.style.height = '100px'
    target.style.height = `${target.scrollHeight}px`
  }

  return (
    <div style={{ width: '100%' }}>
      {label && (
        <div className={inputFieldStyles.inputLabel}>
          <label
            htmlFor={register?.name}
            style={{
              fontSize: '0.8125rem',
              display: 'block',
              lineHeight: '1rem',
            }}
          >
            {label}
            {isRequired && (
              <RequiredIndicator isEmpty={Boolean(!value || errorMessage)} />
            )}
          </label>
        </div>
      )}

      <div style={{ position: 'relative' }}>
        <>
          <Flex alignItems="center" style={{ position: 'relative' }}>
            <div className={inputFieldStyles.inputWrapper}>
              {(() => {
                switch (variant) {
                  case InputFieldVariant.Input:
                    return (
                      <input
                        {...register}
                        disabled={!isActive}
                        id={register?.name}
                        onKeyDown={handleKeyUp}
                        className={
                          className
                            ? `${className} ${inputFieldStyles.inputField}`
                            : inputFieldStyles.inputField
                        }
                        placeholder={placeholder}
                        style={style}
                      />
                    )

                  case InputFieldVariant.Textarea:
                    return (
                      <textarea
                        {...register}
                        disabled={!isActive}
                        id={register?.name}
                        onInput={handleTextAreaInput}
                        onKeyDown={handleKeyUp}
                        className={
                          className
                            ? `${inputFieldStyles.textarea} ${className}`
                            : inputFieldStyles.textarea
                        }
                        placeholder={placeholder}
                        style={style}
                      ></textarea>
                    )

                  default:
                    return (
                      <input
                        {...register}
                        id={register?.name}
                        disabled={!isActive}
                        onKeyDown={handleKeyUp}
                        className={
                          className
                            ? `${inputFieldStyles.inputField} ${className}`
                            : inputFieldStyles.inputField
                        }
                        placeholder={placeholder}
                        style={style}
                      />
                    )
                }
              })()}

              {variant === InputFieldVariant.LinkInput && (
                <>
                  <ImageLoader
                    className={inputFieldStyles.socialIcon}
                    src={src ?? null}
                    alt=""
                  />

                  {hasDelete && (
                    <div className={inputFieldStyles.deleteIconWrapper}>
                      <Button
                        variant={ButtonVariants.Text}
                        className={inputFieldStyles.deleteIconBtn}
                        handleClick={handleDelete}
                      >
                        <DeleteIcon />
                      </Button>
                    </div>
                  )}
                </>
              )}

              {isErrorIconVisible &&
                errorMessage &&
                variant !== InputFieldVariant.LinkInput && (
                  <div className={inputFieldStyles.errorIconWrapper}>
                    <InputErrorIcon />
                  </div>
                )}
            </div>

            {options && (
              <div
                style={{
                  zIndex: '99',
                }}
              >
                <Dropdown
                  className={optionsClassName}
                  variant={DropdownVariant.Input}
                  handleChange={handleOption}
                  items={options}
                  placeholder={defaultOption}
                />
              </div>
            )}
          </Flex>

          <div className={inputFieldStyles.errorWrapper}>
            <p className={inputFieldStyles.errorText} style={errorStyles}>
              {errorMessage}
            </p>
          </div>
        </>
      </div>
    </div>
  )
}

export const RequiredIndicator = ({ isEmpty }: { isEmpty: boolean }) => {
  const styles = requiredFieldStyles({ isEmpty })

  return <span className={styles.requiredText}> *</span>
}
