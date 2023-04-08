import { Button } from 'src/modules/shared/components/general/Button/Button'
import { ButtonVariants } from 'src/modules/shared/components/general/Button/Button.types'
import { ImageLoader } from 'src/modules/shared/components/general/ImageLoader/ImageLoader'
import { LinkIcon } from 'src/modules/shared/components/Icons/Link.icon'
import { AppThemeConstants } from 'src/modules/shared/constants/style.constants'
import { useModal } from 'src/modules/shared/context/modal.context'
import {
  ModalVariant,
  PopupVariant,
} from 'src/modules/shared/types/modal.types'
import { socialLinksUseStyles } from './SocialLinks.styles'
import { getFaviconOfUrl } from 'src/modules/shared/utils/icon.utils'
import Flex from 'src/modules/shared/components/general/Flex/Flex'

const SocialLinks = ({
  socialLinksData,
  hasPayment,
}: {
  socialLinksData: string[]
  hasPayment: boolean
}) => {
  const isItemsLess = socialLinksData.length < 6

  const styles = socialLinksUseStyles({ isItemsLess })
  const { provideModalSettings } = useModal()

  const handleCopy =
    ({ link }: { link: string }) =>
    () => {
      navigator.clipboard.writeText(link)
      provideModalSettings({
        modalVariant: ModalVariant.Popup,
        popupVariant: PopupVariant.Regular,
        content: 'Ссылка скопирована',
      })
    }

  if (!hasPayment) {
    return (
      <Flex alignItems="center" justifyContent="center">
        <div className={styles.socialLinksSmallWrapper}>
          {socialLinksData.map((socialLink) => {
            return (
              <a
                key={socialLink}
                href={socialLink}
                target={'_blank'}
                rel="noreferrer"
              >
                <Button
                  className={styles.smallSocialLinkButton}
                  variant={ButtonVariants.Icon}
                >
                  <ImageLoader
                    className={styles.socialIconImage}
                    src={getFaviconOfUrl(socialLink)}
                    alt="Empty plan"
                  />
                </Button>
              </a>
            )
          })}
        </div>
      </Flex>
    )
  }

  return socialLinksData?.length ? (
    <div
      className={styles.wrapper}
      id="social-links"
      style={{ overflow: 'overlay' }}
    >
      {socialLinksData?.map((link, index) => (
        <div className={styles.container} key={index}>
          <div className={styles.socialIcon}>
            <ImageLoader
              className={styles.socialIconImage}
              src={getFaviconOfUrl(link)}
              alt="Empty plan"
            />
          </div>

          <div className={styles.copyIcon}>
            <Button
              variant={ButtonVariants.Text}
              handleClick={handleCopy({ link })}
            >
              <LinkIcon
                className={styles.linkIcon}
                color={AppThemeConstants.textColor}
              />
            </Button>
          </div>
          <div className={styles.link}>
            <a target="_blank" href={link} rel="noreferrer">
              {link}
            </a>
          </div>
        </div>
      ))}
    </div>
  ) : null
}
export default SocialLinks
