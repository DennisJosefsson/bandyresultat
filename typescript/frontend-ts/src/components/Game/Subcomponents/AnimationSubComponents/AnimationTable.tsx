import { TeamPreference } from '../../../../contexts/contexts'
import { GameObjectType } from '../../../types/games/games'
import { SerieAttributes } from '../../../types/series/series'
import {
  SmallArrowDownRight,
  SmallArrowUpRight,
} from '../../../utilitycomponents/Components/icons'

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
  favTeams: TeamPreference
  group: string | null
}

const AnimationTable = ({
  dateArray,
  round,
  seriesArray,
  favTeams,
  group,
}: AnimationTableProps) => {
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
    <div className="mx-2 mt-4 xl:mx-0">
      <table className="season w-full text-xs md:text-sm ">
        <thead>
          <tr>
            <th scope="col" className="pos"></th>
            <th scope="col" className="team"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col" className="twelve"></th>
            <th scope="col" className="twelve"></th>
            <th scope="col" className="twelve"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {dateArray[round]?.table.map((team, index) => {
            return (
              <tr
                key={`${team.teamId}-${index}`}
                className={`season ${
                  serieObject?.serieStructure?.includes(index + 1)
                    ? 'border-b-2 border-black'
                    : null
                } ${
                  favTeams.includes(team.teamId) ? 'font-bold' : null
                } odd:bg-slate-300`}
              >
                <td className="pos">{team.table.position}</td>
                <td className="team">{team.casualName}</td>
                <td className="text-slate-100">
                  {round > 0 &&
                    team.table.games > 0 &&
                    displayArrow(team.teamId)}
                </td>
                <td>{team.table.games}</td>
                <td>{team.table.wins}</td>
                <td>{team.table.draws}</td>
                <td>{team.table.lost}</td>
                <td className="twelve">{team.table.scoredGoals}</td>
                <td className="twelve">{team.table.concededGoals}</td>
                <td className="twelve">
                  {team.table.scoredGoals - team.table.concededGoals}
                </td>
                <td>{team.table.points}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {serieObject?.comment && (
        <p className="bg-white p-1 text-xs font-bold">{serieObject?.comment}</p>
      )}
    </div>
  )
}

export default AnimationTable
