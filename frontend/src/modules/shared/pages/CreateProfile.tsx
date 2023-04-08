import { ProfileLayout } from '../components/Layouts/ProfileLayout/ProfileLayout'
import { CreateProfileForm } from '../forms/profile/create/CreateProfile.form'

export function CreateProfile() {
  return (
    <div style={{ overflow: 'hidden', height: 'var(--screen-size)' }}>
      <ProfileLayout isSettingsShown={false}>
        <CreateProfileForm />
      </ProfileLayout>
    </div>
  )
}
