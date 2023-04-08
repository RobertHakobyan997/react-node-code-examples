import { createUseStyles } from 'react-jss'
import { AppTheme } from '../../../types/style.types'
import {
  BreakPointSize,
  MediaBreakPoints,
} from '../../../constants/style.constants'
import { PopupVariant } from 'src/modules/shared/types/modal.types'

export const popupUseStyles = createUseStyles((theme: AppTheme) => ({
  wrapper: {
    maxWidth: '400px',
    width: '100%',
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 999,
  },

  contentError: {
    gap: '0 12px',
    padding: '1rem',
    background: theme.popupBackground,
    borderRadius: theme.primaryRadius,
  },
  contentRegular: {
    composes: '$contentError',
    background: theme.inputBackground,
  },
  popupTextStyle: {
    fontWeight: 400,
    fontSize: '12px',
    color: ({ variant }: { variant: PopupVariant }) => {
      switch (variant) {
        case PopupVariant.Regular:
          return theme.textColor
        case PopupVariant.Error:
          return 'rgba(0, 0, 0, 0.85)'
        default:
          return theme.textColor
      }
    },
  },

  [MediaBreakPoints.Mobile]: {
    wrapper: {
      maxWidth: 'none',
      width: 'calc(100% - 30px)',
    },
  },

  [`@media (min-width: ${BreakPointSize.Mobile}px) and (max-width: ${BreakPointSize.Tablet}px)`]:
    {
      wrapper: {
        maxWidth: '400px',
        width: '90%',
      },
    },
}))
