import { IconVariant } from 'src/modules/shared/types/icon.types'

interface SizeByVariantProps {
  variant: IconVariant
  bigSize: number
  smallSize: number
}

export const getSizeByVariant = ({
  variant,
  bigSize,
  smallSize,
}: SizeByVariantProps) => {
  switch (variant) {
    case IconVariant.Big:
      return bigSize
    case IconVariant.Small:
      return smallSize
    default:
      return bigSize
  }
}

export const getFaviconOfUrl = (url: string) => {
  return `https://www.google.com/s2/favicons?domain=${url}&sz=128`
}
