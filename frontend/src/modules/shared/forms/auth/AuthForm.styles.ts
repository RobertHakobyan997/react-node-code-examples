import { createUseStyles } from 'react-jss'
import { AppTheme } from '../../types/style.types'

export const authFormUseStyles = createUseStyles((theme: AppTheme) => ({
  legend: {
    color: theme.textColor,
    width: '100%',
    textAlign: 'center',
    margin: '20px 0',
  },
}))
