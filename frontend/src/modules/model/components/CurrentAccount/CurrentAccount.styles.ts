import { createUseStyles } from 'react-jss'
import { AppTheme } from '../../../shared/types/style.types'
import { MediaBreakPoints } from '../../../shared/constants/style.constants'

export const currentAccountUseStyles = createUseStyles((theme: AppTheme) => ({
  currentAccountWrapper: {
    padding: '1.25rem 2rem',
    border: `1px solid ${theme.borderDark}`,
    borderRadius: theme.primaryRadius,
    background: theme.ticketColor,
    gap: '0 20px',
    boxShadow: '0px 6px 10px rgba(20, 20, 20, 0.15)',
  },

  transactionWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '0 32px',
  },

  title: {
    color: theme.textDarker,
    fontSize: '1rem',
    marginBottom: '0.3125rem',
    lineHeight: '1.25rem',
  },

  price: {
    marginBottom: '5px',
  },

  subTitle: {
    color: theme.textColor,
    fontSize: '1rem',
    fontWeight: '500',
  },

  amount: {
    color: theme.textColor,
    fontSize: '1.75rem',
    lineHeight: '2.125rem',
    fontWeight: 600,
  },

  withdrawalButton: {
    fontWeight: 500,
    fontSize: '1rem',
    lineHeight: '20px',
    width: 'max-content',
  },

  [MediaBreakPoints.Tablet]: {
    subTitle: {
      marginBottom: '12px',
    },

    withdrawalButton: {
      width: '100%',
    },

    transactionWrapper: {
      alignItems: 'flex-start',
      flexDirection: 'column-reverse',
      justifyContent: 'flex-start',
      gap: '16px 0',
    },

    buttonWrapper: {
      width: '100%',
    },

    button: {
      width: '100%',
      textAlign: 'center',
    },
  },
}))
