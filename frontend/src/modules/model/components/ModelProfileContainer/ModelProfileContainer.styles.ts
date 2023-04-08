import { createUseStyles } from 'react-jss'
import { AppTheme } from '../../../shared/types/style.types'
import { MediaBreakPoints } from '../../../shared/constants/style.constants'

export const profileContainerUseStyles = createUseStyles((theme: AppTheme) => ({
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    columnGap: '20px',
    marginBottom: '20px',
    marginTop: '20px',
  },
  [MediaBreakPoints.Tablet]: {
    wrapper: {
      flexWrap: 'wrap',
      gridTemplateColumns: '100%',
      rowGap: '20px',
    },
  },
}))
