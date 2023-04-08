import { createUseStyles } from 'react-jss'
import { AppTheme } from '../../types/style.types'
import { MediaBreakPoints } from 'src/modules/shared/constants/style.constants'

export const enterProfileUseStyles = createUseStyles((theme: AppTheme) => ({
  wrapper: {
    marginTop: '1.25rem',
    padding: '1.25rem 2rem',
    border: `1px solid ${theme.borderDark}`,
    borderRadius: theme.primaryRadius,
    background: theme.ticketColor,
    boxShadow: '0px 6px 10px rgba(20, 20, 20, 0.15)',
  },

  title: {
    color: theme.textColor,
    fontSize: '1.25rem',
    fontWeight: '600',
    lineHeight: '24px',
    marginBottom: '0.5rem',
  },
  description: {
    color: theme.textDarker,
    maxWidth: '50rem',
    fontSize: '1rem',
    fontWeight: '400',
    lineHeight: '20px',
  },
  redirectToProfilePage: {
    display: 'block',
    marginTop: '1.25rem',
    backgroundColor: '#42A5FE',
    color: theme.whiteColor,
    borderRadius: '0.5rem',
    width: 'fit-content',
    fontWeight: '500',
    fontSize: '1rem',
    lineHeight: '1.25rem',
    padding: '0.625rem 1rem',
    textDecoration: 'none',
    '&:hover': {
      background: 'rgb(6, 118, 222)',
    },
  },

  [MediaBreakPoints.Tablet]: {
    redirectToProfilePage: {
      width: 'auto',
      textAlign: 'center',
    },
  },
}))
