import { createUseStyles } from 'react-jss'
import { MediaBreakPoints } from 'src/modules/shared/constants/style.constants'
import { AppTheme } from '../../../shared/types/style.types'

export const emptyStatesUseStyles = createUseStyles((theme: AppTheme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'rgba(31, 36, 49, 0.5)',
    borderRadius: '8px',
    marginTop: '40px',
  },
  img: {
    marginBottom: '40px',
  },
  text: {
    marginTop: '2rem',
    marginBottom: '2.5rem',
    fontSize: '1rem',
    fontWeight: '500',
    color: theme.whiteColor,
  },

  container: {
    marginTop: '2rem',
    fontWeight: 500,
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: '1.25rem',
  },

  editBtnWrapper: {
    width: '192px',
    margin: '24px 0 40px',
  },
  button: {
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
  editBtn: {
    marginTop: '12px',
    padding: '5px 16px 5px 16px',
  },
  [MediaBreakPoints.Tablet]: {
    container: {
      maxWidth: '355px',
    },
    wrapper: {
      paddingLeft: '32px',
      paddingRight: '32px',
    },
  },
}))
