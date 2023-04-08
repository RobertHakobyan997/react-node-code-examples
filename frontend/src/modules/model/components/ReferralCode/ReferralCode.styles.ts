import { createUseStyles } from 'react-jss'
import { AppTheme } from '../../../shared/types/style.types'
import { MediaBreakPoints } from '../../../shared/constants/style.constants'

export const referralCodeUseStyles = createUseStyles((theme: AppTheme) => ({
  wrapper: {
    padding: '1.25rem 2rem',
    border: `1px solid ${theme.borderDark}`,
    borderRadius: theme.primaryRadius,
    background: theme.ticketColor,
    boxShadow: '0px 6px 10px rgba(20, 20, 20, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    color: theme.textColor,
    marginBottom: '0.5rem',
    fontWeight: '600',
    lineHeight: '1.5rem',
    fontSize: '1.25rem',
  },

  code: {
    fontWeight: '400',
    fontSize: '1rem',
    lineHeight: '1.25rem',
    color: theme.textColor,
    // marginBottom: '0.75rem',
    wordWrap: 'break-word',
  },

  buttonWrapper: {
    width: 'max-content',
  },

  button: {
    padding: '0 1rem',
    fontSize: '1rem',
    lineHeight: '1.25rem',
    fontWeight: 500,
    height: '2.5rem',
    boxSizing: 'border-box',
  },

  [MediaBreakPoints.Tablet]: {
    buttonWrapper: { width: '100%' },
  },
}))
