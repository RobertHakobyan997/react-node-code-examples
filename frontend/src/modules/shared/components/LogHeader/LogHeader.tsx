import { logHeaderUseStyles } from 'src/modules/shared/components/LogHeader/LogHeader.styles'

export function LogHeader({
  title,
  hasLogs,
}: {
  title: string
  hasLogs: boolean
}) {
  const styles = logHeaderUseStyles({ hasLogs })

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <div className={styles.title}>
          <span>{title}</span>
        </div>
      </div>
    </div>
  )
}
