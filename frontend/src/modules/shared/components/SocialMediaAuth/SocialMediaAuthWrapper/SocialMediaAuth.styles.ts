import { createUseStyles } from 'react-jss'
import { AppTheme } from '../../../types/style.types'
import { MediaBreakPoints } from '../../../constants/style.constants'

export const socialMediaAuthUseStyles = createUseStyles((theme: AppTheme) => ({
  authHeaderWrapper: {
    marginBottom: '1.25rem',
  },

  authText: {
    fontWeight: 900,
    fontSize: '1.25rem',
    lineHeight: '1.5rem',
    color: theme.textColor,
  },
  wrapper: {
    gap: '0 0.75rem',
  },

  description: {
    textAlign: 'center',
    fontSize: '12px',
    lineHeight: '15px',
    fontWeight: 500,
    color: theme.textDarker,
    marginTop: '4px',
  },

  [MediaBreakPoints.Tablet]: {
    wrapper: {
      transform: 'scale(0.8)',
    },

    description: {
      maxWidth: '305px',
    },
  },

  socialItem: {},

  '@supports (-webkit-touch-callout: none) and (not (translate: none))': {
    socialItem: {
      '&:not(:last-child)': {
        marginRight: '0.75rem',
      },
    },
  },
}))
