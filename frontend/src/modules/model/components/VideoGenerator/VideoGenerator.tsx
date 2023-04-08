import { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import Flex from 'src/modules/shared/components/general/Flex/Flex'
import { BrokenVideoUrlIcon } from 'src/modules/shared/components/Icons/BrokenVideoUrl'
import { videoGeneratorUseStyles } from './VideoGenerator.styles'
import './styles.css'

export const VideoGenerator = ({ videoLink }: { videoLink: string }) => {
  const [isVideoUrlBroken, setIsVideoUrlBroken] = useState(false)
  const styles = videoGeneratorUseStyles()

  useEffect(() => {
    return () => setIsVideoUrlBroken(false)
  }, [videoLink])

  return videoLink ? (
    <div
      className={styles.videoWrapper}
      id="player-wrapper"
      style={{ paddingTop: !isVideoUrlBroken ? '54.25%' : '5px' }}
    >
      {isVideoUrlBroken ? (
        <Flex
          justifyContent="center"
          alignItems="center"
          className={styles.brokenUrlWrapper}
        >
          <BrokenVideoUrlIcon />
          <p className={styles.brokenUrlDescription}>
            Что-то пошло не так. <br /> Пожалуйста, повторите попытку позже.
          </p>
        </Flex>
      ) : (
        <>
          <ReactPlayer
            className="react-player"
            id="react-player"
            url={videoLink}
            controls={true}
            onError={() => setIsVideoUrlBroken(true)}
            onReady={() => {
              setIsVideoUrlBroken(false)
            }}
          />
        </>
      )}
    </div>
  ) : null
}
