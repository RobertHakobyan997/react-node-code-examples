import { AuthorizationRenderer } from '../components/Authorization/Authorization'
import { AuthLayout } from '../components/Layouts/AuthLayout/AuthLayout'
import { useNavigate } from 'react-router-dom'
import { getStorageData } from '../utils/localStorage.utils'
import { LocalStorage } from '../constants/localStorage.constants'
import { useEffect } from 'react'
import { SharedRouteConstants } from '../constants/sharedRoute.constants'

export function Authorization() {
  const navigate = useNavigate()
  const email = getStorageData(LocalStorage.e)

  useEffect(() => {
    if (!email) navigate(SharedRouteConstants.login())
  }, [])

  return (
    <AuthLayout>
      <AuthorizationRenderer />
    </AuthLayout>
  )
}
