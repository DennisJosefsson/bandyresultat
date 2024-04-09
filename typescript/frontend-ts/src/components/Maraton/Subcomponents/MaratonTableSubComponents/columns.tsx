import { ColumnDef } from '@tanstack/react-table'
import { MaratonTabell } from '@/src/components/types/tables/tables'
import { Button } from '@/src/@/components/ui/button'

import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
} from '@radix-ui/react-icons'

export const showColumns = {
  totalDraws: true,
  totalGoalsScored: true,
  totalGoalsConceded: true,
}

export const hideColumns = {
  totalDraws: false,
  totalGoalsScored: false,
  totalGoalsConceded: false,
}

export const columns: ColumnDef<MaratonTabell>[] = [
  {
    accessorKey: 'lag.casualName',
    header: () => (
      <div className="max-w-6 truncate text-left text-[8px] sm:max-w-24 sm:text-[10px] lg:max-w-32 lg:text-sm">
        Lag
      </div>
    ),
    cell: ({ row }) => (
      <div className="max-w-6 truncate text-left sm:max-w-24 lg:max-w-32">
        {row.getValue('lag_casualName')}
      </div>
    ),
  },
  {
    accessorKey: 'totalGames',
    header: ({ column }) => (
      <div className="text-center text-[8px] sm:text-[10px] lg:text-sm">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          size="icon"
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
      <div className=" text-center text-[8px] tabular-nums sm:text-[10px] lg:text-sm">
        {row.getValue('totalGames')}
      </div>
    ),
  },
  {
    accessorKey: 'totalWins',
    header: ({ column }) => (
      <div className="text-center text-[8px] sm:text-[10px] lg:text-sm">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          size="icon"
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
      <div className="text-center text-[8px] tabular-nums sm:text-[10px] lg:text-sm">
        {row.getValue('totalWins')}
      </div>
    ),
  },
  {
    accessorKey: 'totalDraws',
    header: ({ column }) => (
      <div className="text-center text-[8px] sm:text-[10px] lg:text-sm ">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          size="icon"
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
      <div className="text-center text-[8px] tabular-nums sm:text-[10px] lg:text-sm">
        {row.getValue('totalDraws')}
      </div>
    ),
  },
  {
    accessorKey: 'totalLost',
    header: ({ column }) => (
      <div className="text-center text-[8px] sm:text-[10px] lg:text-sm">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          size="icon"
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
      <div className="text-center text-[8px] tabular-nums sm:text-[10px] lg:text-sm">
        {row.getValue('totalLost')}
      </div>
    ),
  },
  {
    accessorKey: 'totalGoalsScored',
    header: ({ column }) => (
      <div className="text-center text-[8px] sm:text-[10px] lg:text-sm">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          size="icon"
        >
          G
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
      <div className="text-center text-[8px] tabular-nums sm:text-[10px] lg:text-sm">
        {row.getValue('totalGoalsScored')}
      </div>
    ),
  },
  {
    accessorKey: 'totalGoalsConceded',
    header: ({ column }) => (
      <div className="text-center text-[8px] sm:text-[10px] lg:text-sm">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          size="icon"
        >
          I
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
      <div className="text-center text-[8px] tabular-nums sm:text-[10px] lg:text-sm">
        {row.getValue('totalGoalsConceded')}
      </div>
    ),
  },
  {
    accessorKey: 'totalGoalDifference',
    header: ({ column }) => (
      <div className="text-center text-[8px] sm:text-[10px] lg:text-sm">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          size="icon"
        >
          S
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
      <div className="text-center text-[8px] tabular-nums sm:text-[10px] lg:text-sm">
        {row.getValue('totalGoalDifference')}
      </div>
    ),
  },
  {
    accessorKey: 'totalPoints',
    header: ({ column }) => (
      <div className="text-center text-[8px] sm:text-[10px] lg:text-sm">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          size="icon"
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
      <div className="text-center text-[8px] tabular-nums sm:text-[10px] lg:text-sm">
        {row.getValue('totalPoints')}
      </div>
    ),
  },
]
