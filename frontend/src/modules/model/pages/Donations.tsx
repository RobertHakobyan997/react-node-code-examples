import { ProfileLayout } from 'src/modules/shared/components/Layouts/ProfileLayout/ProfileLayout'
import { ProfileContainerWrapper } from 'src/modules/shared/components/ProfileContainerWrapper/ProfileContainerWrapper'
import { BackLeader } from 'src/modules/model/components/BackLeader/BackLeader'
import {
  LogLayout,
  LogRenderer,
  LogTab,
} from 'src/modules/shared/components/Layouts/LogLayout/LogLayout'

export function ModelDonationsPage() {
  return (
    <ProfileLayout isSettingsShown>
      <ProfileContainerWrapper>
        <BackLeader title={'Лог донатов'} />

        <LogLayout isUiSeparated currentTab={LogTab.Donation}>
          {(variant) => (
            <LogRenderer hasPagination isUiSeparated variant={variant} />
          )}
        </LogLayout>
      </ProfileContainerWrapper>
    </ProfileLayout>
  )
}
