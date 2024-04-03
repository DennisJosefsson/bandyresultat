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
  round: number[]
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
    const prevPosObject = dateArray[round[0] - 1].table.find(
      (team) => team.teamId === teamId,
    )
    const currPosObject = dateArray[round[0]].table.find(
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
    <div className="mx-2 mt-4 xl:mx-0">
      <Table>
        <TableCaption>{serieObject?.comment}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead scope="col">P</TableHead>
            <TableHead scope="col" className="text-left">
              Lag
            </TableHead>
            <TableHead></TableHead>
            <TableHead scope="col" className="text-right">
              M
            </TableHead>
            <TableHead scope="col" className="text-right">
              V
            </TableHead>
            <TableHead scope="col" className="text-right">
              O
            </TableHead>
            <TableHead scope="col" className="text-right">
              F
            </TableHead>
            <TableHead scope="col" className="text-right">
              GM
            </TableHead>
            <TableHead scope="col" className="text-right">
              IM
            </TableHead>
            <TableHead scope="col" className="text-right">
              MS
            </TableHead>
            <TableHead scope="col" className="text-right">
              P
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dateArray[round[0]]?.table.map((team, index) => {
            return (
              <TableRow
                key={`${team.teamId}-${index}`}
                className={`${
                  serieObject?.serieStructure?.includes(index + 1)
                    ? 'border-b-2 border-black'
                    : null
                } ${favTeams.includes(team.teamId) ? 'font-bold' : null}`}
              >
                <TableCell>{team.table.position}</TableCell>
                <TableCell className="text-left">{team.casualName}</TableCell>
                <TableCell className="text-slate-100">
                  {round[0] > 0 &&
                    team.table.games > 0 &&
                    displayArrow(team.teamId)}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {team.table.games}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {team.table.wins}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {team.table.draws}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {team.table.lost}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {team.table.scoredGoals}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {team.table.concededGoals}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {team.table.scoredGoals - team.table.concededGoals}
                </TableCell>
                <TableCell className="text-right tabular-nums">
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
