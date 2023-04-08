import { EmptyTab } from 'src/modules/shared/components/Icons/EmptyTab'
import { emptyLogUseStyles } from 'src/modules/shared/components/EmptyLog/EmptyLog.styles'

export function EmptyLog({
  isUiSeparated = false,
}: {
  isUiSeparated: boolean
}) {
  const styles = emptyLogUseStyles({ isUiSeparated })

  return (
    <div className={styles.wrapper}>
      <div className={styles.contentWrapper}>
        <EmptyTab />
      </div>
    </div>
  )
}
