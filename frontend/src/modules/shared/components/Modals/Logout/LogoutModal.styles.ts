import { createUseStyles } from 'react-jss'
import { AppTheme } from '../../../types/style.types'
import { MediaBreakPoints } from '../../../constants/style.constants'

export const logoutModalUseStyles = createUseStyles((theme: AppTheme) => ({
  wrapper: {
    maxWidth: '31.6875rem',
    background: 'red',
    padding: '1.25rem 1.5rem',
    borderRadius: theme.primaryRadius,
    backgroundColor: theme.modalBackground,
  },

  title: {
    fontWeight: '700',
    fontSize: '18px',
    lineHeight: '22px',
    marginBottom: '30px',
    color: theme.whiteColor,
  },

  actionsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '30px',
  },
  buttonWrapper: {
    '&:first-child': {
      marginRight: '20px',
    },
  },
  [MediaBreakPoints.Mobile]: {
    actionsWrapper: {
      flexDirection: 'column-reverse',
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
