import React, { useMemo, useReducer, useState } from 'react'

import { Table } from '@mantine/core'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { generateMockData, Player } from '../components/leaderboards/mockData'

function Leaderboard() {
  const rerender = useReducer(() => ({}), {})[1]

  const [sorting, setSorting] = useState<SortingState>([])

  const columns = useMemo<ColumnDef<Player>[]>(
    () => [
      {
        accessor: 'name',
        header: 'Name',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        accessorFn: (row) => row.username,
      },
      {
        accessor: 'gamesPlayed',
        header: 'Games played',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        accessorFn: (row) => row.gamesPlayed,
      },
      {
        accessor: 'wins',
        header: 'Wins',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        accessorFn: (row) => row.wins,
      },
      {
        accessor: 'losses',
        header: 'Losses',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        accessorFn: (row) => row.losses,
      },
    ],
    []
  )

  const [data, setData] = React.useState(() => generateMockData())
  const refreshData = () => setData(() => generateMockData())

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  })

  return (
    <div className="p-2">
      <div className="h-2" />
      <Table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table
            .getRowModel()
            .rows.slice(0, 10)
            .map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
        </tbody>
      </Table>
      <div>{table.getRowModel().rows.length} Rows</div>
      <div>
        <button onClick={() => rerender()}>Force Rerender</button>
      </div>
      <div>
        <button onClick={() => refreshData()}>Refresh Data</button>
      </div>
      <pre>{JSON.stringify(sorting, null, 2)}</pre>
    </div>
  )
}

export default Leaderboard
