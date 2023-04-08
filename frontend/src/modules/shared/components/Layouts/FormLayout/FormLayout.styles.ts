import { createUseStyles } from 'react-jss'
import { AppTheme } from '../../../types/style.types'
import { MediaBreakPoints } from '../../../constants/style.constants'

export const formLayoutUseStyles = createUseStyles((theme: AppTheme) => ({
  wrapper: {
    backgroundColor: theme.modalBackground,
    borderRadius: theme.primaryRadius,
    border: `1px solid ${theme.inputStroke}`,
    maxWidth: '67.75rem',
    width: '100%',
    margin: '1.25rem 0.9375rem',
    height: 'calc(var(--screen-size) - 6.4375rem)',
    overflowY: 'auto',
  },

  contentWrapper: {
    composes: '$wrapper',
    height: 'auto',
    margin: '0',
    padding: '20px',
    overflowX: 'hidden',
  },
  actionsWrapper: {
    marginTop: '2.5rem',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  buttonWrapper: {
    '&:first-child': {
      marginRight: '20px',
    },
  },

  [MediaBreakPoints.Tablet]: {
    actionsWrapper: {
      flexDirection: 'column-reverse',
      justifyContent: 'center',
      width: '100%',
    },
    buttonWrapper: {
      width: '100%',
      '&:first-child': {
        marginRight: 0,
      },
      '&:nth-child(2)': {
        marginBottom: '10px',
      },
    },
  },
}))
