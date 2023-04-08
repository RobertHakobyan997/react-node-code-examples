import { Button } from 'src/modules/shared/components/general/Button/Button'
import { ButtonVariants } from 'src/modules/shared/components/general/Button/Button.types'
import {
  RotateHorizontal,
  RotateLeft,
  RotateRight,
  RotateVertical,
} from 'src/modules/shared/components/Icons/PhotoSettings.icons'
import Flex from 'src/modules/shared/components/general/Flex/Flex'
import { editProfilePhotoUseStyles } from 'src/modules/model/components/EditPhoto/EditPhoto.styles'

export const enum RotateVariant {
  Left = 'Left',
  Right = 'Right',
  Horizontal = 'Horizontal',
  Vertical = 'Vertical',
}

export function RotateControllers({
  handleRotationAction,
}: {
  handleRotationAction: (rotationVariant: RotateVariant) => void
}) {
  const styles = editProfilePhotoUseStyles()

  const handleRotationActionInner = (rotationVariant: RotateVariant) => () =>
    handleRotationAction(rotationVariant)

  return (
    <div className={styles.rotateActionsWrapper}>
      <Button
        variant={ButtonVariants.Text}
        className={styles.rotateActionButton}
        handleClick={handleRotationActionInner(RotateVariant.Left)}
      >
        <Flex
          direction={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          style={{ gap: '0 8px' }}
        >
          <span>Лево</span>
          <RotateLeft />
        </Flex>
      </Button>
      <Button
        variant={ButtonVariants.Text}
        className={styles.rotateActionButton}
        handleClick={handleRotationActionInner(RotateVariant.Right)}
      >
        <Flex
          direction={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          style={{ gap: '0 8px' }}
        >
          <span>Право</span>
          <RotateRight />
        </Flex>
      </Button>

      <Button
        variant={ButtonVariants.Text}
        className={styles.rotateActionButton}
        handleClick={handleRotationActionInner(RotateVariant.Horizontal)}
      >
        <Flex
          direction={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          style={{ gap: '0 8px' }}
        >
          <span>Горизонтальный</span>
          <RotateHorizontal />
        </Flex>
      </Button>
      <Button
        className={styles.rotateActionButton}
        variant={ButtonVariants.Text}
        handleClick={handleRotationActionInner(RotateVariant.Vertical)}
      >
        <Flex
          direction={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          style={{ gap: '0 8px' }}
        >
          <span>Вертикальный</span>
          <RotateVertical />
        </Flex>
      </Button>
    </div>
  )
}
