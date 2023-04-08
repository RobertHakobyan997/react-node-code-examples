import { createUseStyles } from 'react-jss'
import { AppTheme } from '../../../shared/types/style.types'
import { MediaBreakPoints } from 'src/modules/shared/constants/style.constants'

export const purchaseFormUseStyles = createUseStyles((theme: AppTheme) => ({
  formStyle: {
    width: '45rem',
    maxWidth: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  header: {
    fontSize: '20px',
    lineHeight: '24px',
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
  purchaseWrapperPayment: {
    composes: ['$purchaseWrapper'],
    marginTop: 0,
  },
  [MediaBreakPoints.Mobile]: {
    purchaseWrapper: { gridTemplateColumns: '1fr' },
  },
}))
