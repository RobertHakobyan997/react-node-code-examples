import { PaginationConstant } from 'src/modules/shared/constants/pagination.constants'

const loop = (start: number, end: number, pagesData: number[]) => {
  for (let index = start; index < end; index++) {
    pagesData.push(index)
  }
}

export const getPagesData = ({
  currentPage,
  allItems,
  itemPerPage,
}: {
  currentPage: number
  allItems: number
  itemPerPage: number
}) => {
  let result: any[] = []
  const allPages = allItems ? Math.ceil(allItems / itemPerPage) : 0

  if (currentPage - PaginationConstant.PageSiblingsCount <= 1) {
    loop(1, currentPage + 1, result)
  } else {
    result.push(1, PaginationConstant.Multipoint)
    loop(
      currentPage - PaginationConstant.PageSiblingsCount,
      currentPage + 1,
      result
    )
  }

  if (currentPage + PaginationConstant.PageSiblingsCount >= allPages) {
    loop(currentPage + 1, allPages + 1, result)
  } else {
    loop(
      currentPage + 1,
      currentPage + 1 + PaginationConstant.PageSiblingsCount,
      result
    )
    result.push(PaginationConstant.Multipoint, allPages)
  }
  return { pages: result, latestPage: allPages }
}
