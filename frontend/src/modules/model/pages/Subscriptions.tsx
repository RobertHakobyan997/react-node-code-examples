import { ProfileLayout } from 'src/modules/shared/components/Layouts/ProfileLayout/ProfileLayout'
import { BackLeader } from 'src/modules/model/components/BackLeader/BackLeader'

import { ProfileContainerWrapper } from 'src/modules/shared/components/ProfileContainerWrapper/ProfileContainerWrapper'
import {
  LogLayout,
  LogRenderer,
  LogTab,
} from 'src/modules/shared/components/Layouts/LogLayout/LogLayout'

export function Subscriptions() {
  return (
    <ProfileLayout isSettingsShown>
      <ProfileContainerWrapper>
        <BackLeader title="Лог подписок" />
        <LogLayout isUiSeparated currentTab={LogTab.Subscription}>
          {(variant) => (
            <LogRenderer hasPagination isUiSeparated variant={variant} />
          )}
        </LogLayout>
      </ProfileContainerWrapper>
    </ProfileLayout>
  )
}
