import { createUseStyles } from 'react-jss'
import { AppTheme } from '../../../shared/types/style.types'
import { MediaBreakPoints } from 'src/modules/shared/constants/style.constants'
import { PriceRendererVariant } from 'src/modules/model/components/SubscriptionAndPaymentRenderer/SubscriptionAndPurchaseRenderer'

interface SubscriptionAndPurchaseStyleProps {
  variant?: PriceRendererVariant
}

export const subscriptionAndPurchaseUseStyles = createUseStyles(
  (theme: AppTheme) => ({
    wrapper: {
      maxWidth: '344px',
      backgroundColor: 'rgba(31, 36, 49, 0.5)',
      border: `1px solid ${theme.inputStroke}`,
      borderRadius: '8px',
      padding: '10px 24px',
      paddingBottom: '22px',
      boxSizing: 'border-box',
      width: '100%',
    },

    linkButton: {
      color: theme.textColor,
      height: '20px',
    },

    planLayout: {
      display: 'flex',
      flexDirection: 'column',
    },

    contentName: {
      fontWeight: '700',
      fontSize: '1rem',
      lineHeight: '1.25rem',
      color: theme.textColor,
    },

    imageButton: {
      marginTop: '0.875rem',
    },

    imageContent: {
      maxWidth: '100%',
      width: '296px',
      height: '220px',
      display: 'block',
      objectFit: 'cover',
      objectPosition: 'center',
      borderRadius: theme.primaryRadius,
    },

    currencyWrapper: {
      marginTop: '0.625rem',
    },

    contentPrice: {
      color: '#FDFDFD',
      fontWeight: 600,
      fontSize: ({ variant }: SubscriptionAndPurchaseStyleProps) =>
        variant === PriceRendererVariant.Small ? '25px' : '28px',
      lineHeight: '32px',
    },

    contentDuration: {
      fontSize: ({ variant }: SubscriptionAndPurchaseStyleProps) =>
        variant === PriceRendererVariant.Small ? '14px' : '15px',
      color: theme.textDarker,
      lineHeight: '24px',
      marginLeft: '5px',
    },

    contentDescription: {
      color: theme.textDarker,
      fontSize: '14px',
      marginTop: '8px',
      maxWidth: '348px',
      lineBreak: 'anywhere',
    },
    contentLink: {
      marginLeft: '14px',
      color: theme.textColor,
      fontSize: '1rem',
      lineHeight: '20px',
      textAlign: 'start',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      display: 'block',
      textOverflow: 'ellipsis',
    },

    contentLinkContainer: {
      display: 'flex',
      marginTop: '10px',
      flexDirection: 'row',
      alignItems: 'center',
    },

    settingsWrapper: {
      borderRadius: theme.primaryRadius,
      backgroundColor: theme.inputBackground,
      maxWidth: '180px',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0px 6px 10px rgba(27, 27, 27, 0.1)',
    },

    dialogWrapperPrimary: {
      zIndex: '99',
      position: 'absolute',
      left: '-20px',
      top: 'calc(100% + 29px)',
    },

    dialogWrapperSecondary: {
      zIndex: '99',
      position: 'absolute',
      left: 'auto',
      right: 'calc(-100% + 12px)',
      top: 'calc(100% + 29px)',
    },

    trianglePrimary: {
      width: 0,
      position: 'absolute',
      left: '24px',
      top: '-12px',
      borderLeft: `12px solid transparent`,
      borderRight: `12px solid transparent`,
      borderBottom: `12px solid ${theme.inputBackground}`,
    },

    triangleSecondary: {
      composes: '$trianglePrimary',
      left: 'auto',
      right: '24px',
    },

    imageWrapper: {},

    [MediaBreakPoints.Tablet]: {
      wrapper: {
        maxWidth: '100%',
        padding: '12px 10px',
      },

      dialogWrapperPrimary: {
        left: 'auto',
        right: 'calc(-100% + 12px)',
      },

      planLayout: {
        flexDirection: 'row',
        gap: '0 14px',
        alignItems: 'center',
        marginTop: '12px',
      },

      currencyWrapper: {
        marginTop: 0,
      },

      contentDescription: {
        marginTop: '6px',
        fontSize: '12px',
      },

      contentLinkContainer: {
        marginTop: '7.5px',
      },

      imageWrapper: {
        width: '110px',
      },

      imageButton: {
        marginTop: 0,
        width: '110px',
      },

      imageContent: {
        width: '110px',
        height: '81px',
        objectFit: 'cover',
      },

      trianglePrimary: {
        left: 'auto',
        right: '24px',
      },

      contentDuration: {
        fontSize: '12px',
      },
    },
  })
)
