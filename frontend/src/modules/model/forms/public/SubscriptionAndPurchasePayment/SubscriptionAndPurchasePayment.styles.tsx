import { createUseStyles } from 'react-jss'
import { AppTheme } from '../../../../shared/types/style.types'
import { MediaBreakPoints } from 'src/modules/shared/constants/style.constants'

export const subscriptionPaymentUseStyles = createUseStyles(
  (theme: AppTheme) => ({
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
    title: {
      width: '100%',
      textAlign: 'left',
      color: theme.textColor,
      fontWeight: '700',
      fontSize: '18px',
      lineHeight: '22px',
    },

    purchaseWrapper: {
      marginTop: '32px',
      width: '100%',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      columnGap: '20px',
    },
    fieldsCombiner: {
      display: 'flex',
      gap: '0 20px',
      width: '100%',
    },
    purchaseWrapperPayment: {
      composes: ['$purchaseWrapper'],
      marginTop: 0,
    },
    planWrapper: {
      backgroundColor: '#242935',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
      width: 'inherit',
      marginTop: '40px',
      padding: '20px 12px',
      boxSizing: 'border-box',
      borderRadius: '8px',
    },

    image: {
      objectFit: 'contain',
    },

    planContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },

    planName: {
      fontWeight: 700,
      fontSize: '20px',
      lineHeight: '24px',
      color: theme.textColor,
    },
    description: {
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '20px',
      color: theme.textDarker,
      marginTop: '6px',
    },

    price: {
      fontWeight: 600,
      fontSize: '25px',
      lineHeight: '32px',
      color: theme.textColor,
      marginLeft: '8px',
    },

    duration: {
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '24px',
      color: theme.textDarker,
      marginLeft: '8px',
    },

    [MediaBreakPoints.Tablet]: {
      purchaseWrapper: { gridTemplateColumns: '1fr' },

      fieldsCombiner: {
        flexDirection: 'column',
        gap: '20px 0',
      },
    },
  })
)
