import { createUseStyles } from 'react-jss'
import { AppTheme } from '../../../types/style.types'

export const profileHeaderUseStyles = createUseStyles((theme: AppTheme) => ({
  header: {
    height: '3.75rem',
    boxSizing: 'border-box',
    backgroundColor: theme.ticketColor,
    borderBottom: `1px solid ${theme.borderDark}`,
  },

  profileImage: {
    display: 'block',
    borderRadius: theme.primaryRadius,
  },

  moneyText: {
    marginRight: '0.5rem',
    color: theme.textColor,
  },
}))
