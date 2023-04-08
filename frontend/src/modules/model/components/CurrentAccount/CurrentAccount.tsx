import { Button } from '../../../shared/components/general/Button/Button'
import { ButtonVariants } from '../../../shared/components/general/Button/Button.types'

import { currentAccountUseStyles } from './CurrentAccount.styles'
import Flex from '../../../shared/components/general/Flex/Flex'
import { RubliIconRegular } from '../../../shared/components/Icons/Amount.icon'
import { useModal } from 'src/modules/shared/context/modal.context'
import { ModalVariant } from 'src/modules/shared/types/modal.types'
import WithDrawalModalContent from './WithdrawalModalContent/WithdrawalModalContent'
import { useNavigate } from 'react-router-dom'
import { UserRouteConstants } from 'src/modules/model/constants/route.constants'
import { useAuth } from 'src/modules/shared/context/auth.context'
import { useQuery } from 'react-query'
import { ModelQueryKey } from 'src/modules/model/constants/queryKeys.constants'
import { getPaymentTransactions } from 'src/modules/model/services/payment.services'

const CurrentAccount = () => {
  const navigate = useNavigate()
  const {
    userState: { user },
  } = useAuth()
  const styles = currentAccountUseStyles()

  const { data } = useQuery(
    [
      ModelQueryKey.PaymentTransactions,
      { pageNumber: 1, pageSize: 10, uuid: user?.uuid },
    ],
    () => getPaymentTransactions({ pageNumber: 1, pageSize: 10 })
  )

  const { provideModalSettings } = useModal()

  const navigateTransactionHistory = () => {
    navigate(UserRouteConstants.transactions())
  }

  return (
    <div className={styles.currentAccountWrapper}>
      <h1 className={styles.title}>Текущий счет</h1>
      <Flex
        alignItems="center"
        justifyContent="flex-start"
        className={styles.price}
      >
        <div style={{ marginRight: '10px' }}>
          <RubliIconRegular />
        </div>

        <span className={styles.amount}>
          {user?.balance.toLocaleString('en-US') ?? 0}
        </span>
      </Flex>

      <div className={styles.transactionWrapper}>
        <Button
          className={styles.withdrawalButton}
          variant={ButtonVariants.Primary}
          handleClick={() => {
            provideModalSettings({
              modalVariant: ModalVariant.Modal,
              content: <WithDrawalModalContent />,
            })
          }}
        >
          Вывести средства
        </Button>

        <Button
          isButtonInteractive={Number(data?.count) > 0}
          style={{ paddingTop: '10px' }}
          handleClick={navigateTransactionHistory}
          variant={ButtonVariants.Link}
        >
          История транзакции
        </Button>
      </div>
    </div>
  )
}

export default CurrentAccount
