import { CSSProperties, ForwardedRef, forwardRef, useState } from 'react'
import { imageLoaderUseStyles } from 'src/modules/shared/components/general/ImageLoader/ImageLoader.styles'

export const enum ImgLoadState {
  Idle = 'Idle',
  Loading = 'Loading',
  Success = 'Success',
}

export const ImageLoader = forwardRef(
  (
    {
      width,
      crossOrigin,
      height,
      style,
      src,
      className,
      alt,
      onLoad,
    }: {
      width?: number | string
      height?: number | string
      className?: string
      src: string | null
      style?: CSSProperties
      alt: string
      crossOrigin?: '' | 'anonymous' | 'use-credentials' | undefined
      onLoad?: (e: React.SyntheticEvent<HTMLImageElement>) => void
    },
    ref?: ForwardedRef<HTMLImageElement>
  ) => {
    const [imgData, setImgSrc] = useState({
      loadState: ImgLoadState.Loading,
    })

    const styles = imageLoaderUseStyles({
      loadState: imgData.loadState,
    })

    const allStyles = className ? `${styles.image} ${className}` : styles.image

    const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
      setImgSrc({ loadState: ImgLoadState.Success })

      if (onLoad) onLoad(e)
    }

    if (src === null) return null

    return (
      <img
        ref={ref}
        width={width}
        crossOrigin={crossOrigin}
        onLoad={handleLoad}
        height={height}
        style={style}
        className={allStyles}
        src={src ?? ''}
        alt={alt}
      />
    )
  }
)
