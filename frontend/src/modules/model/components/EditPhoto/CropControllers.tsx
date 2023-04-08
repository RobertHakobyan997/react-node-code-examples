import { editProfilePhotoUseStyles } from 'src/modules/model/components/EditPhoto/EditPhoto.styles'
import Flex from 'src/modules/shared/components/general/Flex/Flex'

export const enum CropControllerVariant {
  Scale = 'Scale',
  Rotate = 'Rotate',
}

export const CropControllers = ({
  scale,
  rotate,
  handleAction,
  disabled,
}: {
  scale: number
  rotate: number
  disabled: boolean
  handleAction: (cropController: CropControllerVariant, value: number) => void
}) => {
  const styles = editProfilePhotoUseStyles()

  return (
    <div className={styles.cropControls}>
      <Flex direction="column" style={{ gap: '23px' }}>
        <span className={styles.rangeInputsTitle}>Увеличение</span>
        <Flex alignItems="center">
          <button
            onClick={() =>
              scale > 1 &&
              handleAction(CropControllerVariant.Scale, scale - 0.1)
            }
            className={styles.incDecBtn}
          >
            -
          </button>
          <input
            type="range"
            value={scale}
            min="1"
            max="10"
            step="0.1"
            disabled={disabled}
            onChange={(e) =>
              handleAction(CropControllerVariant.Scale, Number(e.target.value))
            }
            className={styles.rangeInput}
          />
          <button
            onClick={() =>
              scale < 10 &&
              handleAction(CropControllerVariant.Scale, scale + 0.1)
            }
            className={styles.incDecBtn}
          >
            +
          </button>
        </Flex>
      </Flex>
      <Flex
        direction="column"
        style={{
          gap: '23px',
        }}
      >
        <span className={styles.rangeInputsTitle}>Выпрямление </span>
        <Flex alignItems="center">
          <button
            onClick={() =>
              rotate > 0 &&
              handleAction(CropControllerVariant.Rotate, rotate - 0.1)
            }
            className={styles.incDecBtn}
          >
            -
          </button>

          <input
            type="range"
            disabled={disabled}
            value={rotate}
            min="0"
            max="270"
            step="1"
            onChange={(e) =>
              handleAction(
                CropControllerVariant.Rotate,
                Math.min(270, Math.max(-270, Number(e.target.value)))
              )
            }
            className={styles.rangeInput}
          />
          <button
            onClick={() =>
              rotate < 270 &&
              handleAction(CropControllerVariant.Rotate, rotate + 1)
            }
            className={styles.incDecBtn}
          >
            +
          </button>
        </Flex>
      </Flex>
    </div>
  )
}
