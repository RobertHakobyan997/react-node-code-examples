import CurrentAccount from '../CurrentAccount/CurrentAccount'
import { Verification } from '../../../shared/components/Verification/Verification'
import ReferralCode from '../ReferralCode/ReferralCode'
import ProfileLink from '../ProfileLink/ProfileLink'
import PaymentAndSubscription from '../PaymentAndSubscription/PaymentAndSubscription'
import { profileContainerUseStyles } from './ModelProfileContainer.styles'
import { ProfileContainerWrapper } from '../../../shared/components/ProfileContainerWrapper/ProfileContainerWrapper'
import { Separator } from 'src/modules/shared/components/general/Separator/Separator'
import {
  LogLayout,
  LogRenderer,
} from 'src/modules/shared/components/Layouts/LogLayout/LogLayout'
import { EnterProfile } from 'src/modules/shared/components/EnterProfile/EnterProfile'

export const ModelProfileContainer = () => {
  const styles = profileContainerUseStyles()

  return (
    <ProfileContainerWrapper>
      <Verification />
      <div className={styles.wrapper}>
        <CurrentAccount />
        <ReferralCode />
      </div>
      <EnterProfile />
      <ProfileLink />
      <PaymentAndSubscription />
      <Separator topSpace={20} bottomSpace={32} />

      <LogLayout>
        {(variant) => (
          <LogRenderer
            hasPagination={false}
            isUiSeparated={false}
            variant={variant}
          />
        )}
      </LogLayout>
    </ProfileContainerWrapper>
  )
}
