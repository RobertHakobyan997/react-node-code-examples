import { useQueryClient } from 'react-query'

import emptyProfilePic from 'src/assets/images/emptyProfilePic.svg'
import { publicProfileStyles } from './PublicProfileHeader.styles'
import { SharedQueryKey } from 'src/modules/shared/constants/sharedQuery.constants'
import { User } from 'src/modules/shared/types/user.types'
import { ImageLoader } from 'src/modules/shared/components/general/ImageLoader/ImageLoader'
import { ButtonVariants } from 'src/modules/shared/components/general/Button/Button.types'
import { Button } from '../general/Button/Button'
import Flex from '../general/Flex/Flex'
import { EditPenIcon } from '../Icons/EditPen.icon'
import { useWindowSize } from 'src/modules/shared/hooks/useWindowSize'
import { BreakPointSize } from 'src/modules/shared/constants/style.constants'
import { useParams } from 'react-router-dom'

export const EditButtonContent = ({
  handleEdit,
  isResponsive,
}: {
  handleEdit?: () => void
  isResponsive: boolean
}) => {
  const styles = publicProfileStyles({ isResponsive })

  return (
    <div className={styles.editBtnWrapper}>
      <Button
        className={styles.editBtn}
        variant={ButtonVariants.Primary}
        handleClick={handleEdit}
      >
        <div className={styles.buttonContentWrapper}>
          <EditPenIcon /> <span>Редактировать</span>
        </div>
      </Button>
    </div>
  )
}

const PublicProfileHeader = ({
  hasContent,
  handleEdit,
  isMyProfile,
}: {
  hasContent?: boolean
  handleEdit?: () => void
  isMyProfile?: boolean
}) => {
  const { width } = useWindowSize()
  const queryClient = useQueryClient()
  const params = useParams()
  const publicUserData = queryClient.getQueryData([
    SharedQueryKey.PublicUser,
    { uuid: params.uuid },
  ]) as User

  const isResponsive = width <= BreakPointSize.Tablet
  const isEditButtonVisible = hasContent && isMyProfile

  const styles = publicProfileStyles({})

  return (
    <div className={styles.profileHeaderWrapper} id="profile-social-links">
      <div className={styles.header}>
        {publicUserData?.cover_photo && (
          <ImageLoader src={publicUserData?.cover_photo ?? null} alt="cover" />
        )}
      </div>
      <div style={{ position: 'relative' }}>
        {!isResponsive && isEditButtonVisible && (
          <EditButtonContent isResponsive={false} handleEdit={handleEdit} />
        )}

        <div className={styles.publicPhotoWrapper}>
          <ImageLoader
            src={publicUserData?.profile_photo ?? emptyProfilePic}
            alt="profile"
            className={styles.profileImage}
          />
        </div>
      </div>

      <Flex alignItems="center" justifyContent="center">
        <Flex
          alignItems="center"
          direction="column"
          justifyContent="center"
          className={styles.profilePictureNameDescriptionWrapper}
        >
          {Boolean(publicUserData?.name) && (
            <p className={styles.name}>{publicUserData?.name}</p>
          )}

          {Boolean(publicUserData?.description) && (
            <p className={styles.description}>{publicUserData?.description}</p>
          )}
        </Flex>
      </Flex>

      {isEditButtonVisible && isResponsive && (
        <EditButtonContent isResponsive handleEdit={handleEdit} />
      )}
    </div>
  )
}

export default PublicProfileHeader
