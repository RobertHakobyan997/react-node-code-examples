import React, {
  createContext,
  forwardRef,
  MutableRefObject,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'

import { ModalVariant, PopupVariant } from '../types/modal.types'
import RegularPopup from '../components/Popup/RegularPopup/RegularPopup'
import { ComponentWithChildren } from '../types/component.types'
import { ModalLayout } from '../components/Layouts/ModalLayout/ModalLayout'
import { gsap } from 'gsap'
import {
  AnimationHide,
  AnimationVisible,
} from 'src/modules/shared/constants/animation.constants'
import { setBodyOverflowHidden } from 'src/modules/shared/utils/style.utils'

interface ModalType {
  content: string | JSX.Element | null
  modalVariant: ModalVariant
  popupVariant: PopupVariant
  isComponentVisible: boolean
  isVisible: boolean
  timeOutToHide: number
  hasModalCloseButton: boolean
}

interface ModalSettings {
  content: string | JSX.Element | null
  modalVariant: ModalVariant
  popupVariant: PopupVariant
  isVisible: boolean
  timeOutToHide: number
  hasModalCloseButton: boolean
}

interface ModalContext {
  modalSettings: ModalType
  provideModalSettings: (settings: Partial<ModalSettings>) => void
}

const modalInitialValues: ModalType = {
  content: null,
  modalVariant: ModalVariant.Popup,
  popupVariant: PopupVariant.Error,
  hasModalCloseButton: false,
  isComponentVisible: false,
  isVisible: false,
  timeOutToHide: 5,
}

const modalContext = createContext<ModalContext>({
  modalSettings: modalInitialValues,
  provideModalSettings: () => {},
})

const useModalProvider = (contentRef: MutableRefObject<null>) => {
  const [modalSettings, setModalSettings] =
    useState<ModalType>(modalInitialValues)

  const { isVisible, isComponentVisible, timeOutToHide } = modalSettings

  const provideModalSettings = (settings: Partial<ModalSettings>) => {
    const isModal = settings.modalVariant === ModalVariant.Modal

    const isAnimationVisible = settings.content
      ? Boolean(settings.content)
      : settings.isVisible

    setModalSettings((prev) => ({
      ...modalInitialValues,
      ...settings,
      hasModalCloseButton: settings.hasModalCloseButton ?? false,
      timeOutToHide: isModal
        ? 0
        : settings.timeOutToHide ?? modalInitialValues.timeOutToHide,
      isVisible: isAnimationVisible ?? false,
      isComponentVisible: prev.isComponentVisible,
    }))
  }

  const handleCloseModal = () => {
    setModalSettings((prev) => ({ ...prev, isVisible: false }))
  }

  useEffect(() => {
    let showTimeout: ReturnType<typeof setTimeout>

    if (isComponentVisible && timeOutToHide > 0) {
      showTimeout = setTimeout(() => {
        provideModalSettings({ isVisible: false })
      }, timeOutToHide * 1000)
    }

    if (timeOutToHide > 0) {
      return () => {
        clearTimeout(showTimeout)
      }
    }
  }, [modalSettings.modalVariant, timeOutToHide, isComponentVisible])

  useLayoutEffect(() => {
    if (isVisible) {
      window.requestAnimationFrame(() => {
        gsap.to(contentRef.current, {
          ...AnimationVisible,
          onStart: () => {
            setModalSettings((prev) => ({ ...prev, isComponentVisible: true }))
          },
        })
      })
    } else {
      window.requestAnimationFrame(() => {
        gsap.to(contentRef.current, {
          ...AnimationHide,
          onComplete: () => {
            setModalSettings((prev) => ({ ...prev, isComponentVisible: false }))
          },
        })
      })
    }
  }, [isVisible, isComponentVisible])

  return { provideModalSettings, handleCloseModal, modalSettings }
}

interface ModalRendererProps {
  modalVariant: ModalVariant
  popupVariant: PopupVariant
  content: string | JSX.Element
  handleCloseModal: () => void
  hasModalCloseButton: boolean
}

const ModalRenderer = forwardRef<HTMLInputElement, ModalRendererProps>(
  (
    {
      modalVariant,
      popupVariant,
      content,
      handleCloseModal,
      hasModalCloseButton = false,
    },
    ref
  ) => {
    switch (modalVariant) {
      case ModalVariant.Modal:
        return (
          <ModalLayout
            ref={ref}
            hasCloseButton={hasModalCloseButton}
            handleClose={handleCloseModal}
          >
            {content as JSX.Element}
          </ModalLayout>
        )

      case ModalVariant.Popup:
        return (
          <RegularPopup popupVariant={popupVariant} text={content as string} />
        )
      default:
        return (
          <RegularPopup popupVariant={popupVariant} text={content as string} />
        )
    }
  }
)

export const ModalProvider = ({ children }: ComponentWithChildren) => {
  const divRef = useRef(null)
  const { modalSettings, provideModalSettings, handleCloseModal } =
    useModalProvider(divRef)
  const {
    modalVariant,
    popupVariant,
    content,
    isComponentVisible,
    hasModalCloseButton,
  } = modalSettings

  const isShownModal = isComponentVisible && content

  useEffect(() => {
    if (isComponentVisible && modalVariant === ModalVariant.Modal) {
      setBodyOverflowHidden(true)
    }
    if (!isComponentVisible && modalVariant === ModalVariant.Modal) {
      setBodyOverflowHidden(false)
    }
  }, [isComponentVisible, modalVariant, content])

  return (
    <modalContext.Provider value={{ modalSettings, provideModalSettings }}>
      {isShownModal && (
        <ModalRenderer
          hasModalCloseButton={hasModalCloseButton}
          handleCloseModal={handleCloseModal}
          modalVariant={modalVariant}
          popupVariant={popupVariant}
          content={content}
          ref={divRef}
        />
      )}
      {children}
    </modalContext.Provider>
  )
}

export const useModal = () => {
  return useContext(modalContext)
}
