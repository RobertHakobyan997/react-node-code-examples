import { createUseStyles } from 'react-jss'
import authBackground from '../../../../../assets/images/auth_background.png'
import { AppTheme } from '../../../types/style.types'
import { MediaBreakPoints } from '../../../constants/style.constants'

export const authLayoutUseStyles = createUseStyles((theme: AppTheme) => ({
  layoutWrapper: {
    background: `#131525 url(${authBackground}) no-repeat`,
    backgroundSize: 'cover',
    width: '100%',
    height: 'var(--screen-size)',
    boxSizing: 'border-box',
  },

  layoutComponentsWrapper: {
    maxWidth: '30rem',
    width: '100%',
    padding: '1.5rem 2.5rem',
    gap: '1.25rem 0',
    backgroundColor: theme.ticketColor,
    borderRadius: theme.primaryRadius,
    boxSizing: 'border-box',
  },

  [MediaBreakPoints.Mobile]: {
    layoutComponentsWrapper: {
      maxWidth: 'max-content',
      width: '100%',
      margin: '0 1.25rem',
      padding: '0.9375rem 1.25rem',
    },
  },

  [MediaBreakPoints.Tablet]: {
    layoutComponentsWrapper: {
      maxWidth: '30rem',
      width: 'calc(100% - 30px)',
      margin: '0 auto',
      padding: '1.5rem 0.9375rem',
    },
  },
}))
