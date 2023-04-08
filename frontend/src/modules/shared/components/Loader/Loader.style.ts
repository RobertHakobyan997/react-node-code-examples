import { createUseStyles } from 'react-jss'

export const loaderUseStyles = createUseStyles({
  '@keyframes scale': {
    from: { transform: 'scale(1)' },
    to: { transform: 'scale(1.3)' },
  },

  loaderWrapper: {
    width: '100%',
    pointerEvents: 'unset',
    overflow: 'hidden',
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    top: 0,
    zIndex: 9999,
    backgroundColor: 'rgb(0 0 0 / 80%)',
    backdropFilter: 'blur(15px)',
    height: 'var(--screen-size)',
  },

  loader: {
    animation: '$scale 1s infinite alternate',
  },
})
