import errorImage from 'src/assets/images/error_image.svg'
import { Button } from '../general/Button/Button'
import { ButtonVariants } from '../general/Button/Button.types'
import Flex from '../general/Flex/Flex'
import { errorPageUseStyles } from './ErrorPage.styles'

import { deleteStorageData } from '../../utils/localStorage.utils'
import { LocalStorage } from '../../constants/localStorage.constants'
import { useNavigate } from 'react-router-dom'
import { SharedRouteConstants } from '../../constants/sharedRoute.constants'
import { ImageLoader } from 'src/modules/shared/components/general/ImageLoader/ImageLoader'

export function ErrorPage() {
  const styles = errorPageUseStyles()
  const navigate = useNavigate()

  const navigateToHome = () => {
    deleteStorageData(LocalStorage.r)
    deleteStorageData(LocalStorage.a)
    navigate(SharedRouteConstants.login())
    window.location.reload()
  }

  return (
    <div className={styles.wrapper}>
      <div style={{ margin: '0 20px' }}>
        <div>
          <ImageLoader
            style={{ width: '100%' }}
            alt={'error'}
            src={errorImage}
          />
        </div>

        <Flex justifyContent="center" style={{ marginTop: '5rem' }}>
          <div style={{ width: 'fit-content' }}>
            <Button
              active={true}
              variant={ButtonVariants.Primary}
              handleClick={navigateToHome}
            >
              Перейти на домашнюю страницу
            </Button>
          </div>
        </Flex>
      </div>
    </div>
  )
}
