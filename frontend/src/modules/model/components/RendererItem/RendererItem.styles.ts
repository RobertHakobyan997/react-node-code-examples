import { createUseStyles } from 'react-jss'
import { AppTheme } from 'src/modules/shared/types/style.types'
import { MediaBreakPoints } from 'src/modules/shared/constants/style.constants'

export const renderPlanItemStyles = createUseStyles((theme: AppTheme) => ({
  wrapper: {
    borderRadius: '8px',
    background: 'rgba(31, 36, 49, 0.5)',
    padding: '20px',
    boxSizing: 'border-box',
    border: `1px solid ${theme.inputStroke}`,
    '&:not(:first-child)': {
      marginTop: '20px',
    },
  },
  joinBtn: {
    marginTop: '10px',
    width: '296px',
  },
  contentWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  imageWrapper: {
    marginRight: '32px',
  },

  image: {
    width: '174px',
    height: '131px',
    borderRadius: theme.primaryRadius,
  },

  rightPartWrapper: {
    overflow: 'hidden',
  },

  title: {
    color: theme.textColor,
    fontWeight: '700',
    fontSize: '16px',
    marginBottom: '10px',
    display: 'inline-block',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign: 'left',
  },

  price: {
    color: theme.textColor,
    fontWeight: 600,
    fontSize: '25px',
    margin: '0 0.5rem',
    lineHeight: '2rem',
  },

  currency: {
    fontSize: '14px',
    marginRight: '8px',
    fontWeight: '500',
  },
  duration: {
    color: theme.textDarker,
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '24px',
  },

  description: {
    color: theme.textDarker,
    fontWeight: '400',
    fontSize: '14px',
    marginTop: '12px',
    textAlign: 'left',
    lineHeight: '20px',
    maxWidth: '45.75rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
  },

  titleResponsive: {
    composes: '$title',
    display: 'none',
  },

  [MediaBreakPoints.Tablet]: {
    wrapper: {
      padding: '12px 10px',
    },

    title: {
      display: 'none',
    },

    imageWrapper: {
      marginRight: '14px',
    },

    titleResponsive: {
      display: 'block',
      marginBottom: '12px',
    },

    image: {
      width: '110px',
      height: '81px',
    },
    joinBtn: {
      width: '100%',
    },
  },
}))
