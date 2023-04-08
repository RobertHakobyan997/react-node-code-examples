import { loaderUseStyles } from './Loader.style'
import { DonateFansShortIcon } from '../Icons/DonateFans.icon'
import { forwardRef, useEffect } from 'react'
import { deleteStorageData } from 'src/modules/shared/utils/localStorage.utils'
import { LocalStorage } from 'src/modules/shared/constants/localStorage.constants'

const loaderTime = 10

export const Loader = forwardRef<HTMLDivElement>((props, ref) => {
  const { loaderWrapper, loader } = loaderUseStyles()

  useEffect(() => {
    const logout = setTimeout(() => {
      deleteStorageData(LocalStorage.r)
      deleteStorageData(LocalStorage.a)
      window.dispatchEvent(new Event('logoutUser'))
    }, loaderTime * 1000)

    return () => {
      clearTimeout(logout)
    }
  }, [])

  return (
    <div className={loaderWrapper} ref={ref} style={{ opacity: 0 }}>
      <div className={loader}>
        <DonateFansShortIcon />
      </div>
    </div>
  )
})
