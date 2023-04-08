import { ProfileLayout } from '../../shared/components/Layouts/ProfileLayout/ProfileLayout'
import { StreamerProfileContainer } from '../components/StremerProfileContainer/StreamerProfileContainer'

export function StreamerProfile() {
  return (
    <ProfileLayout isSettingsShown>
      <StreamerProfileContainer />
    </ProfileLayout>
  )
}
