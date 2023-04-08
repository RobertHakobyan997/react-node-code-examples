import { createUseStyles } from 'react-jss'
import { AppTheme } from '../../../types/style.types'
import { MediaBreakPoints } from 'src/modules/shared/constants/style.constants'

export const imageUploadUseStyles = createUseStyles((theme: AppTheme) => ({
  container: {
    marginTop: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  wrapper: {
    marginTop: '2rem',
  },

  imageWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },

  uploadWrapper: {
    marginTop: '8px',
    // border: `1px dashed ${theme.inputStroke}`,
    backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%2338425CFF' stroke-width='2' stroke-dasharray='6%2c 10' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
    background: theme.inputBackground,
    color: theme.textDarker,
    borderRadius: theme.primaryRadius,
    padding: '20px 0',
    height: '120px',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  label: {
    color: theme.textColor,
    fontSize: '0.8125rem',
  },

  input: {
    display: 'none',
  },

  inputWrapper: {
    cursor: 'pointer',
    padding: '20px 0',
    fontSize: '14px',
  },

  stateText: {
    maxWidth: '89px',
    width: '100%',
    textAlign: 'center',
    fontSize: '0.875rem',
    color: theme.whiteColor,
  },

  image: {
    width: '2.5rem',
    maxHeight: '3.75rem',
    objectFit: 'cover',
    borderRadius: theme.primaryRadius,
  },

  imageMessage: {
    marginTop: '0.25rem',
    fontSize: '13px',
    color: theme.textDarker,
    lineHeight: '1rem',
  },

  imageFullText: {
    fontSize: '1rem',
    lineHeight: '1.25rem',
    color: theme.textColor,
    margin: '0 0.25rem',
  },

  errorWrapper: {
    position: 'relative',
    top: '4px',
  },

  errorText: {
    color: theme.dangerColor,
    fontSize: `13px`,
  },

  smallImage: {
    width: '60px',
    height: '45px',
    objectFit: 'cover',
    borderRadius: theme.primaryRadius,
    marginRight: '12px',
  },

  uploadButton: {},

  [MediaBreakPoints.Tablet]: {
    label: {
      width: '100%',
      marginTop: '12px',
    },

    container: {
      flexDirection: 'column',
    },
    imageWrapper: {
      justifyContent: 'space-between',
    },

    uploadButton: {
      padding: '7.5px 0',
    },
  },
}))
