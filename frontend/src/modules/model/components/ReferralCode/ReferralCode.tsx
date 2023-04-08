// import { Button } from '../../../shared/components/general/Button/Button'
// import { ButtonVariants } from '../../../shared/components/general/Button/Button.types'
import { referralCodeUseStyles } from './ReferralCode.styles'
import { useAuth } from '../../../shared/context/auth.context'

const ReferralCode = () => {
  const styles = referralCodeUseStyles()
  const { userState } = useAuth()

  return (
    <div className={styles.wrapper}>
      <div style={{ width: '100%' }}>
        <h1 className={styles.title}>Ваш реферальный код</h1>
        <div className={styles.code}>{userState.user?.referral_code}</div>

        {/*<div className={styles.buttonWrapper}>*/}
        {/*  <Button*/}
        {/*    className={styles.button}*/}
        {/*    variant={ButtonVariants.SecondaryOutlinedBig}*/}
        {/*  >*/}
        {/*    Перейти на страницу*/}
        {/*  </Button/}
        {/*</div>*/}
      </div>
    </div>
  )
}

export default ReferralCode
