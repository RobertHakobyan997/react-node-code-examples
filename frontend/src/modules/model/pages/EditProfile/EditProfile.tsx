import { useAuth } from 'src/modules/shared/context/auth.context'
import EditProfilePersonalInfo from '../../components/EditProfilePersonalInfo/EditProfilePersonalInfo'
import { ProfileLayout } from 'src/modules/shared/components/Layouts/ProfileLayout/ProfileLayout'
import { BackLeader } from 'src/modules/model/components/BackLeader/BackLeader'

const EditProfile = () => {
  const { userState } = useAuth()
  return (
    <ProfileLayout isSettingsShown>
      <BackLeader title={'Редактирование страницы'} />
      <EditProfilePersonalInfo uuid={userState.uuid} />
    </ProfileLayout>
  )
}

export default EditProfile
