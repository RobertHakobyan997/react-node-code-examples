import { ProfileLayout } from 'src/modules/shared/components/Layouts/ProfileLayout/ProfileLayout'
import { DonatePaymentForm } from 'src/modules/streamer/forms/DonatePayment/DonatePayment.form'
import { useParams } from 'react-router-dom'
import PublicProfile from 'src/modules/shared/components/PublicProfileHeader/PublicProfileHeader'

export function PublicStreamer() {
  return (
    <ProfileLayout isSettingsShown={false}>
      <PublicProfile />
      <DonatePaymentForm
        isModal={false}
        receiverUuid={useParams().uuid ?? ''}
      />
    </ProfileLayout>
  )
}
