import { createUseStyles } from 'react-jss'
import { AppTheme } from '../../../types/style.types'
import { MediaBreakPoints } from '../../../constants/style.constants'

export const otpInputUseStyles = createUseStyles((theme: AppTheme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  numberInput: {
    boxSizing: 'border-box',
    width: '2.5rem',
    height: '2.5rem',
    border: `1px solid ${theme.inputStroke}`,
    fontSize: '14px',
    textAlign: 'center',
    color: theme.textColor,
    borderRadius: theme.primaryRadius,
    background: theme.inputBackground,
    '&:focus': {
      outline: 'none',
      border: `1px solid ${theme.primaryColor}`,
      boxShadow: '0px 0px 4px rgba(24, 144, 255, 0.4)',
    },

    '&:disabled': {
      cursor: 'text',
    },
  },

  '@supports (display: flex; gap: 0.625rem)': {
    wrapper: {
      gap: '0 0.625rem',
    },
  },

  '@supports not (display: flex; gap: 0.625rem)': {
    numberInput: {
      '&:not(:last-child)': {
        marginRight: '0.625rem',
      },
    },
  },

  [MediaBreakPoints.Mobile]: {
    numberInput: {
      marginBottom: '10px',
    },
  },
}))
