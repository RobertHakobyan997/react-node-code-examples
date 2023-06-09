import { useLayoutEffect } from 'react'

function calculateVh() {
  document.documentElement.style.setProperty(
    '--screen-size',
    `${window.innerHeight}px`
  )
}

export function use100VhFix() {
  useLayoutEffect(() => {
    calculateVh()

    window.addEventListener('resize', calculateVh)

    return () => {
      window.removeEventListener('resize', calculateVh)
    }
  }, [])
}
