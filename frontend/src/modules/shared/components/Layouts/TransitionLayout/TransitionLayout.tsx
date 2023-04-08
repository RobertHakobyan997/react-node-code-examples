import { ComponentWithChildren } from 'src/modules/shared/types/component.types'
import { useEffect, useRef } from 'react'
import gsap, { Power3 } from 'gsap'
import { useLocation } from 'react-router-dom'

export function TransitionLayout({ children }: ComponentWithChildren) {
  const pageRef = useRef(null)

  const { pathname } = useLocation()

  useEffect(() => {
    if (pageRef.current)
      gsap.to(pageRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: Power3.easeInOut,
      })
  }, [pathname, pageRef.current])

  return (
    <div ref={pageRef} style={{ opacity: 0 }}>
      {children}
    </div>
  )
}
