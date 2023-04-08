import { createUseStyles } from 'react-jss'
import { AppTheme } from 'src/modules/shared/types/style.types'

export const responsiveLogListUseStyles = createUseStyles(
  (theme: AppTheme) => ({
    contentWrapper: {
      background: theme.ticketColor,
      border: `1px solid ${theme.inputBackground}`,

      '&:last-child': {
        borderRadius: `0 0 ${theme.primaryRadius} ${theme.primaryRadius}`,
      },

      '&:not(:last-child):fist-child': {
        borderRadius: ({
          isUiSeparated,
        }: {
          isUiSeparated?: boolean
          isOpen: boolean
        }) =>
          isUiSeparated
            ? `${theme.primaryRadius} ${theme.primaryRadius} 0 0`
            : 0,
      },

      '&:not(:last-child)': {
        borderBottom: 0,
      },
    },
    firstItemWrapper: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      padding: '0 12px',
      height: '60px',
      // boxSizing: 'border-box',
      borderBottom: ({ isOpen }: { isOpen: boolean }) =>
        isOpen ? `1px solid ${theme.inputBackground}` : 0,
    },

    itemWrapper: {
      composes: '$firstItemWrapper',
      borderBottom: 0,
    },
    firstTitle: {
      color: theme.textColor,
      fontSize: '1rem',
      lineHeight: '20px',
      fontWeight: 600,
      marginLeft: '10px',
    },

    title: {
      composes: ['$firstTitle'],
      marginLeft: '34px',
    },
    content: {
      color: theme.textColor,
      fontSize: '16px',
      lineHeight: '20px',
      fontWeight: 400,
      marginLeft: '20px',
      lineBreak: 'anywhere',
    },
  })
)

export const ButtonStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '24px',
  height: '24px',
  padding: 0,
}
