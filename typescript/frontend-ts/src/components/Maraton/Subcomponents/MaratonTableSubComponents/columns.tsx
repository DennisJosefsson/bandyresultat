import { ColumnDef } from '@tanstack/react-table'
import { MaratonTabell } from '@/src/components/types/tables/tables'
import { Button } from '@/src/@/components/ui/button'

import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
} from '@radix-ui/react-icons'

export const columns: ColumnDef<MaratonTabell>[] = [
  {
    accessorKey: 'lag.name',
    header: 'Lag',
  },
  {
    accessorKey: 'totalGames',
    header: ({ column }) => (
      <div className="pr-1 text-right">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          M
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
