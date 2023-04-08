import { createUseStyles } from 'react-jss'
import { AppTheme } from '../../../../shared/types/style.types'
import { MediaBreakPoints } from '../../../../shared/constants/style.constants'

export const withdrawalModalContentUseStyles = createUseStyles(
  (theme: AppTheme) => ({
    title: {
      color: theme.textColor,
      fontSize: '16px',
      lineHeight: '22px',
      fontWeight: '700',
      marginBottom: '40px',
    },
    subTitle: {
      color: theme.textColor,
      fontSize: '16px',
      lineHeight: '22px',
      fontWeight: '500',
      marginBottom: '8px',
    },
    input: {
      // height: '40px',
      lineHeight: '15px',
      fontSize: '14px',
    },
    description: {
      color: theme.textDarker,
      fontSize: '14px',
      lineHeight: '17px',
      fontWeight: '400',
      marginBottom: '8px',
    },
    amount: {
      color: theme.textColor,
      fontSize: '30px',
      lineHeight: '37px',
      fontWeight: '600',
    },
    cardWrapperResponsive: {
      background: 'rgba(31, 36, 49, 0.5)',
      border: `1px solid ${theme.inputStroke}`,
      width: '100%',
      borderRadius: '8px',
      padding: '20px 10px',
      boxSizing: 'border-box',
    },

    cardLogoWrapperResponsive: {
      width: '200px',
      marginBottom: '32px',
    },
    responsiveHeaderText: {
      fontWeight: '400',
      fontSize: '13px',
      lineHeight: '16px',
      color: theme.textColor,
      marginBottom: '8px',
    },
    cardIconLogo: {
      position: 'absolute',
      right: '9px',
      zIndex: '999',
      top: '32px',
    },
    inputWrapper: {
      marginBottom: '32px',
      width: '100%',
      flexBasis: '330px',
    },
    [MediaBreakPoints.Laptop]: {
      inputWrapper: {
        flexBasis: 'unset',
      },
    },
  })
)
