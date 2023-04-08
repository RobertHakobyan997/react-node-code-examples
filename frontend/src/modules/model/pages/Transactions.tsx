import { ProfileContainerWrapper } from 'src/modules/shared/components/ProfileContainerWrapper/ProfileContainerWrapper'
import { BackLeader } from 'src/modules/model/components/BackLeader/BackLeader'

import { ProfileLayout } from 'src/modules/shared/components/Layouts/ProfileLayout/ProfileLayout'
import { TransactionLog } from 'src/modules/model/components/TransactionLog/TransactionLog'

export function Transactions() {
  return (
    <ProfileLayout isSettingsShown>
      <ProfileContainerWrapper>
        <BackLeader title={'История транзакции'} />

        <TransactionLog hasPagination />
      </ProfileContainerWrapper>
    </ProfileLayout>
  )
}
