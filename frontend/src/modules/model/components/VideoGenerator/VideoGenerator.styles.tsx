import { createUseStyles } from 'react-jss'
import { MediaBreakPoints } from 'src/modules/shared/constants/style.constants'
import { AppTheme } from 'src/modules/shared/types/style.types'

export const videoGeneratorUseStyles = createUseStyles((theme: AppTheme) => ({
  videoWrapper: {
    display: 'flex',
    height: '100%',
    border: `1px solid ${theme.borderDark}`,
    padding: '5px',
    margin: '32px 0 0 0',
    borderRadius: '13px',
  },
  brokenUrlWrapper: {
    background: '#212530',
    borderRadius: '8px',
    width: '100%',
    height: '100%',
    padding: '270px 0',
  },
  brokenUrlDescription: {
    fontWeight: '500',
    fontSize: '16px',
    lineHeight: '20px',
    color: '#FFFFFF',
    marginLeft: '34px',
  },
  [MediaBreakPoints.Mobile390To430]: {
    videoWrapper: {
      height: '100%',
    },
  },
}))
