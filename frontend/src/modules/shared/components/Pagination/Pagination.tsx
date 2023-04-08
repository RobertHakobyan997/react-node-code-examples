import { getPagesData } from 'src/modules/shared/utils/pagination.utils'
import { PaginationConstant } from 'src/modules/shared/constants/pagination.constants'
import { Button } from 'src/modules/shared/components/general/Button/Button'
import { ButtonVariants } from 'src/modules/shared/components/general/Button/Button.types'
import { MultipointIcon } from 'src/modules/shared/components/Icons/Multipoint.icon'
import {
  ArrowLeft,
  ArrowRight,
} from 'src/modules/shared/components/Icons/ArrowIcon'
import { paginationUseStyles } from 'src/modules/shared/components/Pagination/Pagination.styles'
import Flex from 'src/modules/shared/components/general/Flex/Flex'
import React from 'react'

export function Pagination({
  allItems,
  currentPage,
  handlePage,
  pageSize,
}: {
  allItems: number
  pageSize: number
  currentPage: number
  handlePage: (page: number) => void
}) {
  const styles = paginationUseStyles()
  const { pages, latestPage } = getPagesData({
    currentPage,
    allItems,
    itemPerPage: pageSize,
  })

  if (pages.length === 1) {
    return null
  }

  return (
    <div className={styles.wrapper}>
      <Button
        handleClick={() => handlePage(currentPage - 1)}
        variant={ButtonVariants.Page}
        isButtonInteractive={currentPage > 1}
      >
        <ArrowLeft isActive={currentPage > 1} />
      </Button>
      {pages.map((page) => {
        if (page === PaginationConstant.Multipoint) {
          return (
            <Flex
              alignItems="center"
              justifyContent="center"
              className={styles.multipoint}
              key={page}
            >
              <MultipointIcon />
            </Flex>
          )
        }
        return (
          <Button
            active={currentPage === page}
            variant={ButtonVariants.Page}
            key={page}
            handleClick={() => handlePage(page)}
          >
            {page}
          </Button>
        )
      })}

      <Button
        variant={ButtonVariants.Page}
        handleClick={() => handlePage(currentPage + 1)}
        isButtonInteractive={currentPage < latestPage}
      >
        <ArrowRight isActive={currentPage < latestPage} />
      </Button>
    </div>
  )
}
