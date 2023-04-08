import { createUseStyles } from 'react-jss'
import { AppTheme } from '../../../shared/types/style.types'
import {
  AppThemeConstants,
  MediaBreakPoints,
} from '../../../shared/constants/style.constants'

export const profileLinkUseStyles = createUseStyles((theme: AppTheme) => ({
  wrapper: {
    marginTop: '1.25rem',
    padding: '1.5rem 2rem',
    border: `1px solid ${theme.borderDark}`,
    borderRadius: theme.primaryRadius,
    background: theme.ticketColor,
    boxShadow: '0px 6px 10px rgba(20, 20, 20, 0.15)',
  },

  header: {
    color: theme.textColor,
    fontSize: '1.25rem',
  },
  description: {
    margin: '1.25rem 0',
    color: theme.textDarker,
  },
  link: {
    padding: '10px 12px',
    marginRight: '12px',
    color: theme.textColor,
    boxSizing: 'border-box',
    whiteSpace: 'nowrap',
    width: '328px',
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  buttonContentWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1rem',
    fontWeight: 500,
  },

  button: {
    padding: '0 16px',
    height: '32px',
  },

  buttonLink: {
    marginRight: '9px',
  },

  linkAndButtonWrapper: {
    borderRadius: theme.primaryRadius,
    backgroundColor: '#1F2431',
    border: `1px solid ${theme.borderDark}`,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '4px 12px',
    width: 'fit-content',
    height: '40px',
    boxSizing: 'border-box',
  },
  title: {
    color: theme.textColor,
    marginBottom: '10px',
    fontWeight: '600',
    fontSize: '20px',
  },
  sumsubWrapper: {
    height: '80vh',
    width: '100%',
    margin: '1.25rem',
    background: AppThemeConstants.ticketColor,
    borderRadius: AppThemeConstants.primaryRadius,
    padding: '2.5rem',
  },

  buttonWrapper: {
    width: 'fit-content',
  },
  [MediaBreakPoints.Tablet]: {
    link: {
      width: '100%',
      marginBottom: '12px',
      borderRadius: theme.primaryRadius,
      backgroundColor: theme.inputBackground,
      border: `1px solid ${theme.borderDark}`,
      whiteSpace: 'nowrap',
    },
    buttonWrapper: {
      width: '100%',
    },
    button: {
      height: '40px',
    },

    linkAndButtonWrapper: {
      borderRadius: 0,
      backgroundColor: 'transparent',
      border: 0,
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: 0,
      width: '100%',
      height: 'auto',
    },
  },
}))
