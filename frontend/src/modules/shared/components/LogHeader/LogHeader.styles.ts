import { createUseStyles } from 'react-jss'
import { AppTheme } from 'src/modules/shared/types/style.types'
import { MediaBreakPoints } from 'src/modules/shared/constants/style.constants'

export const logHeaderUseStyles = createUseStyles((theme: AppTheme) => ({
  wrapper: {
    border: `1px solid ${theme.borderDark}`,
    borderRadius: ({ hasLogs }: { hasLogs?: boolean }) =>
      hasLogs
        ? `${theme.primaryRadius} ${theme.primaryRadius} 0 0`
        : theme.primaryRadius,
    background: '#181d28',
    marginTop: '1.25rem',
    flexGrow: 1,
    flexBasis: 0,

    borderBottom: ({ hasLogs }: { hasLogs?: boolean }) =>
      hasLogs ? 0 : `1px solid ${theme.borderDark}`,
  },

  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    padding: '20px 32px',
  },

  buttonWrapper: {
    width: 'max-content',
  },
  title: {
    color: theme.textColor,
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '24px',
  },

  [MediaBreakPoints.Tablet]: {
    buttonWrapper: {
      width: '100%',
    },

    title: {
      marginBottom: '10px',
    },

    titleWrapper: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
  },
}))
