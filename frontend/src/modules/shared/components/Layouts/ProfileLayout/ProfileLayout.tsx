import { ComponentWithChildren } from '../../../types/component.types'
import { ProfileHeader } from '../../Profile/ProfileHeader/ProfileHeader'
import { profileLayoutUseStyles } from './ProfileLayout.styles'
import Flex from '../../general/Flex/Flex'

interface ProfileLayoutProps extends ComponentWithChildren {
  isSettingsShown: boolean
}

export function ProfileLayout({
  children,
  isSettingsShown,
}: ProfileLayoutProps) {
  const styles = profileLayoutUseStyles()

  return (
    <div style={{ marginBottom: '2rem' }}>
      <ProfileHeader isSettingsShown={isSettingsShown} />
      <Flex justifyContent="center" alignItems="center">
        <Flex
          justifyContent="center"
          alignItems="center"
          direction="column"
          className={styles.layoutWrapper}
        >
          {children}
        </Flex>
      </Flex>
    </div>
  )
}
