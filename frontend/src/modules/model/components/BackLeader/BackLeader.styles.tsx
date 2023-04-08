import { createUseStyles } from 'react-jss'
import { AppTheme } from 'src/modules/shared/types/style.types'

export const backLeaderStyles = createUseStyles((theme: AppTheme) => ({
  wrapper: {
    width: '100%',
    margin: '23px 0',
  },

  title: {
    color: theme.textColor,
    fontSize: '20px',
    lineHeight: '24px',
    marginLeft: '25.43px',
    fontWeight: 600,
  },
}))
