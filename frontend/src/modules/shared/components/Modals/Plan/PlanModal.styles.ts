import { createUseStyles } from 'react-jss'
import { AppTheme } from 'src/modules/shared/types/style.types'
import { MediaBreakPoints } from 'src/modules/shared/constants/style.constants'

export const planModalUseStyles = createUseStyles((theme: AppTheme) => ({
  wrapper: {
    width: '720px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderRadius: theme.primaryRadius,
    boxShadow: '0px 6px 10px rgba(20, 20, 20, 0.15)',
    border: `1px solid ${theme.inputStroke}`,
    background: theme.modalBackground,
    padding: '24px 20px',
    boxSizing: 'border-box',
  },

  name: {
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '24px',
    marginBottom: '32px',
    color: theme.textColor,
    width: '100%',
    textAlign: 'center',
  },

  imageWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '32px',
  },

  image: {
    maxWidth: '320px',
    width: '100%',
    maxHeight: '238px',
    objectFit: 'cover',
    borderRadius: theme.primaryRadius,
  },

  description: {
    color: theme.textDarker,
    fontWeight: 400,
    fontSize: '1rem',
    lineHeight: '1.25rem',
    marginTop: '0.75rem',
    marginBottom: '0.625rem',
  },

  [MediaBreakPoints.Tablet]: {
    wrapper: { width: '100%' },
    image: {
      width: '100%',
      maxWidth: '305px',
    },
  },
}))
