import { useMediaQuery } from 'usehooks-ts'
import { TableRow, TableCell } from '@/src/@/components/ui/table'

interface TableRowData {
  lag: {
    shortName: string
    casualName: string
  }
  opp?: {
    shortName: string
    casualName: string
  }
  totalGames: number
  totalWins: number
  totalDraws: number
  totalLost: number
  totalGoalsScored: number
  totalGoalsConceded: number
  totalGoalDifference: number
  totalPoints: number
}

const DataTableRow = ({ team }: { team: TableRowData }) => {
  const matches = useMediaQuery('(min-width: 430px)')
  return (
    <TableRow>
      <TableCell className="px-1 py-1 text-left text-[8px] sm:text-[10px] md:py-2 lg:text-sm">
        {team.opp && (
          <>
            {!matches
              ? `${team.lag.shortName}-${team.opp.shortName}`
              : `${team.lag.casualName}-${team.opp.casualName}`}
          </>
        )}
        {!team.opp && (
          <>{!matches ? team.lag.shortName : team.lag.casualName}</>
        )}
      </TableCell>
      <TableCell className="px-1 py-1 text-right text-[8px] tabular-nums sm:text-[10px] md:py-2 lg:text-sm">
        {team.totalGames}
      </TableCell>
      <TableCell className="px-1 py-1 text-right text-[8px] tabular-nums sm:text-[10px] md:py-2 lg:text-sm">
        {team.totalWins}
      </TableCell>
      <TableCell className="px-1 py-1 text-right text-[8px] tabular-nums sm:text-[10px] md:py-2 lg:text-sm">
        {team.totalDraws}
      </TableCell>
      <TableCell className="px-1 py-1 text-right text-[8px] tabular-nums sm:text-[10px] md:py-2 lg:text-sm">
        {team.totalLost}
      </TableCell>
      <TableCell className="hidden px-1 py-1 text-right text-[8px] tabular-nums xs:table-cell sm:text-[10px] md:py-2 lg:text-sm">
        {team.totalGoalsScored}
      </TableCell>
      <TableCell className="hidden px-1 py-1 text-right text-[8px] tabular-nums xs:table-cell sm:text-[10px] md:py-2 lg:text-sm">
        {team.totalGoalsConceded}
      </TableCell>
      <TableCell className="hidden px-1 py-1 text-right text-[8px] tabular-nums xs:table-cell sm:text-[10px] md:py-2 lg:text-sm">
        {team.totalGoalDifference}
      </TableCell>
      <TableCell className="px-1 py-1 text-right text-[8px] tabular-nums sm:text-[10px] md:py-2 lg:text-sm">
        {team.totalPoints}
      </TableCell>
    </TableRow>
  )
}

export default DataTableRow
