import { createUseStyles } from 'react-jss'
import { AppTheme } from 'src/modules/shared/types/style.types'

interface LogLayoutPropsStyles {
  isUiSeparated?: boolean
}

export const logLayoutUseStyles = createUseStyles((theme: AppTheme) => ({
  buttonWrapper: {
    paddingTop: '15px',
    paddingBottom: '15px',
    paddingRight: '25px',
    display: 'flex',
    justifyContent: 'flex-end',
  },

  wrapper: {
    overflow: 'hidden',
    background: ({ isUiSeparated }: LogLayoutPropsStyles) =>
      isUiSeparated ? '' : theme.ticketColor,
    borderRadius: ({ isUiSeparated }: LogLayoutPropsStyles) =>
      isUiSeparated
        ? `${theme.primaryRadius} ${theme.primaryRadius} 0 0`
        : theme.primaryRadius,
  },

  buttonContentWrapper: {
    color: theme.textColor,

    transition: '0.2s color',
    '&:hover': {
      color: theme.primaryColor,
    },
  },

  logHeaderWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
    padding: '20px 25px',
  },
  headerText: {
    fontSize: '20px',
    lineHeight: '24px',
    color: theme.textColor,
    fontWeight: 700,
  },
  buttonText: {
    marginRight: '20px',
    fontSize: '16x',
    lineHeight: '20px',
    fontWeight: 500,
  },

  tabWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '20px',
  },
}))
