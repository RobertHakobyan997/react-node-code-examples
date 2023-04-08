import { createUseStyles } from 'react-jss'
import { AppTheme } from 'src/modules/shared/types/style.types'

export const emptyLogUseStyles = createUseStyles((theme: AppTheme) => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderTop: `1px solid ${theme.inputBackground}`,
    borderRadius: `0 0 ${theme.primaryRadius} ${theme.primaryRadius}`,
    background: ({ isUiSeparated }: { isUiSeparated: boolean }) =>
      isUiSeparated ? '' : theme.ticketColor,
  },

  contentWrapper: {
    padding: '50px 0',
  },
}))
