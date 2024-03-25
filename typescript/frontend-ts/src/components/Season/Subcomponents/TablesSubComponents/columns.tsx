import { ColumnDef } from '@tanstack/react-table'
import { TableObjectType } from '@/src/components/types/tables/tables'
import { Button } from '@/src/@/components/ui/button'

import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
} from '@radix-ui/react-icons'
// const columnhelper = createColumnHelper<TableObjectType>()

// export const columns = [
//   columnhelper.accessor('lag.name', {
//     header: 'Lag',
//   }),
//   columnhelper.accessor('totalGames', {
//     header: 'M',
//   }),
//   columnhelper.accessor('totalWins', {
//     header: 'V',
//   }),
//   columnhelper.accessor('totalDraws', {
//     header: 'O',
//   }),
//   columnhelper.accessor('totalLost', {
//     header: 'F',
//   }),
//   columnhelper.accessor('totalGoalsScored', {
//     header: 'GM',
//   }),
//   columnhelper.accessor('totalGoalsConceded', {
//     header: 'IM',
//   }),
//   columnhelper.accessor('totalGoalDifference', {
//     header: 'MS',
//   }),
//   columnhelper.accessor('totalPoints', {
//     header: 'P',
//   }),
// ]

export const columns: ColumnDef<TableObjectType>[] = [
  {
    accessorKey: 'lag.name',
    header: 'Lag',
  },
  {
    accessorKey: 'totalGames',
    header: () => <div className="pr-1 text-right">M</div>,
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        {row.getValue('totalGames')}
      </div>
    ),
  },
  {
    accessorKey: 'totalWins',
    header: ({ column }) => (
      <div className="text-right">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          V
          {column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="pr-8 text-right tabular-nums">
        {row.getValue('totalWins')}
      </div>
    ),
  },
  {
    accessorKey: 'totalDraws',
    header: ({ column }) => (
      <div className="text-right">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          O
          {column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="pr-8 text-right tabular-nums">
        {row.getValue('totalDraws')}
      </div>
    ),
  },
  {
    accessorKey: 'totalLost',
    header: ({ column }) => (
      <div className="text-right">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          F
          {column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="pr-8 text-right tabular-nums">
        {row.getValue('totalLost')}
      </div>
    ),
  },
  {
    accessorKey: 'totalGoalsScored',
    header: ({ column }) => (
      <div className="text-right">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          GM
          {column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="pr-8 text-right tabular-nums">
        {row.getValue('totalGoalsScored')}
      </div>
    ),
  },
  {
    accessorKey: 'totalGoalsConceded',
    header: ({ column }) => (
      <div className="text-right">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          IM
          {column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="pr-8 text-right tabular-nums">
        {row.getValue('totalGoalsConceded')}
      </div>
    ),
  },
  {
    accessorKey: 'totalGoalDifference',
    header: ({ column }) => (
      <div className="text-right">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          MS
          {column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="pr-8 text-right tabular-nums">
        {row.getValue('totalGoalDifference')}
      </div>
    ),
  },
  {
    accessorKey: 'totalPoints',
    header: ({ column }) => (
      <div className="text-right">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          P
          {column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : (
            <CaretSortIcon className="ml-2 h-4 w-4" />
          )}
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="pr-8 text-right tabular-nums">
        {row.getValue('totalPoints')}
      </div>
    ),
  },
]
