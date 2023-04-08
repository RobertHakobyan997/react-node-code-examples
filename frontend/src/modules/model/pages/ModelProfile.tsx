import { ProfileLayout } from '../../shared/components/Layouts/ProfileLayout/ProfileLayout'
import { ModelProfileContainer } from '../components/ModelProfileContainer/ModelProfileContainer'

export function ModelProfile() {
  return (
    <ProfileLayout isSettingsShown>
      <ModelProfileContainer />
    </ProfileLayout>
  )
}
