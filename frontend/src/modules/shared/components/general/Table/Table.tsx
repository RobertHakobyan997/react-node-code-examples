/* eslint-disable react/jsx-key */
import { tableUseStyles } from 'src/modules/shared/components/general/Table/Table.styles'
import { Column, useTable } from 'react-table'
import { CSSProperties } from 'react'

interface TableProps {
  columns: Column[]
  data: any
  isUiSeparated?: boolean
  columnStyles?: CSSProperties
}

export function Table({
  columns,
  data,
  isUiSeparated = false,
  columnStyles,
}: TableProps) {
  const styles = tableUseStyles({ isUiSeparated })
  const { headerGroups, rows, getTableBodyProps, getTableProps, prepareRow } =
    useTable({
      columns,
      data,
    })

  if (!data.length) return null

  return (
    <div style={{ overflow: 'auto' }}>
      <table {...getTableProps()} className={styles.table}>
        <thead className={styles.thead}>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps({
                    style: {
                      minWidth: column.minWidth,
                      width: column.width,
                      maxWidth: column.maxWidth,
                      ...columnStyles,
                    },
                  })}
                  className={styles.headTh}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)

            return (
              <tr {...row.getRowProps()} className={styles.tr}>
                {row.cells.map((cell) => (
                  <td
                    className={styles.td}
                    {...cell.getCellProps({
                      style: {
                        minWidth: cell.column.minWidth,
                        width: cell.column.width,
                        ...columnStyles,
                      },
                    })}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
