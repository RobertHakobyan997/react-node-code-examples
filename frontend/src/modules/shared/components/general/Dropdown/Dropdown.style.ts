import { createUseStyles } from 'react-jss'
import { AppTheme } from '../../../types/style.types'

export const dropdownUseStyles = createUseStyles((theme: AppTheme) => ({
  titleStyle: {
    fontSize: '13px',
    color: theme.textColor,
  },

  dropdownWrapper: {
    width: '100%',
    position: 'relative',
  },

  dropdownListWrapper: {
    zIndex: '99',
    position: 'absolute',
    top: 'calc(100% + 0.1875rem)',
    width: '100%',
    maxHeight: '136px',
    overflowY: 'auto',
    borderRadius: theme.primaryRadius,
    background: theme.inputBackground,
    border: `1px solid ${theme.inputStroke}`,
    overflow: 'hidden',
    boxSizing: 'border-box',
  },
  regular: {
    color: theme.textColor,
    textAlign: 'left',

    background: theme.inputBackground,
    borderRadius: theme.primaryRadius,
    border: `1px solid ${theme.inputStroke}`,
    width: '100%',
    fontSize: '14px',
    padding: '9px 16px',
    outline: '0',
    boxSizing: 'border-box',
    cursor: 'pointer',
    transition: '0.3s',
  },
  input: {
    composes: '$regular',
    display: 'flex',
    justifyContent: ({ isOneItem }: { isOneItem?: boolean }) =>
      isOneItem ? 'center' : 'flex-start',
    alignItems: 'center',
    border: `1px solid ${theme.inputStroke}`,
    borderLeft: 0,
    color: theme.textDarker,
    borderRadius: `0px ${theme.primaryRadius} ${theme.primaryRadius} 0px`,
    background: '#1E2330 !important',
    padding: '10px 12px',
    height: '40px',
    // maxWidth: '79px',
    minWidth: '68px',
    width: '100%',
    fontSize: '1rem',
    lineHeight: '1.25rem',
  },

  dropdownButtonPlaceholder: {
    composes: ['$regular'],
    color: theme.textDarker,
  },

  regularItem: {
    background: theme.inputBackground,
    border: 0,
    textAlign: 'left',

    color: theme.textColor,
    padding: '0.625rem 1.25rem',
    width: '100%',
    cursor: 'pointer',
    '&:hover': {
      background: theme.inputSelectedBackground,
    },
    '&:active': {
      background: theme.inputSelectedBackground,
    },
  },

  inputItem: {
    composes: '$regularItem',
    textAlign: 'center',
  },

  arrow: {
    position: 'absolute',
    top: '50%',
    right: '0.75rem',
    transform: 'translateY(-50%)',
  },
  errorText: {
    marginTop: '8px',
    color: theme.dangerColor,
    fontSize: '13px',
  },
}))
