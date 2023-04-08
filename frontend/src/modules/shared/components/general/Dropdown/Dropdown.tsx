import { dropdownUseStyles } from './Dropdown.style'
import Flex from '../Flex/Flex'
import React, { useEffect, useRef, useState } from 'react'
import { ArrowIcon } from '../../Icons/ArrowIcon'
import useOutsideClick from '../../../hooks/useOutsideClick'
import { RequiredIndicator } from '../InputField/InputField'

export interface DropdownType<T = string> {
  id: number
  content: string | JSX.Element
  nameId: string | null | T
}

export const enum DropdownVariant {
  Regular = 'regular',
  Input = 'input',
}

interface DropdownProps {
  items: DropdownType[]
  isRequired?: boolean
  className?: string
  reset?: boolean
  title?: string
  variant?: DropdownVariant
  handleChange?: (item: DropdownType) => void
  placeholder?: DropdownType
  errorMessage?: string
  style?: any
  defaultValue?: DropdownType
}

export const DropdownItem = ({
  dropdown,
  handleClick,
  // isOneItem,
  variant,
  style,
}: {
  variant: DropdownVariant
  dropdown: DropdownType
  handleClick: () => void
  style?: React.CSSProperties
  // isOneItem: boolean
}) => {
  const styles = dropdownUseStyles({})

  return (
    <button
      className={styles[`${variant}Item`]}
      style={style}
      onClick={handleClick}
    >
      {dropdown.content}
    </button>
  )
}

const getItemById = (id: number, items: DropdownType[]): DropdownType =>
  items.find((item) => item.id === id) ?? items[0]

export function Dropdown({
  items,
  title,
  reset,
  placeholder,
  handleChange,
  variant = DropdownVariant.Regular,
  className,
  isRequired = false,
  style,
  defaultValue,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(
    defaultValue ? defaultValue : placeholder ?? items[0]
  )
  const dropdownRef = useRef(null)

  const handleDropdown = (id: number) => () => {
    if (handleChange) {
      const selectedItem = getItemById(id, items)
      setIsOpen(false)
      setSelectedItem(selectedItem)
      handleChange(selectedItem)
    }
  }

  const isOneItem = items.length === 1

  const styles = dropdownUseStyles({ isOneItem })

  const toggleDropdown = () => !isOneItem && setIsOpen((prev) => !prev)

  const buttonStyles =
    placeholder &&
    variant !== DropdownVariant.Input &&
    selectedItem.id === placeholder.id
      ? styles.dropdownButtonPlaceholder
      : styles[variant]

  const isEmpty = placeholder && selectedItem.id === placeholder.id

  useEffect(() => {
    if (reset) setSelectedItem(placeholder ?? items[0])
  }, [reset])

  useOutsideClick(dropdownRef, () => setIsOpen(false))

  return (
    <>
      {title && (
        <div className={styles.titleStyle} style={{ marginBottom: '0.5rem' }}>
          {title}
          {isRequired && <RequiredIndicator isEmpty={Boolean(isEmpty)} />}
        </div>
      )}

      <div
        className={`${styles.dropdownWrapper} ${className ? className : ''}`}
        ref={dropdownRef}
      >
        <div style={{ position: 'relative' }}>
          <button
            onClick={toggleDropdown}
            type="button"
            className={buttonStyles}
            style={style}
          >
            {selectedItem.content}
          </button>

          {!isOneItem && (
            <div className={styles.arrow}>
              <ArrowIcon />
            </div>
          )}
        </div>

        {isOpen && (
          <Flex direction="column" className={styles.dropdownListWrapper}>
            {items.map((item) => (
              <DropdownItem
                variant={variant}
                // isOneItem={isOneItem}
                handleClick={handleDropdown(item.id)}
                dropdown={item}
                key={item.id}
              />
            ))}
          </Flex>
        )}
      </div>
    </>
  )
}
