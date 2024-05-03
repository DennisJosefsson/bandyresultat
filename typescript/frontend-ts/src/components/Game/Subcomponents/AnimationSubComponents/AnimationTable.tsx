import useTeampreferenceContext from '../../../../hooks/contextHooks/useTeampreferenceContext'
import { GameObjectType } from '../../../types/games/games'
import { SerieAttributes } from '../../../types/series/series'
import {
  SmallArrowDownRight,
  SmallArrowUpRight,
} from '../../../utilitycomponents/Components/icons'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  TableCaption,
} from '@/src/@/components/ui/table'

type DateArrayObject = {
  date: string
  games: GameObjectType[]
  table: {
    teamId: number
    casualName: string
    table: {
      position: number
      games: number
      wins: number
      draws: number
      lost: number
      scoredGoals: number
      concededGoals: number
      points: number
    }
  }[]
}

type AnimationTableProps = {
  dateArray: DateArrayObject[]
  round: number
  seriesArray: SerieAttributes[]
  group: string | null
}

const AnimationTable = ({
  dateArray,
  round,
  seriesArray,

  group,
}: AnimationTableProps) => {
  const { favTeams } = useTeampreferenceContext()
  const displayArrow = (teamId: number) => {
    const prevPosObject = dateArray[round - 1].table.find(
      (team) => team.teamId === teamId,
    )
    const currPosObject = dateArray[round].table.find(
      (team) => team.teamId === teamId,
    )

    if (
      !prevPosObject ||
      !currPosObject ||
      !prevPosObject.table ||
      !currPosObject.table
    ) {
      throw new Error('Missing position objects')
    }
    const prevPos = prevPosObject.table.position
    const currPos = currPosObject.table.position

    if (prevPos === currPos) {
      return ''
    } else if (prevPos < currPos) {
      return <SmallArrowDownRight />
    } else if (prevPos > currPos) {
      return <SmallArrowUpRight />
    }
  }

  const serieObject = seriesArray.find(
    (serie) => serie.serieGroupCode === group,
  )

  return (
    <div className="mx-2 mt-4 text-[8px] sm:text-[10px] lg:text-sm xl:mx-0">
      <Table>
        <TableCaption>{serieObject?.comment}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead
              scope="col"
              className="text-left text-[8px] sm:text-[10px] lg:text-sm"
            >
              P
            </TableHead>
            <TableHead
              scope="col"
              className="text-left text-[8px] sm:text-[10px] lg:text-sm"
            >
              Lag
            </TableHead>
            <TableHead></TableHead>
            <TableHead
              scope="col"
              className="text-right text-[8px] sm:text-[10px] lg:text-sm"
            >
              M
            </TableHead>
            <TableHead
              scope="col"
              className="text-right text-[8px] sm:text-[10px] lg:text-sm"
            >
              V
            </TableHead>
            <TableHead
              scope="col"
              className="text-right text-[8px] sm:text-[10px] lg:text-sm"
            >
              O
            </TableHead>
            <TableHead
              scope="col"
              className="text-right text-[8px] sm:text-[10px] lg:text-sm"
            >
              F
            </TableHead>
            <TableHead
              scope="col"
              className="hidden text-right text-[8px] sm:text-[10px] md:table-cell lg:text-sm"
            >
              GM
            </TableHead>
            <TableHead
              scope="col"
              className="hidden text-right text-[8px] sm:text-[10px] md:table-cell lg:text-sm"
            >
              IM
            </TableHead>
            <TableHead
              scope="col"
              className="text-right text-[8px] sm:text-[10px] lg:text-sm"
            >
              MS
            </TableHead>
            <TableHead
              scope="col"
              className="text-right text-[8px] sm:text-[10px] lg:text-sm"
            >
              P
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dateArray[round]?.table.map((team, index) => {
            return (
              <TableRow
                key={`${team.teamId}-${index}`}
                className={`${
                  serieObject?.serieStructure?.includes(index + 1)
                    ? 'border-b-2 border-foreground'
                    : null
                } ${favTeams.includes(team.teamId) ? 'font-bold' : null}`}
              >
                <TableCell className="text-[8px] sm:text-[10px] lg:text-sm">
                  {team.table.position}
                </TableCell>
                <TableCell className="truncate text-left text-[8px] sm:text-[10px] lg:text-sm">
                  {team.casualName}
                </TableCell>
                <TableCell className="text-[8px] text-slate-100 sm:text-[10px] lg:text-sm">
                  {round > 0 &&
                    team.table.games > 0 &&
                    displayArrow(team.teamId)}
                </TableCell>
                <TableCell className="text-right text-[8px] tabular-nums sm:text-[10px] lg:text-sm">
                  {team.table.games}
                </TableCell>
                <TableCell className="text-right text-[8px] tabular-nums sm:text-[10px] lg:text-sm">
                  {team.table.wins}
                </TableCell>
                <TableCell className="text-right text-[8px] tabular-nums sm:text-[10px] lg:text-sm">
                  {team.table.draws}
                </TableCell>
                <TableCell className="text-right text-[8px] tabular-nums sm:text-[10px] lg:text-sm">
                  {team.table.lost}
                </TableCell>
                <TableCell className="hidden text-right text-[8px] tabular-nums sm:text-[10px] md:table-cell lg:text-sm">
                  {team.table.scoredGoals}
                </TableCell>
                <TableCell className="hidden text-right text-[8px] tabular-nums sm:text-[10px] md:table-cell lg:text-sm">
                  {team.table.concededGoals}
                </TableCell>
                <TableCell className="text-right text-[8px] tabular-nums sm:text-[10px] lg:text-sm">
                  {team.table.scoredGoals - team.table.concededGoals}
                </TableCell>
                <TableCell className="text-right text-[8px] tabular-nums sm:text-[10px] lg:text-sm">
                  {team.table.points}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default AnimationTable
