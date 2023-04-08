import { createUseStyles } from 'react-jss'
import { AppTheme } from 'src/modules/shared/types/style.types'

export const paginationUseStyles = createUseStyles((theme: AppTheme) => ({
  wrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '18px',
  },

  multipoint: {
    width: '32px',
    height: '32px',
    margin: '0 10px',
  },
}))
