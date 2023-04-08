import { publicModelStyles } from './PublicModel.styles'
import PublicProfileHeader from '../../../shared/components/PublicProfileHeader/PublicProfileHeader'
import PublicPurchaseAndSubscriptionRenderer from '../../components/PublicPurchaseAndSubscriptionRenderer/PublicPurchaseAndSubscriptionRenderer'
import { ProfileLayout } from 'src/modules/shared/components/Layouts/ProfileLayout/ProfileLayout'
import { Button } from 'src/modules/shared/components/general/Button/Button'

import { ButtonVariants } from 'src/modules/shared/components/general/Button/Button.types'
import { useModal } from '../../../shared/context/modal.context'
import { ModalVariant } from '../../../shared/types/modal.types'
import SocialLinks from '../../components/SocialLinks/SocialLinks'
import { PublicEmptyState } from '../../components/EmptyStates/PublicEmptyState'
import { EmptyState } from '../../components/EmptyStates/EmptyState'
import Flex from 'src/modules/shared/components/general/Flex/Flex'

import { useQueryClient } from 'react-query'
import { PublicUser } from 'src/modules/shared/types/user.types'
import { SharedQueryKey } from 'src/modules/shared/constants/sharedQuery.constants'
import { DonatePaymentForm } from 'src/modules/streamer/forms/DonatePayment/DonatePayment.form'
import { useNavigate, useParams } from 'react-router-dom'

import { VideoGenerator } from '../../components/VideoGenerator/VideoGenerator'
import { useFlag } from '@unleash/proxy-client-react'
import { FeatureFlag } from 'src/modules/shared/constants/featureFlag.constants'
import { BackLeader } from 'src/modules/model/components/BackLeader/BackLeader'
import { UserRouteConstants } from 'src/modules/model/constants/route.constants'

export function PublicModel({ isMyProfile }: { isMyProfile: boolean }) {
  const hasPaymentIntegrated = useFlag(FeatureFlag.HasPaymentIntegrated)
  const styles = publicModelStyles({ isMyProfile })

  const { provideModalSettings } = useModal()
  const queryClient = useQueryClient()
  const params = useParams()
  const navigate = useNavigate()

  const publicUserData = queryClient.getQueryData([
    SharedQueryKey.PublicUser,
    { uuid: params.uuid },
  ]) as PublicUser

  const handleDonate = () => {
    provideModalSettings({
      modalVariant: ModalVariant.Modal,
      content: <DonatePaymentForm receiverUuid={params.uuid ?? ''} />,
    })
  }

  const handleEdit = () => navigate(UserRouteConstants.editProfile())

  const navigateToProfile = () => navigate(UserRouteConstants.profile())

  const showLogs =
    publicUserData?.subscription_plans?.length ||
    publicUserData?.purchase_plans?.length
  const hasContent = Boolean(
    publicUserData?.social_links?.length ||
      showLogs ||
      publicUserData?.video_link
  )

  const getEmptyStateElement = () => {
    return isMyProfile ? (
      <EmptyState handleEdit={handleEdit} />
    ) : (
      <PublicEmptyState />
    )
  }

  return (
    <ProfileLayout isSettingsShown={isMyProfile}>
      {isMyProfile && (
        <BackLeader handleClick={navigateToProfile} title={'Профиль'} />
      )}
      <div className={styles.wrapper}>
        <PublicProfileHeader
          hasContent={hasContent}
          isMyProfile={isMyProfile}
          handleEdit={handleEdit}
        />

        {!!publicUserData?.social_links.length && (
          <SocialLinks
            hasPayment={hasPaymentIntegrated}
            socialLinksData={publicUserData?.social_links}
          />
        )}

        {!isMyProfile && !hasPaymentIntegrated && (
          <Flex
            justifyContent="center"
            alignItems="center"
            style={{ marginTop: '32px' }}
          >
            <Button
              variant={ButtonVariants.Primary}
              handleClick={handleDonate}
              className={styles.donateBtn}
            >
              Задонатить
            </Button>
          </Flex>
        )}
        {hasContent ? (
          <>
            <VideoGenerator videoLink={publicUserData?.video_link} />
            {!!showLogs && !hasPaymentIntegrated && (
              <PublicPurchaseAndSubscriptionRenderer
                isMyProfile={isMyProfile}
                hasSocialLinksAndVideo={Boolean(
                  publicUserData?.social_links?.length ||
                    publicUserData?.video_link
                )}
              />
            )}
          </>
        ) : (
          getEmptyStateElement()
        )}
      </div>
    </ProfileLayout>
  )
}
