import { ComponentWithChildren } from '../types/component.types'
import {
  createContext,
  Ref,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Loader } from '../components/Loader/Loader'
import { gsap } from 'gsap'
import {
  AnimationVisible,
  AnimationHide,
} from 'src/modules/shared/constants/animation.constants'
import { setBodyOverflowHidden } from 'src/modules/shared/utils/style.utils'

interface LoaderContextType {
  handleLoader: (subscriber: boolean) => void
  isLoading: boolean
}

const loaderContext = createContext<LoaderContextType>({
  handleLoader: () => {},
  isLoading: false,
})

export function LoaderContext({ children }: ComponentWithChildren) {
  const loaderRef = useRef<null | gsap.core.Timeline>(null)
  const [loaderData, setMenuVisibility] = useState({
    isAnimationVisible: false,
    isComponentVisible: false,
  })

  const handleLoader = (isLoading: boolean) =>
    setMenuVisibility((prev) => ({ ...prev, isAnimationVisible: isLoading }))

  useEffect(() => {
    if (loaderData.isComponentVisible) {
      setBodyOverflowHidden(true)
    } else {
      setBodyOverflowHidden(false)
    }

    if (loaderData.isAnimationVisible) {
      gsap.to(loaderRef.current, {
        ...AnimationVisible,
        onStart: () => {
          setMenuVisibility((prev) => ({ ...prev, isComponentVisible: true }))
        },
      })
    } else {
      gsap.to(loaderRef.current, {
        ...AnimationHide,
        onComplete: () => {
          setMenuVisibility((prev) => ({ ...prev, isComponentVisible: false }))
        },
      })
    }
  }, [loaderData.isComponentVisible, loaderData.isAnimationVisible])

  return (
    <loaderContext.Provider
      value={{ handleLoader, isLoading: loaderData.isComponentVisible }}
    >
      {loaderData.isComponentVisible && (
        <Loader ref={loaderRef as Ref<HTMLDivElement>} />
      )}

      {children}
    </loaderContext.Provider>
  )
}

export const useLoader = (isLoading?: boolean) => {
  const context = useContext(loaderContext)

  if (!context) {
    throw new Error('useLoader must be used within a LoaderProvider')
  }

  useEffect(() => {
    context.handleLoader(Boolean(isLoading))

    return () => {
      context.handleLoader(false)
    }
  }, [isLoading])

  return context
}
