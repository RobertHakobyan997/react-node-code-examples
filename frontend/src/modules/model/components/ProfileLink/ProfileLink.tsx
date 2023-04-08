import { Button } from '../../../shared/components/general/Button/Button'
import { ButtonVariants } from '../../../shared/components/general/Button/Button.types'
import { profileLinkUseStyles } from './ProfileLink.styles'
import { UserRole } from '../../../shared/types/user.types'
import { useAuth } from '../../../shared/context/auth.context'
import { generateProfileShareLink } from '../../../shared/utils/string.utils'
import { LinkIcon } from 'src/modules/shared/components/Icons/Link.icon'

import { useModal } from 'src/modules/shared/context/modal.context'
import {
  ModalVariant,
  PopupVariant,
} from 'src/modules/shared/types/modal.types'

const LinkHeader = {
  [UserRole.STREAMER]: 'Ссылка для донатов',
  [UserRole.MODEL]: 'Ссылка для подписок и покупок',
  [UserRole.ADMIN]: null,
}

const ProfileLink = () => {
  const { userState } = useAuth()

  const styles = profileLinkUseStyles()
  const { provideModalSettings } = useModal()

  const profileLink = generateProfileShareLink(
    window.location.origin,
    userState.uuid ?? ''
  )

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileLink)
    provideModalSettings({
      modalVariant: ModalVariant.Popup,
      popupVariant: PopupVariant.Regular,
      content: 'Ссылка скопирована',
    })
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{LinkHeader[UserRole.MODEL]}</h1>
      <p className={styles.description}>
        Скопируй ее и отправь своим донатерам. По ней они будут переводить тебе
        донаты.
      </p>

      <div className={styles.linkAndButtonWrapper}>
        <p className={styles.link}>{profileLink}</p>

        <div className={styles.buttonWrapper}>
          <Button
            className={styles.button}
            handleClick={copyToClipboard}
            variant={ButtonVariants.SecondaryOutlinedSmall}
          >
            <div className={styles.buttonContentWrapper}>
              <span className={styles.buttonLink}>
                <LinkIcon width={12} color={'currentColor'} />
              </span>
              <span>Скопировать</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProfileLink
