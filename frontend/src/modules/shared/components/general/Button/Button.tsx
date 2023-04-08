import { ButtonSizes, ButtonTypes, ButtonVariants } from './Button.types'
import { buttonUseStyles } from './Button.styles'
import { ComponentWithChildren } from '../../../types/component.types'
import React, { CSSProperties } from 'react'
import classNames from 'classnames'

export interface ButtonProps extends ComponentWithChildren {
  type?: ButtonTypes
  variant: ButtonVariants
  size?: ButtonSizes
  active?: boolean
  isButtonInteractive?: boolean
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onMouseEnter?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onmouseleave?: (e: React.MouseEvent<HTMLButtonElement>) => void
  style?: CSSProperties
  className?: string
  color?: string
}

export const Button = ({
  variant,
  type = 'button',
  isButtonInteractive = true,
  active = false,
  handleClick,
  children,
  onMouseEnter,
  onmouseleave,
  color,
  style,
  className,
}: ButtonProps) => {
  const buttonStyles = buttonUseStyles({ active, color })
  const allButtonStyles = classNames({
    [className ?? '']: Boolean(className),
    [buttonStyles[variant]]: isButtonInteractive,
    [buttonStyles[`${variant}Disabled`]]: !isButtonInteractive,
  })

  const handleClickInner = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isButtonInteractive && handleClick) handleClick(e)
  }

  return (
    <button
      onClick={handleClick && handleClickInner}
      type={type}
      className={allButtonStyles}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onmouseleave}
      style={style}
    >
      {children}
    </button>
  )
}
