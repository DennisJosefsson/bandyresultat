import { useEffect, useState } from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/@/components/ui/table'
import useTeampreferenceContext from '@/src/hooks/contextHooks/useTeampreferenceContext'
import { useMediaQuery } from 'usehooks-ts'
import { showColumns, hideColumns } from './columns'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  teamObject: {
    [x: string]: number
  }
  serieStructure: number[] | null | undefined
}

const DataTable = <TData, TValue>({
  columns,
  data,
  teamObject,
  serieStructure,
}: DataTableProps<TData, TValue>) => {
  const matches = useMediaQuery('(min-width: 640px)')
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
  })

  useEffect(() => {
    matches
      ? setColumnVisibility(showColumns)
      : setColumnVisibility(hideColumns)
  }, [matches])

  const { favTeams } = useTeampreferenceContext()

  const getString = (x: unknown): string => {
    if (!x) throw new Error('Missing string')

    return x as string
  }

  return (
    <div>
      <Table className="container text-[8px] sm:text-[10px] lg:text-sm">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              <TableHead
                key={'position'}
                className="hidden px-0 py-1 sm:table-cell"
              >
                P
              </TableHead>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className={`px-0 py-1 max-w-[${header.column.getSize()}px]`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, index) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                className={`${
                  favTeams.includes(
                    teamObject[getString(row.getValue('lag_casualName'))],
                  )
                    ? 'font-bold'
                    : null
                } ${
                  serieStructure?.includes(index + 1)
                    ? 'border-b-2 border-foreground'
                    : null
                }`}
              >
                <TableCell
                  key={`index-${index}`}
                  className="hidden px-0 py-1 tabular-nums sm:table-cell"
                >
                  {index + 1}
                </TableCell>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell
                      key={cell.id}
                      className={`px-0 py-1 max-w-[${cell.column.getSize()}px]`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Inga resultat.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default DataTable
