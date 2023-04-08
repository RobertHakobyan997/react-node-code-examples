import { createUseStyles } from 'react-jss'
import { AppTheme } from 'src/modules/shared/types/style.types'

export const successModalStyles = createUseStyles((theme: AppTheme) => ({
  wrapper: {
    background: theme.modalBackground,
    border: `1px solid ${theme.borderDark}`,
    boxShadow: '0px 6px 10px rgba(20, 20, 20, 0.15)',
    borderRadius: theme.primaryRadius,
    padding: '24px 20px',
    width: '351px',
    maxWidth: '100%',
  },

  successIconWrapper: {
    margin: '35px 0 28px 0',
  },

  text: {
    fontWeight: '700',
    fontSize: '20px',
    lineHeight: '24px',
    color: theme.textColor,
    textAlign: 'center',
  },
}))
