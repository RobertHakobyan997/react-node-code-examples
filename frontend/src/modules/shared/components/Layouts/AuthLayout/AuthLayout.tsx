import { authLayoutUseStyles } from './AuthLayout.styles'
import { ComponentWithChildren } from '../../../types/component.types'
import Flex from '../../general/Flex/Flex'

export const AuthLayout = ({ children }: ComponentWithChildren) => {
  const styles = authLayoutUseStyles()

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      className={styles.layoutWrapper}
    >
      <div className={styles.layoutComponentsWrapper}>{children}</div>
    </Flex>
  )
}
