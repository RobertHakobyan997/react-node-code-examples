import { createUseStyles } from 'react-jss'
import { MediaBreakPoints } from 'src/modules/shared/constants/style.constants'
import { AppTheme } from 'src/modules/shared/types/style.types'

export const publicProfileStyles = createUseStyles((theme: AppTheme) => ({
  profileHeaderWrapper: {
    position: 'relative',
    width: 'inherit',
  },

  header: {
    height: '400px',
    background: 'rgba(49, 55, 69, 0.5)',
    width: '100%',
    borderRadius: theme.primaryRadius,
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: theme.primaryRadius,
    },
  },

  profilePictureNameDescriptionWrapper: {
    textAlign: 'center',
    marginTop: '100px',
  },

  publicPhotoWrapper: {
    lineHeight: 0,
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    top: '-80px',
  },

  profileImage: {
    height: '10rem',
    width: '10rem',
    borderRadius: '50%',
  },

  description: {
    maxWidth: '28rem',
    fontWeight: '500',
    margin: '0 auto',
    lineBreak: 'anywhere',
    fontSize: '14px',
    textAlign: 'center',
    lineHeight: '20px',
    marginTop: '8px',
    color: theme.textColor,
  },
  name: {
    maxWidth: '448px',
    color: theme.textColor,
    fontWeight: '700',
    fontSize: '20px',
    lineHeight: '24px',
    textAlign: 'center',
  },

  editBtnWrapper: {
    width: '100%',
    marginTop: '12px',
    position: ({ isResponsive }: { isResponsive?: boolean }) =>
      isResponsive ? 'static' : 'absolute',
    display: 'flex',
    justifyContent: ({ isResponsive }: { isResponsive?: boolean }) =>
      isResponsive ? 'center' : 'flex-end',
  },

  editBtn: {
    padding: '5px 16px 5px 16px',
    width: '192px',
    maxWidth: '100%',
  },
  buttonContentWrapper: {
    width: 'fit-content',
    display: 'flex',
    alignItems: 'center',
    '& > span': {
      marginLeft: '8px',
      fontWeight: '500',
      fontSize: '16px',
      color: '#FDFDFD',
    },
  },
  [MediaBreakPoints.Laptop]: {
    profilePicture: {
      width: '120px',
      height: '120px',
    },

    description: { lineHeight: '20px', fontWeight: 500 },

    profileHeaderWrapper: {
      position: 'relative',
    },

    editBtn: {
      width: '192px',
      maxWidth: '100%',
    },
  },
  [MediaBreakPoints.Tablet]: {
    profilePictureNameDescriptionWrapper: {
      width: '100%',
      maxWidth: '292px',
    },

    name: {
      width: '100%',
      maxWidth: '292px',
    },
  },
}))
