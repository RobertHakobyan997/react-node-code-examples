import { createUseStyles } from 'react-jss'
import { AppTheme } from '../../../shared/types/style.types'
import { MediaBreakPoints } from '../../../shared/constants/style.constants'

export const subscriptionFormUseStyles = createUseStyles((theme: AppTheme) => ({
  formStyle: {
    width: '45rem',
    maxWidth: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  header: {
    fontSize: '18px',
    lineHeight: '22px',
    fontWeight: 700,
    color: theme.textColor,
  },

  purchaseWrapper: {
    marginTop: '32px',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    columnGap: '20px',
  },

  [MediaBreakPoints.Tablet]: {
    purchaseWrapper: { gridTemplateColumns: '1fr', gap: '32px 0' },
  },
}))
