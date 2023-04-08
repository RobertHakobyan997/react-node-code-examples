import React, { useState } from 'react'
import { Button } from 'src/modules/shared/components/general/Button/Button'
import { ButtonVariants } from 'src/modules/shared/components/general/Button/Button.types'
import {
  ArrowIcon,
  ArrowIconUp,
} from 'src/modules/shared/components/Icons/ArrowIcon'
import {
  ButtonStyles,
  responsiveLogListUseStyles,
} from 'src/modules/model/components/ResponsiveLogList/ResponsiveLogList.styles'
import Flex from 'src/modules/shared/components/general/Flex/Flex'

const ListItem = ({
  listData,
  schema,
  isUiSeparated,
}: {
  schema: { accessor: any; Header: string }[]
  listData: { [key: string]: React.ReactNode | string }
  isUiSeparated?: boolean
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const styles = responsiveLogListUseStyles({ isOpen, isUiSeparated })

  const toggleList = () => setIsOpen((prev) => !prev)

  return (
    <div className={styles.contentWrapper}>
      {schema.map((schemaRow, index) => {
        if (index === 0) {
          return (
            <div key={index} className={styles.firstItemWrapper}>
              <Flex alignItems="center">
                <Button
                  handleClick={toggleList}
                  style={ButtonStyles}
                  variant={ButtonVariants.Primary}
                >
                  {isOpen ? <ArrowIconUp /> : <ArrowIcon />}
                </Button>

                <span className={styles.firstTitle}>{schemaRow.Header}</span>
              </Flex>
              <Flex alignItems="center">
                <span className={styles.content}>
                  {listData[schemaRow.accessor]}
                </span>
              </Flex>
            </div>
          )
        }
        if (isOpen) {
          return (
            <div key={index} className={styles.itemWrapper}>
              <Flex alignItems="center" justifyContent="flex-start">
                <span className={styles.title}>{schemaRow.Header}</span>
              </Flex>

              <Flex alignItems="center">
                <span className={styles.content}>
                  {listData[schemaRow.accessor]}
                </span>
              </Flex>
            </div>
          )
        }
      })}
    </div>
  )
}

export function ResponsiveLogList({
  list,
  schema,
  isUiSeparated,
}: {
  list: any[]
  schema: { accessor: string; Header: string }[]
  isUiSeparated?: boolean
}) {
  if (!list.length) return null

  return (
    <div>
      {list?.map((listItem, index) => {
        return (
          <ListItem
            isUiSeparated={isUiSeparated}
            key={index}
            schema={schema}
            listData={listItem}
          />
        )
      })}
    </div>
  )
}
