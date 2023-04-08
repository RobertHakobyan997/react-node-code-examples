import { createUseStyles } from 'react-jss'
import { AppTheme } from 'src/modules/shared/types/style.types'
import { ImgLoadState } from 'src/modules/shared/components/general/ImageLoader/ImageLoader'

interface ImageStyleProps {
  loadState: ImgLoadState
}

export const imageLoaderUseStyles = createUseStyles((theme: AppTheme) => ({
  image: {
    filter: ({ loadState }: ImageStyleProps) =>
      `blur(${loadState === ImgLoadState.Loading ? 10 : 0}px) opacity(${
        loadState === ImgLoadState.Loading ? 0 : 100
      }%)`,
    transition: '0.3s linear',
  },
}))
