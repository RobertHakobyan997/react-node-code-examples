import { createUseStyles } from 'react-jss'
import { AppTheme } from 'src/modules/shared/types/style.types'
import { MediaBreakPoints } from 'src/modules/shared/constants/style.constants'

export const editProfilePhotoUseStyles = createUseStyles((theme: AppTheme) => ({
  header: {
    background: 'rgba(31, 36, 49, 0.5)',
    borderBottom: `1px solid ${theme.borderDark}`,
    height: '60px',
  },
  wrapper: {
    width: '45rem',
    maxWidth: '100%',
    background: '#1A1E29',
    margin: 'auto',
    color: '#fff',
    border: '1px solid #262C36',
    boxShadow: '0px 6px 10px rgba(20, 20, 20, 0.15)',
    borderRadius: '8px',
    padding: '24px 20px',
  },

  imageTitle: {
    marginBottom: '8px',
  },
  cropperWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(0,0,0,0.5)',
  },

  title: {
    fontWeight: '700',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#FDFDFD',
  },
  message: {
    fontWeight: '400',
    fontSize: '13px',
    lineHeight: '16px',
    color: '#8C8C8C',
    marginBottom: '40px',
  },
  cropControls: {
    // marginTop: '32px',
    display: 'flex',
    // paddingTop: '20px',
    // borderTop: ' 1px solid #38425C',
  },
  incDecBtn: {
    background: 'inherit',
    color: '#FFFFFF',
    border: 'none',
  },
  rangeInput: {
    width: '292px',
    height: '10px',
  },
  rangeInputsTitle: {
    paddingLeft: '6px',
    fontWeight: '400',
    fontSize: '13px',
    lineHeight: '16px',
    color: '#FDFDFD',
  },
  rotateActionsWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  rotateActionButton: {
    color: theme.whiteColor,
    '&:active': {
      color: theme.primaryColor,
    },
  },

  divider: {
    marginTop: '20px',
    marginBottom: '20px',
    borderBottom: `1px solid ${theme.inputStroke}`,
  },

  actionButtonWrapper: {
    marginTop: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '0 20px',
  },

  actionButton: {
    width: 'max-content',
  },

  [MediaBreakPoints.Tablet]: {
    wrapper: {
      width: 'auto',
      maxWidth: '100%',
    },
  },
}))
