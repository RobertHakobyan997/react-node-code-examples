import { BackLeader } from 'src/modules/model/components/BackLeader/BackLeader'
import { ProfileLayout } from 'src/modules/shared/components/Layouts/ProfileLayout/ProfileLayout'

import { ProfileContainerWrapper } from 'src/modules/shared/components/ProfileContainerWrapper/ProfileContainerWrapper'
import { DonationLog } from 'src/modules/shared/components/DonationLog/DonationLog'

export function StreamerDonationsPage() {
  return (
    <ProfileLayout isSettingsShown>
      <ProfileContainerWrapper>
        <BackLeader title={'Лог донатов'} />
        <DonationLog hasPagination isUiSeparated hasHeader={false} />
      </ProfileContainerWrapper>
    </ProfileLayout>
  )
}
