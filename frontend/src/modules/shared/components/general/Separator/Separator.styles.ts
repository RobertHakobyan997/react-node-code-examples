import { createUseStyles } from 'react-jss'
import { AppTheme } from 'src/modules/shared/types/style.types'

export const separatorUseStyles = createUseStyles((theme: AppTheme) => ({
  separator: {
    borderTop: `0.5px solid ${theme.borderDark}`,
    width: '100%',
  },
}))
