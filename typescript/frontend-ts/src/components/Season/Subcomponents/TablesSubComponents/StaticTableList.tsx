import { useState, useEffect } from 'react'
import { StaticSeasonTable } from '../../../types/tables/tables'
import { TeamAndSeasonAttributes } from '../../../types/teams/teams'
import { SerieAttributes } from '../../../types/series/series'
import {
  sortTitles,
  staticFunctions,
} from '../../../utilitycomponents/functions/tableSortFunctions'

type StaticTableListProps = {
  tableArray: StaticSeasonTable[]
  teams: TeamAndSeasonAttributes[]
  seriesInfo: SerieAttributes[]
  serieName: string
}

const StaticTableList = ({
  tableArray,
  teams,
  seriesInfo,
  serieName,
}: StaticTableListProps) => {
  const [width, setWidth] = useState(window.innerWidth)
  const [sortColumn, setSortColumn] = useState<string>('staticPointsDesc')
  const breakpoint = 576

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleWindowResize)

    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])

  const group = tableArray[0]?.group

  const serieObject = seriesInfo.find((serie) => serie.serieGroupCode === group)
  if (!serieObject) throw new Error('Missing serie object')

  return (
    <div className="my-6">
      <div className="mb-6">
        <h2 className="text-sm font-bold lg:text-base xl:text-xl">
          {serieName}
        </h2>
        <p className="m-2 text-[8px] sm:text-xs xl:m-0">
          Sorteras efter {sortTitles[sortColumn]}
        </p>
        <div>
          <table className="season w-full px-1 text-xs md:text-sm">
            <thead>
              <tr>
                <th scope="col" className="pos">
                  Pos
                </th>
                <th scope="col" className="team">
                  Lag
                </th>
                <th
                  scope="col"
                  className="cursor-pointer"
                  onClick={() =>
                    setSortColumn(
                      sortColumn !== 'staticgamesDesc'
                        ? 'staticgamesDesc'
                        : 'staticgamesAsc',
                    )
                  }
                >
                  M
                </th>
                <th
                  scope="col"
                  className="cursor-pointer"
                  onClick={() =>
                    setSortColumn(
                      sortColumn !== 'staticWinDesc'
                        ? 'staticWinDesc'
                        : 'staticWinAsc',
                    )
                  }
                >
                  V
                </th>
                <th
                  scope="col"
                  className="cursor-pointer"
                  onClick={() =>
                    setSortColumn(
                      sortColumn !== 'staticDrawDesc'
                        ? 'staticDrawDesc'
                        : 'staticDrawAsc',
                    )
                  }
                >
                  O
                </th>
                <th
                  scope="col"
                  className="cursor-pointer"
                  onClick={() =>
                    setSortColumn(
                      sortColumn !== 'staticLostDesc'
                        ? 'staticLostDesc'
                        : 'staticLostAsc',
                    )
                  }
                >
                  F
                </th>
                <th
                  scope="col"
                  className="twelve cursor-pointer"
                  onClick={() =>
                    setSortColumn(
                      sortColumn !== 'staticScoredDesc'
                        ? 'staticScoredDesc'
                        : 'staticScoredAsc',
                    )
                  }
                >
                  GM
                </th>
                <th
                  scope="col"
                  className="twelve cursor-pointer"
                  onClick={() =>
                    setSortColumn(
                      sortColumn !== 'staticConcededDesc'
                        ? 'staticConcededDesc'
                        : 'staticConcededAsc',
                    )
                  }
                >
                  IM
                </th>
                <th
                  scope="col"
                  className="twelve cursor-pointer"
                  onClick={() =>
                    setSortColumn(
                      sortColumn !== 'staticGoalDiffDesc'
                        ? 'staticGoalDiffDesc'
                        : 'staticGoalDiffAsc',
                    )
                  }
                >
                  MS
                </th>
                <th
                  scope="col"
                  className="cursor-pointer"
                  onClick={() =>
                    setSortColumn(
                      sortColumn !== 'staticPointsDesc'
                        ? 'staticPointsDesc'
                        : 'staticPointsAsc',
                    )
                  }
                >
                  P
                </th>
              </tr>
            </thead>
            <tbody>
              {tableArray
                .sort(staticFunctions[sortColumn])
                .map((team, index) => {
                  const teamObject = teams.find(
                    (lag) => lag.teamId === team.teamId,
                  )

                  if (!teamObject) throw new Error('Missing team object')
                  return (
                    <tr
                      key={`${team.teamId}-${index}`}
                      className={`season ${
                        serieObject.serieStructure?.includes(index + 1)
                          ? 'border-b-2 border-black'
                          : null
                      } odd:bg-slate-300`}
                    >
                      <td className="pos">{team.position}</td>
                      <td className="team">
                        {width < breakpoint
                          ? `${teamObject.shortName}`
                          : `${teamObject.casualName}`}
                      </td>

                      <td>{team.games}</td>
                      <td>{team.won}</td>
                      <td>{team.draw}</td>
                      <td>{team.lost}</td>
                      <td>{team.scoredGoals}</td>
                      <td>{team.concededGoals}</td>
                      <td>{team.goalDifference}</td>
                      <td>{team.points}</td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
          {serieObject.comment != null && (
            <p className="bg-white p-1 text-xs font-bold">
              {serieObject.comment}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default StaticTableList
