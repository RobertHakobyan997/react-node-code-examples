import { Donation } from 'src/modules/streamer/types/donation.types'
import Flex from 'src/modules/shared/components/general/Flex/Flex'
import {
  CurrencyIconVariant,
  CurrencyRenderer,
} from 'src/modules/shared/components/CurrencyRenderer/CurrencyRenderer'
import { donationsUseStyles } from 'src/modules/streamer/components/Donations/Donations.styles'

import { regularDateFormatter } from 'src/modules/shared/utils/date.utils'

export function Donations({
  isUiSeparated,
  donations,
}: {
  donations: Donation[]
  isUiSeparated: boolean
}) {
  const styles = donationsUseStyles({ isUiSeparated })

  return (
    <div className={styles.donationsWrapper}>
      {donations.map((donation, index) => (
        <div className={styles.donationItemWrapper} key={index}>
          <Flex
            alignItems="center"
            justifyContent="space-between"
            style={{ marginBottom: '6px', padding: '0 10px' }}
          >
            <span className={styles.nickname}>{donation.nickname}</span>
            <span className={styles.createdDate}>
              {regularDateFormatter(donation.created_at)}
            </span>
          </Flex>
          <div className={styles.priceWrapper}>
            <CurrencyRenderer
              variant={CurrencyIconVariant.Small}
              currency={donation.currency}
            />
            <span className={styles.amount}>{donation.amount}</span>
          </div>
          <div style={{ marginLeft: '10px' }}>
            <p className={styles.notes}>{donation.notes}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
