import { createUseStyles } from 'react-jss'
import { AppTheme } from 'src/modules/shared/types/style.types'

export const tableUseStyles = createUseStyles((theme: AppTheme) => ({
  wrapper: {
    border: `1px solid ${theme.borderDark}`,
    borderRadius: theme.primaryRadius,
    background: theme.ticketColor,
    flexGrow: '1',
    flexBasis: 0,
  },
  titleWrapper: {
    padding: '2rem 2rem 0 2rem',
  },

  title: {
    color: theme.textColor,
    marginBottom: '10px',
    fontWeight: '700',
    fontSize: '20px',
  },

  table: {
    color: theme.textColor,
    borderCollapse: 'separate',
    width: '100%',
  },

  thead: {
    border: `1px solid ${theme.inputStroke}`,
  },

  headTh: {
    background: theme.tableTitle,
    fontWeight: 600,
    fontSize: '16px',
    padding: '25px 20px',
    textAlign: 'left',
    border: `1px solid ${theme.inputBackground}`,
    '&:first-child': {
      borderRadius: ({ isUiSeparated }: { isUiSeparated?: boolean }) =>
        isUiSeparated ? `${theme.primaryRadius} 0 0 0` : 0,
    },

    '&:last-child': {
      borderRadius: ({ isUiSeparated }: { isUiSeparated?: boolean }) =>
        isUiSeparated ? `0 ${theme.primaryRadius} 0 0` : 0,
    },

    '&:not(:first-child)': {
      borderLeft: 0,
    },
    '&:not(:last-child)': {
      borderRight: 0,
    },
  },

  td: {
    fontWeight: '400',
    verticalAlign: 'middle',
    fontSize: '16px',
    padding: '25px 20px',
    background: theme.ticketColor,
    borderBottom: '1px solid #1F2431',
  },

  tr: {
    '&:last-child > td:first-child': {
      borderRadius: `0 0 0 ${theme.primaryRadius}`,
    },

    '&:last-child > td:last-child': {
      borderRadius: `0 0 ${theme.primaryRadius} 0`,
    },
  },
}))
