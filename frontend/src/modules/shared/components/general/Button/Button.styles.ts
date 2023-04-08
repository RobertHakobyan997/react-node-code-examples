import { createUseStyles } from 'react-jss'
import { AppTheme } from '../../../types/style.types'
import { globalStyles } from 'src/styles/global.styles'

interface ButtonStyleProps {
  active?: boolean
  color?: string
}

export const buttonUseStyles = createUseStyles((theme: AppTheme) => ({
  button: {
    ...globalStyles.button,
    borderRadius: theme.primaryRadius,
    color: theme.textColor,
    transition: theme.transition,
  },

  tab: {
    color: ({ active }: ButtonStyleProps) =>
      active ? theme.primaryColor : theme.textColor,
    fontWeight: '500',
    fontSize: '16px',
    lineHeight: '20px',
    padding: '10px 0',
    flex: '1',
    textAlign: 'center',
    backgroundColor: 'transparent',
    border: 0,
    cursor: 'pointer',
    borderBottom: ({ active }: ButtonStyleProps) =>
      active ? `2px solid ${theme.primaryColor}` : '2px solid transparent',
  },

  primary: {
    composes: '$button',
    background: theme.primaryColor,
    fontWeight: 500,

    '&:hover': {
      background: theme.primaryHover,
    },
    '&:active': {
      background: theme.primaryActive,
    },
  },

  secondary: {
    composes: ['$button'],
    background: theme.secondaryColor,
  },

  disabled: {
    composes: ['$secondary'],
    cursor: 'not-allowed',
    touchAction: 'none',
    color: '#A7A7A7',
    '-webkit-tap-highlight-color': 'transparent',
    '-webkit-touch-callout': 'none',
    '-webkit-user-select': 'none',
    '-khtml-user-select': 'none',
    '-moz-user-select': 'none',
    '-ms-user-select': 'none',
    'user-select': 'none',
  },

  tabDisabled: {
    composes: ['$disabled'],
  },

  primaryDisabled: {
    composes: ['$disabled'],
  },
  secondaryDisabled: {
    composes: ['$disabled'],
  },

  textDisabled: {
    composes: ['$disabled'],
  },

  outlinedDisabled: {
    composes: ['$disabled'],
  },
  successDisabled: {
    composes: ['$disabled'],
  },
  failDisabled: {
    composes: ['$disabled'],
  },
  pendingDisabled: {
    composes: ['$disabled'],
  },
  roundDisabled: {
    composes: ['$disabled'],
  },
  pageDisabled: {
    composes: ['$disabled', '$page'],
  },

  text: {
    composes: ['$button'],
    display: 'inline',
    width: 'auto',
    background: 'transparent',
    padding: '0',
    fontSize: '14px',
    color: theme.primaryColor,
  },

  success: {
    composes: ['$text'],
    color: theme.purpleColor,
    background: '#2A2148',
    padding: '5px 10px',
    fontWeight: '400',
    fontSize: '1rem',
    lineHeight: '1.25rem',
  },

  fail: {
    composes: ['$text'],
    color: theme.dangerColor,
    background: '#3A2434',
    padding: '0.3125rem 0.625rem',
    fontWeight: '400',
    fontSize: '1rem',
    lineHeight: '1.25rem',
  },

  pending: {
    composes: ['$text'],
    color: theme.yellowColor,
    background: '#332921',
    fontSize: '1rem',
    lineHeight: '1.25rem',
    padding: '0.3125rem 0.625rem',
    fontWeight: '400',
  },

  icon: {
    composes: ['$button'],
    width: '3.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '3.75rem',
    background: theme.inputBackground,
    border: `1px solid ${theme.inputStroke}`,
    transition: '0.3s',
    '&:hover': {
      background: theme.inputStroke,
    },
  },

  iconDisabled: {
    composes: ['$icon'],
    background: `${theme.secondaryColor} !important`,
  },

  round: {
    composes: ['$icon'],
    background: ({ active }: ButtonStyleProps) =>
      active ? theme.inputBackground : 'transparent',
    border: 0,
    width: '32px',
    height: '32px',
    borderRadius: '100%',
    padding: '0',
    '&:hover': {
      background: ({ active }: ButtonStyleProps) =>
        active ? theme.inputBackground : 'transparent',
    },
  },

  page: {
    composes: '$button',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    textAlign: 'center',
    padding: 0,
    margin: '0 4px',
    fontSize: '14px',
    lineHeight: '17px',
    borderRadius: '5px',
    background: theme.inputBackground,
    boxShadow: ({ active }: ButtonStyleProps) =>
      active ? '0px 0px 8px rgba(24, 144, 255, 0.4)' : 0,
    border: ({ active }: ButtonStyleProps) =>
      `1px solid ${active ? theme.primaryColor : theme.inputStroke}`,
  },

  outlined: {
    composes: ['$button'],
    padding: '0.28125rem 0.625rem',
    border: ({ color }: ButtonStyleProps) =>
      `1px solid ${color ?? theme.textColor}`,
    fontSize: '12px',
    lineHeight: '15px',
    color: ({ color }: ButtonStyleProps) => color ?? theme.textColor,
    background: 'transparent',
    width: 'auto',
    '&:hover': {
      color: theme.primaryColor,
      border: `1px solid ${theme.primaryColor}`,
    },
    '&:active': {
      color: theme.primaryActive,
      border: `1px solid ${theme.primaryActive}`,
    },
  },

  secondaryOutlinedBig: {
    composes: '$outlined',
    border: `1.5px solid ${theme.primaryColor}`,
    color: theme.primaryColor,
    width: '100%',
    padding: '0.625rem 1rem',
    fontWeight: 500,
    fontSize: '1rem',
    lineHeight: '20px',
    '&:hover': {
      border: `1.5px solid ${theme.primaryHover}`,
      color: theme.primaryHover,
    },

    '&:active': {
      color: theme.primaryActive,
      border: `1.5px solid ${theme.primaryActive}`,
    },
  },

  link: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '17px',
    color: theme.whiteColor,
    padding: '4px 0',
    border: 0,
    cursor: 'pointer',
    borderBottom: `1px solid ${theme.whiteColor}`,
    background: 'transparent',
  },

  linkDisabled: {
    composes: '$link',
    color: '#535A65',
    cursor: 'not-allowed',
    borderBottom: '1px solid #535A65',
  },

  secondaryOutlinedBigDisabled: {},
  secondaryOutlinedSmall: {
    composes: '$secondaryOutlinedBig',
    height: '32px',
    padding: '0 1rem',
    '&:hover': {
      border: `1px solid ${theme.primaryHover}`,
      color: theme.primaryHover,
    },
    '&:active': {
      color: theme.primaryActive,
      border: `1px solid ${theme.primaryActive}`,
    },
  },

  secondaryOutlinedSmallDisabled: {
    composes: '$secondaryOutlinedSmall',
  },
}))
