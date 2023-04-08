import { Button } from 'src/modules/shared/components/general/Button/Button'
import { ButtonVariants } from 'src/modules/shared/components/general/Button/Button.types'
import Flex from 'src/modules/shared/components/general/Flex/Flex'
import { EditPenIcon } from 'src/modules/shared/components/Icons/EditPen.icon'
import { EmptyStateImg } from 'src/modules/shared/components/Icons/EmptyStateImg'
import { emptyStatesUseStyles } from './PublicEmptyState.styles'

export const EmptyState = ({ handleEdit }: { handleEdit: any }) => {
  const styles = emptyStatesUseStyles()

  return (
    <div className={styles.wrapper}>
      <span className={styles.container}>
        Помогите посетилеям вашей страницы найти ваши социальные страницы
        <br />и узнать вас получше.
      </span>
      <Flex justifyContent="flex-end" className={styles.editBtnWrapper}>
        <Button
          variant={ButtonVariants.Primary}
          className={styles.editBtn}
          handleClick={handleEdit}
        >
          <div className={styles.button}>
            <EditPenIcon /> <span>Редактировать</span>
          </div>
        </Button>
      </Flex>

      <div className={styles.img}>
        <EmptyStateImg />
      </div>
    </div>
  )
}
