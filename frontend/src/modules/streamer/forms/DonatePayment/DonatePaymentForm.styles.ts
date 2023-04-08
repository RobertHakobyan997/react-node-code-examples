import { createUseStyles } from 'react-jss'
import { AppTheme } from 'src/modules/shared/types/style.types'
import { globalStyles } from 'src/styles/global.styles'
import { MediaBreakPoints } from 'src/modules/shared/constants/style.constants'

interface DonatePaymentFormStylesProps {
  isModal: boolean
}

export const donatePaymentFormUseStyles = createUseStyles(
  (theme: AppTheme) => ({
    form: {
      ...globalStyles.form,
      padding: ({ isModal }: DonatePaymentFormStylesProps) =>
        isModal ? 0 : '24px 0',
      maxWidth: ({ isModal }: DonatePaymentFormStylesProps) =>
        isModal ? '720px' : 'calc(100% - 30px)',
      marginTop: ({ isModal }: DonatePaymentFormStylesProps) =>
        isModal ? 0 : '160px',
    },

    formContentWrapper: {
      width: ({ isModal }: DonatePaymentFormStylesProps) =>
        isModal ? '720px' : '680px',
      maxWidth: '100%',
    },

    priceWrapper: {
      display: 'flex',
      gap: '0 20px',
      width: '100%',
    },
    amountWrapper: {
      maxWidth: 'calc(50% - 10px)',
      flexShrink: 0,
    },
    priceWithCommision: {
      color: '#FDFDFD',
      fontWeight: '600',
      fontSize: '20px',
      lineHeight: '24px',
    },
    header: {
      fontWeight: '700',
      fontSize: '20px',
      lineHeight: '24px',
      color: theme.textColor,
      paddingBottom: '8px',
    },
    checkboxWrapper: {
      margin: '20px 0',
    },

    [MediaBreakPoints.Tablet]: {
      header: {
        fontSize: '18px',
        lineHeight: '22px',
      },

      amountWrapper: {
        maxWidth: '100%',
      },

      priceWrapper: {
        flexDirection: 'column',
        gap: '32px 0',
      },
    },
  })
)
