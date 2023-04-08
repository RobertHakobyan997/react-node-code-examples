import { createUseStyles } from 'react-jss'
import { AppTheme } from '../../../shared/types/style.types'
import { MediaBreakPoints } from 'src/modules/shared/constants/style.constants'

export const editProfilePersonalInfoUseStyles = createUseStyles(
  (theme: AppTheme) => ({
    form: {
      width: '100%',
      display: 'flex',
      flexBasis: '1084px',
    },

    formLayoutContent: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'start',
      gap: '0 84px',
      width: '100%',
    },
    profilePictureWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px 0',
    },
    profilePictureEditButton: {
      width: '160px',
      color: theme.primaryColor,
      borderColor: theme.primaryColor,
    },

    profilePicture: {
      width: '160px',
      height: '160px',
      borderRadius: '50%',
    },
    imageEditButton: {
      position: 'absolute',
      right: 0,
      bottom: 0,
    },

    formContentWrapper: {
      maxWidth: '680px',
    },

    wrapper: {
      width: '45rem',
      background: theme.modalBackground,
      border: `1px solid ${theme.borderDark}`,
      boxShadow: '0px 6px 10px rgba(20, 20, 20, 0.15)',
      borderRadius: theme.primaryRadius,
      padding: '1.5rem 1.625rem',
    },

    title: {
      color: theme.textColor,
      fontSize: '16px',
      lineHeight: '20px',
      fontWeight: '700',
    },

    socialLinksWrapper: {
      width: '100%',
      marginTop: '40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    addButton: {
      width: '112px',
    },

    videoTitle: {
      fontWeight: '700',
      fontSize: '1rem',
      lineHeight: '1.25rem',
      color: theme.textColor,
      marginBottom: '2rem',
    },

    description: {
      marginBottom: '2rem',
      fontWeight: '700',
      fontSize: '1rem',
      lineHeight: '1.25rem',
      color: theme.textColor,
    },

    socialLinkField: {
      marginTop: '32px',
      width: '100%',
    },

    deactivateButton: {
      marginTop: '2.5rem',
      color: theme.dangerColor,
      fontSize: '1rem',
      lineHeight: '1.25rem',
      fontWeight: 500,
    },
    editPhotoButton: {
      padding: '10px',
      border: '1px solid #42A5FE',
      borderRadius: '8px',
      color: '#42A5FE',
      fontWeight: '400',
      fontSize: '12px',
      lineHeight: '15px',
      cursor: 'pointer',
    },
    socialUrls: {
      position: 'relative',
      width: '100%',
    },
    editProfilePhotoWrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    socialIcon: {
      position: 'absolute',
      top: '30px',
      right: '12px',
    },
    [MediaBreakPoints.Tablet]: {
      socialLinksWrapper: {
        flexDirection: 'column',
        alignItems: 'flex-start',
      },

      form: {
        width: 'calc(100% - 30px)',
      },

      addButton: {
        width: '100%',
      },

      title: {
        marginBottom: '18px',
      },
    },
  })
)
