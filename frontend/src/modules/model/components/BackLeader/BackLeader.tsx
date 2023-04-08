import { backLeaderStyles } from 'src/modules/model/components/BackLeader/BackLeader.styles'
import { Button } from 'src/modules/shared/components/general/Button/Button'
import { ButtonVariants } from 'src/modules/shared/components/general/Button/Button.types'
import { ArrowBack } from 'src/modules/shared/components/Icons/ArrowIcon'
import { useNavigate } from 'react-router-dom'
import Flex from 'src/modules/shared/components/general/Flex/Flex'

interface BackLeaderProps {
  title: string
  handleClick?: () => void
}

export function BackLeader({ title, handleClick }: BackLeaderProps) {
  const navigate = useNavigate()
  const styles = backLeaderStyles()

  const handleBack = () => {
    if (handleClick) {
      handleClick()
      return
    }
    navigate(-1)
  }

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      className={styles.wrapper}
    >
      <Flex alignItems="center">
        <Button
          style={{ marginLeft: '20px' }}
          variant={ButtonVariants.Text}
          handleClick={handleBack}
        >
          <ArrowBack />
        </Button>

        <h1 className={styles.title}>{title}</h1>
      </Flex>
    </Flex>
  )
}
