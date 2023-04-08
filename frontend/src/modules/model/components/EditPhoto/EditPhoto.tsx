import { useRef, useState } from 'react'
import ReactCrop, {
  centerCrop,
  Crop,
  makeAspectCrop,
  PixelCrop,
} from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import Flex from 'src/modules/shared/components/general/Flex/Flex'

import { editProfilePhotoUseStyles } from './EditPhoto.styles'
import { ImageLoader } from 'src/modules/shared/components/general/ImageLoader/ImageLoader'
import { Button } from 'src/modules/shared/components/general/Button/Button'
import { ButtonVariants } from 'src/modules/shared/components/general/Button/Button.types'
import {
  CropIcon,
  RotateIcon,
} from 'src/modules/shared/components/Icons/PhotoSettings.icons'
import {
  CropControllers,
  CropControllerVariant,
} from 'src/modules/model/components/EditPhoto/CropControllers'
import {
  RotateControllers,
  RotateVariant,
} from 'src/modules/model/components/EditPhoto/RotateControllers'
import { useModal } from 'src/modules/shared/context/modal.context'
import { blobToBase64 } from 'src/modules/shared/utils/file.utils'
import { useDebounceEffect } from 'src/modules/shared/hooks/useDebounceEffect'
import { canvasPreview } from 'src/modules/model/components/EditPhoto/canvasPreview'

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: 'px',
        width: 199,
        height: 199,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  )
}

const aspect = 1

export const enum EditProfilePhotoVariant {
  Round = 'Round',
  Rectangle = 'Rectangle',
}

interface EditProfilePhotoProps {
  src: string
  title: string
  variant?: EditProfilePhotoVariant
  handleSave: (base64: string | null, url: string | null) => void
}

const enum PictureSetting {
  Crop = 'Crop',
  Rotate = 'Rotate',
}

interface PictureEditSettingsProps {
  handleTabSetting: (setting: PictureSetting) => void
  pictureSetting: PictureSetting
}

const PictureEditSettings = ({
  handleTabSetting,
  pictureSetting,
}: PictureEditSettingsProps) => {
  const handleInnerClick = (setting: PictureSetting) => () => {
    handleTabSetting(setting)
  }

  return (
    <Flex justifyContent="space-between" style={{ marginBottom: '20px' }}>
      <Button
        variant={ButtonVariants.Tab}
        active={pictureSetting === PictureSetting.Crop}
        handleClick={handleInnerClick(PictureSetting.Crop)}
      >
        <Flex
          alignItems={'center'}
          justifyContent={'center'}
          style={{ gap: '0 10px' }}
        >
          <CropIcon />
          <span>Обрезать</span>
        </Flex>
      </Button>
      <Button
        variant={ButtonVariants.Tab}
        active={pictureSetting === PictureSetting.Rotate}
        handleClick={handleInnerClick(PictureSetting.Rotate)}
      >
        <Flex
          alignItems={'center'}
          justifyContent={'center'}
          style={{ gap: '0 10px' }}
        >
          <RotateIcon />
          <span>Повернуть</span>
        </Flex>
      </Button>
    </Flex>
  )
}

const EditPhoto = ({
  src,
  title,
  handleSave,
  variant = EditProfilePhotoVariant.Round,
}: EditProfilePhotoProps) => {
  const styles = editProfilePhotoUseStyles()
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const { provideModalSettings } = useModal()
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [scaleData, setScaleData] = useState({ scaleX: 1, scaleY: 1 })
  const [rotate, setRotate] = useState(0)
  const [pictureEditSetting, setPictureEditSetting] = useState<PictureSetting>(
    PictureSetting.Crop
  )

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget
    setCrop(centerAspectCrop(width, height, aspect))
  }

  const handleCropActions = (
    cropController: CropControllerVariant,
    value: number
  ) => {
    switch (cropController) {
      case CropControllerVariant.Rotate:
        setRotate(value)
        return
      case CropControllerVariant.Scale:
        setScaleData({ scaleX: value, scaleY: value })
        return
      default:
        setScaleData({ scaleX: value, scaleY: value })
        return
    }
  }

  const handleRotationAction = (rotationVariant: RotateVariant) => {
    switch (rotationVariant) {
      case RotateVariant.Left:
        setRotate((prev) => {
          return prev === -360 ? 0 : prev - 90
        })
        return
      case RotateVariant.Right:
        setRotate((prev) => {
          return prev === 360 ? 0 : prev + 90
        })
        return
      case RotateVariant.Vertical:
        setRotate(0)
        setScaleData((prev) => ({
          scaleX: prev.scaleX,
          scaleY: prev.scaleY > 0 ? -1 : 1,
        }))
        return
      case RotateVariant.Horizontal:
        setRotate(0)
        setScaleData((prev) => ({
          scaleX: prev.scaleX > 0 ? -1 : 1,
          scaleY: prev.scaleY,
        }))
        return
    }
  }

  const handleCancel = () => {
    provideModalSettings({
      isVisible: false,
    })
  }

  const handleInnerSave = async () => {
    if (previewCanvasRef.current) {
      previewCanvasRef.current.toBlob((blob) => {
        if (blob) {
          blobToBase64(blob).then((res) => {
            const url = URL.createObjectURL(blob)
            console.log({ res, url })
            handleSave(res, url)
          })
          return
        }
        handleSave(null, null)
      })
      return
    }
    handleSave(null, null)
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scaleData.scaleX,
          scaleData.scaleY,
          rotate
        )
      }
    },
    100,
    [completedCrop, scaleData, rotate]
  )

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Редактирование фотографии</h1>
      <p className={styles.message}>
        Рекомендуем использовать изображениe размером 1024 на 1024px
      </p>

      {Boolean(src) && (
        <div>
          <PictureEditSettings
            pictureSetting={pictureEditSetting}
            handleTabSetting={setPictureEditSetting}
          />
          <p className={styles.imageTitle}>{title}</p>
          <div className={styles.cropperWrapper}>
            <ReactCrop
              crop={crop}
              onChange={(c, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={variant === EditProfilePhotoVariant.Round ? 1 : 2.71}
              minWidth={199}
              circularCrop={variant === EditProfilePhotoVariant.Round}
            >
              <ImageLoader
                ref={imgRef}
                alt="Crop me"
                src={src}
                onLoad={onImageLoad}
                style={{
                  transform: `scaleX(${scaleData.scaleX}) scaleY(${scaleData.scaleY}) rotate(${rotate}deg)`,
                }}
              />
            </ReactCrop>
          </div>
        </div>
      )}

      <canvas ref={previewCanvasRef} style={{ display: 'none' }} />

      <div className={styles.divider}></div>

      {pictureEditSetting === PictureSetting.Crop ? (
        <CropControllers
          handleAction={handleCropActions}
          scale={scaleData.scaleX}
          rotate={rotate}
          disabled={!src}
        />
      ) : (
        <RotateControllers handleRotationAction={handleRotationAction} />
      )}

      <div className={styles.actionButtonWrapper}>
        <Button
          variant={ButtonVariants.Secondary}
          className={styles.actionButton}
          handleClick={handleCancel}
        >
          Отмена
        </Button>
        <Button
          variant={ButtonVariants.Primary}
          className={styles.actionButton}
          handleClick={handleInnerSave}
        >
          Сохранить
        </Button>
      </div>
    </div>
  )
}

export default EditPhoto
