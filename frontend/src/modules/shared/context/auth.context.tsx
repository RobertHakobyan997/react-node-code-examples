import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'
import {
  ComponentWithChildren,
  RegularFunction,
} from '../types/component.types'
import { User, UserState, UserType } from '../types/user.types'
import { deleteStorageData, getStorageData } from '../utils/localStorage.utils'
import { LocalStorage } from '../constants/localStorage.constants'
import { useMutation } from 'react-query'
import { getUser, logoutService } from '../services/auth.services'
import jwt_decode from 'jwt-decode'

export interface AuthContext {
  userState: UserState
  signIn: ({ access }: { access: string }) => void
  logOut: RegularFunction
  isLoading: boolean
  isError: boolean
  fetchUserData: () => void
  setUserState: Dispatch<SetStateAction<UserState>>
  updateUser: ({
    user,
    uuid,
  }: {
    user?: UserType
    uuid?: null | string
  }) => void
}

export const userInitialState: UserState = {
  user: null,
  uuid: null,
}

const authContext = createContext<AuthContext>({
  userState: userInitialState,
  signIn: () => {},
  logOut: () => {},
  isLoading: false,
  isError: false,
  updateUser: () => {},
  setUserState: () => {},
  fetchUserData: () => {},
})

const useProvideAuth = () => {
  const [userState, setUserState] = useState<UserState>(userInitialState)
  const logoutMutation = useMutation(logoutService)
  const getUserMutation = useMutation(getUser, {
    onError: () => {
      deleteStorageData(LocalStorage.a)
      deleteStorageData(LocalStorage.r)
      setUserState(userInitialState)
    },
  })

  const setUserInitialData = () => {
    setUserState(userInitialState)
  }

  const signIn = ({ access }: { access: string }) => {
    const jwtDecode = jwt_decode(access) as any

    if (jwtDecode?.uuid)
      getUserMutation.mutate(
        { uuid: jwtDecode?.uuid },
        {
          onSuccess: (user: User) => {
            setUserState({ user, uuid: jwtDecode?.uuid })
          },
        }
      )
  }

  const updateUser = ({
    user,
    uuid,
  }: {
    user?: UserType
    uuid?: null | string
  }) => {
    setUserState((prev) => ({
      user: user !== undefined ? user : prev.user,
      uuid: uuid !== undefined ? uuid : prev.uuid,
    }))
  }

  const logOut = () => {
    logoutMutation.mutate(
      { refresh: getStorageData(LocalStorage.r) },
      {
        onSuccess: () => {
          deleteStorageData(LocalStorage.a)
          deleteStorageData(LocalStorage.r)
          setUserState(userInitialState)
        },
      }
    )
  }

  const fetchUserData = () => {
    const access = getStorageData(LocalStorage.a)

    const decode = access && jwt_decode(access)

    if (access && decode.uuid) {
      getUserMutation.mutate(
        { uuid: decode.uuid },
        {
          onSuccess: (user: User) => {
            setUserState({ user, uuid: decode.uuid })
          },
          onError: () => {
            setUserInitialData()
          },
        }
      )
    }
  }

  useEffect(() => {
    fetchUserData()
    window.addEventListener('logoutUser', setUserInitialData)

    return () => {
      window.removeEventListener('logoutUser', setUserInitialData)
    }
  }, [])

  const isLoading = getUserMutation.isLoading || logoutMutation.isLoading

  return {
    userState,
    isLoading,
    isError: logoutMutation.isError,
    updateUser,
    signIn,
    logOut,
    setUserState,
    fetchUserData,
  }
}

export const AuthProvider = ({ children }: ComponentWithChildren) => {
  const auth = useProvideAuth()

  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext)
}
