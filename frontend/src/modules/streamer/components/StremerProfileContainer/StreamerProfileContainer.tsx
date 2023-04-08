import { Verification } from '../../../shared/components/Verification/Verification'
import CurrentAccount from '../../../model/components/CurrentAccount/CurrentAccount'
import ReferralCode from '../../../model/components/ReferralCode/ReferralCode'
import ProfileLink from '../../../model/components/ProfileLink/ProfileLink'
import { profileContainerUseStyles } from '../../../model/components/ModelProfileContainer/ModelProfileContainer.styles'

import { ProfileContainerWrapper } from '../../../shared/components/ProfileContainerWrapper/ProfileContainerWrapper'
import { Separator } from 'src/modules/shared/components/general/Separator/Separator'
import { DonationLog } from 'src/modules/shared/components/DonationLog/DonationLog'
import { EnterProfile } from 'src/modules/shared/components/EnterProfile/EnterProfile'

export function StreamerProfileContainer() {
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
      <Separator topSpace={20} bottomSpace={32} />
      <DonationLog />
    </ProfileContainerWrapper>
  )
}
