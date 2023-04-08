import { createUseStyles } from 'react-jss'
import { AppTheme } from 'src/modules/shared/types/style.types'
import { MediaBreakPoints } from 'src/modules/shared/constants/style.constants'

export const planPurchaseAndSubscriptionsStyles = createUseStyles(
  (theme: AppTheme) => ({
    header: {
      height: '400px',
      background: 'rgba(49, 55, 69, 0.5)',
      position: 'relative',
    },
    profilePicture: {
      borderRadius: '100%',
      position: 'absolute',
      left: '50%',
      top: '100%',
      transform: 'translate(-50%, -50%)',
    },
    name: {
      fontWeight: '700',
      fontSize: '24px',
      lineHeight: '29px',
      color: theme.textColor,
      marginTop: '20px',
      textAlign: 'center',
    },
    planTab: {
      // paddingTop: '32px',
      display: 'flex',
      justifyContent: 'space-between',
    },
    activeTab: {
      color: `${theme.primaryColor}`,
      borderBottom: `2px solid ${theme.primaryColor}`,
    },
    plansWrapper: {
      boxSizing: 'border-box',
      width: '100%',
      marginTop: '20px',
      border: `1px solid ${theme.borderDark}`,
      borderRadius: '8px',
      padding: '20px',
      background: '#141720',
      justifyContent: 'flex-start',
      flexDirection: 'column',
    },
    emptyState: {
      textAlign: 'center',
    },
    [MediaBreakPoints.Laptop]: {
      plansWrapper: {
        justifyContent: 'center',
        padding: '10px',
      },
    },
  })
)
