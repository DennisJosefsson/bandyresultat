import { useMediaQuery } from 'usehooks-ts'
import { TableRow, TableCell } from '@/src/@/components/ui/table'

interface TableRowData {
  lag: {
    shortName: string
    casualName: string
  }
  opp: {
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
      <TableCell className="px-1 py-1 text-left md:py-2">
        {!matches
          ? `${team.lag.shortName}-${team.opp.shortName}`
          : `${team.lag.casualName}-${team.opp.casualName}`}
      </TableCell>
      <TableCell className="px-1 py-1 text-right tabular-nums md:py-2">
        {team.totalGames}
      </TableCell>
      <TableCell className="px-1 py-1 text-right tabular-nums md:py-2">
        {team.totalWins}
      </TableCell>
      <TableCell className="px-1 py-1 text-right tabular-nums md:py-2">
        {team.totalDraws}
      </TableCell>
      <TableCell className="px-1 py-1 text-right tabular-nums md:py-2">
        {team.totalLost}
      </TableCell>
      <TableCell className="hidden px-1 py-1 text-right tabular-nums xs:table-cell md:py-2">
        {team.totalGoalsScored}
      </TableCell>
      <TableCell className="hidden px-1 py-1 text-right tabular-nums xs:table-cell md:py-2">
        {team.totalGoalsConceded}
      </TableCell>
      <TableCell className="hidden px-1 py-1 text-right tabular-nums xs:table-cell md:py-2">
        {team.totalGoalDifference}
      </TableCell>
      <TableCell className="px-1 py-1 text-right tabular-nums md:py-2">
        {team.totalPoints}
      </TableCell>
    </TableRow>
  )
}

export default DataTableRow
