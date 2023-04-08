import { Link } from 'react-router-dom'
import { SharedRouteConstants } from '../../constants/sharedRoute.constants'
import { useAuth } from '../../context/auth.context'
import { enterProfileUseStyles } from './EnterProfile.styles'

export const EnterProfile = () => {
  const {
    userState: { user },
  } = useAuth()
  const styles = enterProfileUseStyles()
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Профиль</h1>
      <p className={styles.description}>
        Эта страница содержит вашу личную информацию,а также ваши подписки и
        покупки.
      </p>
      <Link
        className={styles.redirectToProfilePage}
        to={SharedRouteConstants.userAccount({ uuid: user?.uuid })}
      >
        Перейти
      </Link>
    </div>
  )
}
