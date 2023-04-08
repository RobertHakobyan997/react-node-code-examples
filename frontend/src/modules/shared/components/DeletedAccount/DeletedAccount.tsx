import Flex from '../general/Flex/Flex'
import { UserNotFound } from '../Icons/UserNorFound'
import { ProfileLayout } from '../Layouts/ProfileLayout/ProfileLayout'
import PublicProfile from '../PublicProfileHeader/PublicProfileHeader'
import { deletedAccountUseStyles } from './DeletedAccount.styles'

export const DeletedAccount = () => {
  const styles = deletedAccountUseStyles()
  return (
    <ProfileLayout isSettingsShown={false}>
      <div className={styles.wrapper}>
        <PublicProfile />
        <Flex
          alignItems="center"
          justifyContent="center"
          direction="column"
          className={styles.deletedAccountWrapper}
        >
          <UserNotFound />
          <p>Пользователь деактивирован</p>
        </Flex>
      </div>
    </ProfileLayout>
  )
}
