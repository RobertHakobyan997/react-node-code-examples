import { createUseStyles } from 'react-jss'
import { AppTheme } from '../../../types/style.types'
import { CSSProperties } from 'react'

const errorTextFontSize = 13

interface InputFieldStylesProps {
  hasDropdown: boolean
  isError?: boolean
  placeHolderStyles?: CSSProperties
  isLinkInput?: boolean
  hasDelete: boolean
}

export const inputFieldUseStyles = createUseStyles((theme: AppTheme) => ({
  inputLabel: {
    color: theme.textColor,
    marginBottom: '0.5rem',
  },

  inputWrapper: {
    position: 'relative',
    width: '100%',
    display: ({ isLinkInput }: InputFieldStylesProps) =>
      isLinkInput ? 'flex' : '',
    alignItems: ({ isLinkInput }: InputFieldStylesProps) =>
      isLinkInput ? 'center' : '',
  },

  inputField: {
    color: theme.textColor,
    background: theme.inputBackground,
    width: '100%',
    height: '40px',
    padding: '10px 12px',
    paddingRight: '36px',
    outline: '0',
    fontSize: '1rem',
    lineHeight: '1.25rem',

    borderRadius: ({ hasDropdown }: InputFieldStylesProps) =>
      hasDropdown
        ? `${theme.primaryRadius} 0 0 ${theme.primaryRadius}`
        : theme.primaryRadius,
    border: ({ isError }: { isError?: boolean }) =>
      `1px solid ${isError ? theme.dangerColor : theme.inputStroke}`,
    boxSizing: 'border-box',
    '&::placeholder': {
      color: theme.inputPlaceholder,
      fontSize: ({ placeHolderStyles }) =>
        placeHolderStyles?.fontSize ?? 'inherit',
    },

    '&:focus': {
      border: ({ isError }: { isError?: boolean }) =>
        `1px solid ${isError ? theme.dangerColor : theme.primaryColor}`,
      boxShadow: '0px 0px 4px rgba(24, 144, 255, 0.4)',
    },
  },

  textarea: {
    composes: '$inputField',
    borderRadius: theme.primaryRadius,
    border: ({ isError }: { isError?: boolean }) =>
      `1px solid ${isError ? theme.dangerColor : theme.inputStroke}`,
    boxSizing: 'border-box',
    '&::placeholder': {
      color: theme.inputPlaceholder,
      fontSize: ({ placeHolderStyles }) =>
        placeHolderStyles?.fontSize ?? 'inherit',
    },

    overflowY: 'hidden',
    '&:focus': {
      border: ({ isError }: { isError?: boolean }) =>
        `1px solid ${isError ? theme.dangerColor : theme.primaryColor}`,
      boxShadow: '0px 0px 4px rgba(24, 144, 255, 0.4)',
    },
    height: '100px',
    maxHeight: '230px',
    resize: 'none',
  },

  errorIconWrapper: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
  },

  errorWrapper: {
    position: 'relative',
    marginTop: '0.25rem',
  },

  errorText: {
    color: theme.dangerColor,
    fontSize: `${errorTextFontSize}px`,
  },

  optionsWrapper: {
    position: 'absolute',
  },

  deleteIconWrapper: {
    marginLeft: '19px',
  },

  deleteIconBtn: {
    background: 'transparent',
    border: 'unset',
    cursor: 'pointer',
    color: theme.textColor,
    transition: '0.1s',
    '&:hover': {
      color: theme.textDarker,
    },

    '&:active': {
      color: theme.textDarker,
    },
  },
  socialIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '22px',
    height: '22px',
    position: 'absolute',
    right: ({ hasDelete }: InputFieldStylesProps) =>
      hasDelete ? '42px' : '22px',
  },
}))

export const requiredFieldStyles = createUseStyles((theme: AppTheme) => ({
  requiredText: {
    color: ({ isEmpty }: { isEmpty: boolean }) =>
      isEmpty ? theme.dangerColor : theme.textDarker,
  },
}))
