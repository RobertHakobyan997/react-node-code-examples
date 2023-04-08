import { createUseStyles } from 'react-jss'
import { AppTheme } from 'src/modules/shared/types/style.types'
import check from 'src/assets/images/check.svg'

export const checkboxUseStyles = createUseStyles((theme: AppTheme) => ({
  input: {
    display: 'none',
    '&:checked + label:after': {
      display: 'block',
      content: `url(${check})`,
      borderRadius: '2px',
      position: 'absolute',
      width: '9.62px',
      height: '7.62px',
      left: 'calc(50% - 9.62px/2 + 0px)',
      top: '4.62px',
      transform: 'translateY(-100%)',
    },

    '&:checked + label:before': {
      background: theme.primaryColor,
      border: `1px solid ${theme.primaryColor}`,
    },
  },
  label: {
    position: 'relative',
    cursor: 'pointer',
    display: 'block',
    boxSizing: 'border-box',

    '&:before': {
      content: '""',
      display: 'block',
      backgroundColor: theme.inputBackground,
      border: `1px solid ${theme.inputStroke}`,
      borderRadius: '2px',
      width: '16px',
      height: '16px',
      cursor: 'pointer',
    },
  },
  description: {
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '17px',
    color: theme.textColor,
    marginLeft: '8px',
  },
}))
