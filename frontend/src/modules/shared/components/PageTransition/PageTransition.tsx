import { ComponentWithChildren } from '../../types/component.types'
import { useLayoutEffect, useState } from 'react'
import { pageTransitionUseStyles } from './PageTransition.styles'
import { useLocation } from 'react-router-dom'

const AnimationTimeout = 400

export const ProvideTransition = ({ children }: ComponentWithChildren) => {
  const { pathname } = useLocation()

  const [isAnimating, setIsAnimating] = useState(false)

  const styles = pageTransitionUseStyles({
    isAnimating,
    cssTransition: AnimationTimeout,
  })

  useLayoutEffect(() => {
    setIsAnimating(false)
  }, [pathname])

  return (
    <div
      className={styles.wrapper}
      onTransitionEnd={() => {
        setTimeout(() => {
          setIsAnimating(false)
        }, 400)
      }}
    >
      {!isAnimating && children}
    </div>
  )
}
