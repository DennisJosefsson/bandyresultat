import { TableRow, TableCell } from '@/src/@/components/ui/table'

type Category = {
  totalGames: number
  totalWins: number
  totalDraws: number
  totalLost: number
  totalGoalsScored: number
  totalGoalsConceded: number
  totalGoalDifference: number
  totalPoints: number
  category: string
}

const TeamTableRow = ({ category }: { category: Category }) => {
  return (
    <TableRow>
      <TableCell className="px-1 py-1 text-right text-[8px] tabular-nums sm:text-[10px] md:py-2 lg:text-sm">
        {category.totalGames}
      </TableCell>
      <TableCell className="px-1 py-1 text-right text-[8px] tabular-nums sm:text-[10px] md:py-2 lg:text-sm">
        {category.totalWins}
      </TableCell>
      <TableCell className="px-1 py-1 text-right text-[8px] tabular-nums sm:text-[10px] md:py-2 lg:text-sm">
        {category.totalDraws}
      </TableCell>
      <TableCell className="px-1 py-1 text-right text-[8px] tabular-nums sm:text-[10px] md:py-2 lg:text-sm">
        {category.totalLost}
      </TableCell>
      <TableCell className="hidden px-1 py-1 text-right text-[8px] tabular-nums xs:table-cell sm:text-[10px] md:py-2 lg:text-sm">
        {category.totalGoalsScored}
      </TableCell>
      <TableCell className="hidden px-1 py-1 text-right text-[8px] tabular-nums xs:table-cell sm:text-[10px] md:py-2 lg:text-sm">
        {category.totalGoalsConceded}
      </TableCell>
      <TableCell className="hidden px-1 py-1 text-right text-[8px] tabular-nums xs:table-cell sm:text-[10px] md:py-2 lg:text-sm">
        {category.totalGoalDifference}
      </TableCell>
      <TableCell className="px-1 py-1 text-right text-[8px] tabular-nums sm:text-[10px] md:py-2 lg:text-sm">
        {category.totalPoints}
      </TableCell>
    </TableRow>
  )
}

export default TeamTableRow
