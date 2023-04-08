import { separatorUseStyles } from 'src/modules/shared/components/general/Separator/Separator.styles'

export function Separator({
  topSpace,
  bottomSpace,
  color,
}: {
  topSpace: number
  bottomSpace: number
  color?: string
}) {
  const styles = separatorUseStyles()

  return (
    <div
      className={styles.separator}
      style={{
        borderTopColor: color,
        marginTop: `${topSpace}px`,
        marginBottom: `${bottomSpace}px`,
      }}
    ></div>
  )
}
