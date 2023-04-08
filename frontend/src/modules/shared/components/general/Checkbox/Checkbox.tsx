import { ChangeEvent, useId, useState } from 'react'
import { checkboxUseStyles } from 'src/modules/shared/components/general/Checkbox/Checkbox.styles'
import Flex from 'src/modules/shared/components/general/Flex/Flex'

export function Checkbox({
  handleCheck,
  description,
  isChecked,
}: {
  handleCheck?: (isChecked: boolean) => void
  description?: string
  isChecked?: boolean
}) {
  const id = useId()
  const styles = checkboxUseStyles()
  const [checkedState, setCheckedState] = useState(isChecked ?? false)

  const handleInnerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checkedValue = e.target.checked
    setCheckedState(checkedValue)
    handleCheck && handleCheck(e.target.checked)
  }

  return (
    <Flex alignItems="center">
      <input
        onChange={handleInnerChange}
        type="checkbox"
        id={id}
        className={styles.input}
        checked={checkedState}
      />
      <label htmlFor={id} className={styles.label}>
        {' '}
      </label>

      {description && <span className={styles.description}>{description}</span>}
    </Flex>
  )
}
