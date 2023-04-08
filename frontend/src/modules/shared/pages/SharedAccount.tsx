import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { useLoader } from 'src/modules/shared/context/loader.context'
import { Loader } from 'src/modules/shared/components/Loader/Loader'
import { SharedQueryKey } from 'src/modules/shared/constants/sharedQuery.constants'
import { getPublicUser } from 'src/modules/shared/services/public.services'
import { useAuth } from '../context/auth.context'
import { DeletedAccount } from '../components/DeletedAccount/DeletedAccount'
import { PublicModel } from 'src/modules/model/pages/PublicModel/PublicModel'

export function SharedAccount() {
  const params = useParams()

  const { userState, isLoading } = useAuth()

  const { data: publicUser, isLoading: publicUserIsLoading } = useQuery(
    [SharedQueryKey.PublicUser, { uuid: params.uuid }],
    () => getPublicUser({ uuid: params.uuid ?? '' })
  )

  useLoader(publicUserIsLoading || isLoading)

  if (!publicUser && !publicUserIsLoading) {
    return <DeletedAccount />
  }

  if (publicUser?.role) {
    return <PublicModel isMyProfile={userState?.user?.uuid === params.uuid} />
  }

  return <Loader />

  // switch (publicUser?.role) {
  //   case UserRole.MODEL:
  //     return <PublicModel isMyProfile={userState?.user?.uuid === params.uuid} />
  //
  //   case UserRole.STREAMER:
  //     return <PublicStreamer />
  //
  //   default:
  //     return <Loader />
  // }
}
