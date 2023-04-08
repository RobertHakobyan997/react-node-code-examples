import { createUseStyles } from 'react-jss'
import { MediaBreakPoints } from 'src/modules/shared/constants/style.constants'
import { AppTheme } from 'src/modules/shared/types/style.types'

export const publicModelStyles = createUseStyles((theme: AppTheme) => ({
  header: {
    background: 'rgba(31, 36, 49, 0.5)',
    borderBottom: `1px solid ${theme.borderDark}`,
    height: '60px',
  },
  wrapper: {
    width: '100%',
    maxWidth: '67.75rem',
    margin: 'auto',
    color: '#fff',
    marginTop: ({ isMyProfile }: { isMyProfile: boolean }) =>
      isMyProfile ? 0 : '20px',
  },

  donateBtn: {
    maxWidth: '18.5rem',
    width: '100%',
  },

  [MediaBreakPoints.Laptop]: {
    wrapper: {
      maxWidth: 'calc(100% - 30px)',
    },
    donateBtn: {
      marginTop: '0',
    },
  },
}))
