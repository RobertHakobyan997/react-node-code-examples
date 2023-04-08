import { MediaBreakPoints } from 'src/modules/shared/constants/style.constants'
import { createUseStyles } from 'react-jss'
import { AppTheme } from 'src/modules/shared/types/style.types'

export const socialLinksUseStyles = createUseStyles((theme: AppTheme) => ({
  wrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2,minmax(0, 532px))',
    justifyContent: 'center',
    gap: '0.625rem 1.25rem',
    marginTop: '32px',
  },

  socialLinksSmallWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '20px',
    width: '100%',
    marginTop: '32px',
  },

  smallSocialLinkButton: {
    borderRadius: '50%',
    width: '58px',
    height: '58px',
  },

  container: {
    display: 'flex',
    maxWidth: '532px',
    flexDirection: 'row',
    background: 'rgba(31, 36, 49, 0.5)',
    padding: '12px',
    alignItems: 'center',
    height: '44px',
    borderRadius: '8px',
    border: `1px solid ${theme.borderDark}`,
    '&:hover': {
      background: ' rgba(45, 52, 72, 0.5)',
    },
  },

  socialIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '46px',
  },

  socialIconImage: {
    width: '32px',
  },
  link: {
    fontWeight: '500',
    fontSize: '18px',
    marginLeft: '10px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    cursor: 'pointer',
    '& a': {
      color: '#FDFDFD',
      textDecoration: 'none',
    },
  },
  copyIcon: {
    marginLeft: '18px',
    display: 'flex',
    alignItems: 'center',
  },

  linkIcon: {
    width: '20px',
    height: '20px',
  },

  [MediaBreakPoints.Tablet]: {
    wrapper: {
      gridTemplateColumns: 'minmax(0, 1fr)',
    },

    socialLinksSmallWrapper: {
      gridTemplateColumns: ({ isItemsLess }: { isItemsLess: boolean }) =>
        isItemsLess ? '' : 'repeat(3, minmax(0, 1fr))',
    },

    container: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    copyIcon: {
      marginLeft: '14px',
    },
    link: {
      fontSize: '16px',
    },
    linkIcon: {
      width: '18px',
      height: '18px',
    },
  },
}))
