import { createUseStyles } from 'react-jss'
import { AppTheme } from '../../types/style.types'
import { MediaBreakPoints } from '../../constants/style.constants'

export const authorizationUseStyles = createUseStyles((theme: AppTheme) => ({
  headerText: {
    textAlign: 'center',
    fontSize: '20px',
    color: theme.textColor,
    marginBottom: '4px',
  },

  descriptionText: {
    composes: ['$headerText'],
    color: theme.textDarker,
    fontSize: '16px',
  },

  authorizationWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0 5px',
  },

  codeText: {
    color: theme.textColor,
    fontSize: '0.875rem',
  },

  [MediaBreakPoints.Tablet]: {
    headerText: {
      textAlign: 'left',
    },

    descriptionText: {
      textAlign: 'left',
    },
  },
}))
