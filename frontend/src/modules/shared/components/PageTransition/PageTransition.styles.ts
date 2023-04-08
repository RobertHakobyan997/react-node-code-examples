import { createUseStyles } from 'react-jss'

export const pageTransitionUseStyles = createUseStyles({
  wrapper: {
    opacity: ({
      isAnimating,
    }: {
      isAnimating: boolean
      cssTransition: number
    }) => (isAnimating ? 0 : 1),
    width: '100%',
    height: 'var(--screen-size)',
    transition: ({ cssTransition }: { cssTransition: number }) =>
      `opacity ${cssTransition}ms ease`,
  },
})
