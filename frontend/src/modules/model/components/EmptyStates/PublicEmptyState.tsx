import { PublicEmptyStateImg } from 'src/modules/shared/components/Icons/PublicEmptyStateImg'
import { emptyStatesUseStyles } from './PublicEmptyState.styles'

export const PublicEmptyState = () => {
  const styles = emptyStatesUseStyles()
  return (
    <div className={styles.wrapper}>
      <div className={styles.img} style={{ marginTop: '40px' }}>
        <PublicEmptyStateImg />
      </div>
      <p className={styles.text}>Сейчас нет контента</p>
    </div>
  )
}
