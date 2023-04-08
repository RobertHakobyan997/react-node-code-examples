import Flex from '../../general/Flex/Flex'
import { socialMediaAuthUseStyles } from './SocialMediaAuth.styles'
import { TwitterAuth } from '../TwitterAuth/TwitterAuth'
import { SocialAuth } from '../SocialAuth/SocialAuth'
import { loginGoogle } from '../../../services/login.services'
import { SocialMediaProvider } from '../../../types/auth.types'
import { GoogleIcon } from '../../Icons/Authentication.icon'

const SocialMediaAuthHeader = () => {
  const styles = socialMediaAuthUseStyles()

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      className={styles.authHeaderWrapper}
    >
      <div>
        <span className={styles.authText}>Регистрация/Войти</span>
      </div>
      <p className={styles.description}>
        Если у вас нет аккаунта, он будет создан автоматически
      </p>
    </Flex>
  )
}

export function SocialMediaAuth() {
  const styles = socialMediaAuthUseStyles()

  return (
    <div style={{ width: '100%' }}>
      <SocialMediaAuthHeader />
      <Flex
        direction="row"
        alignItems="center"
        justifyContent="center"
        className={styles.wrapper}
      >
        <div className={styles.socialItem}>
          <SocialAuth
            socialMedia={SocialMediaProvider.Google}
            authService={loginGoogle}
            icon={<GoogleIcon />}
          />
        </div>

        <div className={styles.socialItem}>
          <TwitterAuth />
        </div>

        {/*<div className={styles.socialItem}>*/}
        {/*  <SocialAuth*/}
        {/*    socialMedia={SocialMediaProvider.Facebook}*/}
        {/*    authService={loginFacebook}*/}
        {/*    icon={<FacebookIcon />}*/}
        {/*  />*/}
        {/*</div>*/}
      </Flex>
    </div>
  )
}
