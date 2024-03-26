import { ColumnDef } from '@tanstack/react-table'
import { StaticSeasonTable } from '@/src/components/types/tables/tables'
import { Button } from '@/src/@/components/ui/button'

import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
} from '@radix-ui/react-icons'

export const columns: ColumnDef<StaticSeasonTable>[] = [
  {
    accessorKey: 'team.name',
    header: 'Lag',
  },
  {
    accessorKey: 'games',
    header: () => <div className="pr-1 text-right">M</div>,
    cell: ({ row }) => (
      <div className="text-right tabular-nums">{row.getValue('games')}</div>
    ),
  },
  {
    accessorKey: 'won',
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
      <div className="pr-8 text-right tabular-nums">{row.getValue('won')}</div>
    ),
  },
  {
    accessorKey: 'draw',
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
      <div className="pr-8 text-right tabular-nums">{row.getValue('draw')}</div>
    ),
  },
  {
    accessorKey: 'lost',
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
      <div className="pr-8 text-right tabular-nums">{row.getValue('lost')}</div>
    ),
  },
  {
    accessorKey: 'scoredGoals',
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
        {row.getValue('scoredGoals')}
      </div>
    ),
  },
  {
    accessorKey: 'concededGoals',
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
        {row.getValue('concededGoals')}
      </div>
    ),
  },
  {
    accessorKey: 'goalDifference',
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
        {row.getValue('goalDifference')}
      </div>
    ),
  },
  {
    accessorKey: 'points',
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
        {row.getValue('points')}
      </div>
    ),
  },
]
