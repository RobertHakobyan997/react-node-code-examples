import { createUseStyles } from 'react-jss'
import { MediaBreakPoints } from '../../constants/style.constants'
import { AppTheme } from '../../types/style.types'

export const deletedAccountUseStyles = createUseStyles((theme: AppTheme) => ({
  wrapper: {
    width: '100%',
    maxWidth: '1084px',
    margin: 'auto',
    color: '#fff',
    marginTop: '20px',
  },
  deletedAccountWrapper: {
    padding: '40px 0 32px 0',
    background: 'rgba(31, 36, 49, 0.5)',
    border: '1px solid #38425C',
    marginTop: '32px',
    borderRadius: '8px',
    // marginBottom: '32px',
    '& > p': {
      marginTop: '32px',
      fontWeight: '500',
      fontSize: '16px',
      lineHeight: '20px',
      textAlign: 'center',
      color: theme.whiteColor,
    },
  },
  [MediaBreakPoints.LargeScreen]: {
    wrapper: {
      maxWidth: '90%',
    },
  },
}))
