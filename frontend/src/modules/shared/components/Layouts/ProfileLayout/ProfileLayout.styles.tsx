import { createUseStyles } from 'react-jss'
import { AppTheme } from '../../../types/style.types'

export const profileLayoutUseStyles = createUseStyles((theme: AppTheme) => ({
  layoutWrapper: {
    maxWidth: '67.75rem',
    width: '100%',
    margin: 0,
  },
}))
