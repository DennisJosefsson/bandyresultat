import { useState, useEffect } from 'react'

import useTeampreferenceContext from '../../../../hooks/contextHooks/useTeampreferenceContext'

import { SerieAttributes } from '../../../types/series/series'
import { SortedTablesType } from '../../../utilitycomponents/functions/sortFunction'
import {
  sortTitles,
  sortFunctions,
  calculateBonusPoints,
} from '../../../utilitycomponents/functions/tableSortFunctions'

type BonusPointsType = {
  group: string
  bonusPoints: { [key: string]: number } | null
}

type TableListProps = {
  tableArray: SortedTablesType
  seriesInfo: SerieAttributes[]
  bonusPoints: BonusPointsType[]
  homeAwayTitle: string
  selectedTable: string
}

const TableList = ({
  tableArray,
  seriesInfo,
  bonusPoints,
  homeAwayTitle,
  selectedTable,
}: TableListProps) => {
  const [width, setWidth] = useState(window.innerWidth)
  const [sortColumn, setSortColumn] = useState('tablePointsDesc')
  const { favTeams } = useTeampreferenceContext()
  const breakpoint = 576

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleWindowResize)

    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])

  return (
    <div className="mb-6">
      {tableArray.map((group) => {
        const serieObject = seriesInfo.find(
          (serie) => serie.serieGroupCode === group.group,
        )
        if (!serieObject) throw new Error('Missing serieObject')
        const serieName = serieObject.serieName

        return (
          <div key={group.group} className="mb-6">
            {group.group.includes('Kval') && tableArray.length === 1 ? (
              <>
                <h2 className="ml-1 text-[0.75rem] font-bold lg:text-[1rem] xl:ml-0 xl:text-xl">
                  Kvalgrupp {homeAwayTitle}
                </h2>
                <p className="m-1 text-[8px] sm:text-xs xl:m-0">
                  Sorteras efter {sortTitles[sortColumn]}
                </p>
              </>
            ) : (
              <>
                <h2 className="ml-1 text-sm font-bold lg:text-base xl:ml-0 xl:text-xl">
                  {serieName} {homeAwayTitle}
                </h2>
                <p className="m-1 text-[8px] sm:text-xs xl:m-0">
                  Sorteras efter {sortTitles[sortColumn]}
                </p>
              </>
            )}
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
                      className="cursor-pointer"
                      scope="col"
                      onClick={() =>
                        setSortColumn(
                          sortColumn !== 'gamesDesc' ? 'gamesDesc' : 'gamesAsc',
                        )
                      }
                    >
                      M
                    </th>
                    <th
                      className="cursor-pointer"
                      scope="col"
                      onClick={() =>
                        setSortColumn(
                          sortColumn !== 'winDesc' ? 'winDesc' : 'winAsc',
                        )
                      }
                    >
                      V
                    </th>
                    <th
                      className="cursor-pointer"
                      scope="col"
                      onClick={() =>
                        setSortColumn(
                          sortColumn !== 'drawDesc' ? 'drawDesc' : 'drawAsc',
                        )
                      }
                    >
                      O
                    </th>
                    <th
                      className="cursor-pointer"
                      scope="col"
                      onClick={() =>
                        setSortColumn(
                          sortColumn !== 'lostDesc' ? 'lostDesc' : 'lostAsc',
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
                          sortColumn !== 'scoredDesc'
                            ? 'scoredDesc'
                            : 'scoredAsc',
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
                          sortColumn !== 'concededDesc'
                            ? 'concededDesc'
                            : 'concededAsc',
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
                          sortColumn !== 'goalDiffDesc'
                            ? 'goalDiffDesc'
                            : 'goalDiffAsc',
                        )
                      }
                    >
                      MS
                    </th>
                    <th
                      scope="col"
                      className="points group cursor-pointer"
                      onClick={() =>
                        setSortColumn(
                          sortColumn !== 'tablePointsDesc'
                            ? 'tablePointsDesc'
                            : 'tablePointsAsc',
                        )
                      }
                    >
                      P
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {group.tables
                    .sort(
                      sortFunctions[sortColumn](
                        bonusPoints,
                        group.group,
                        selectedTable,
                      ),
                    )
                    .map((team, index) => {
                      return (
                        <tr
                          key={`${team.team}-${index}`}
                          className={`season ${
                            serieObject.serieStructure?.includes(index + 1)
                              ? 'border-b-2 border-black'
                              : null
                          } ${
                            favTeams.includes(team.team) ? 'font-bold' : null
                          } odd:bg-slate-300`}
                        >
                          <td className="pos">{index + 1}</td>
                          <td className="team">
                            {width < breakpoint
                              ? `${team.lag.shortName}`
                              : `${team.lag.name}`}
                          </td>

                          <td>
                            {team.totalWins + team.totalDraws + team.totalLost}
                          </td>
                          <td>{team.totalWins}</td>
                          <td>{team.totalDraws}</td>
                          <td>{team.totalLost}</td>
                          <td>{team.totalGoalsScored}</td>
                          <td>{team.totalGoalsConceded}</td>
                          <td>{team.totalGoalDifference}</td>
                          <td className="points">
                            {Number(team.totalPoints) +
                              Number(
                                calculateBonusPoints(
                                  bonusPoints,
                                  selectedTable,
                                  group.group,
                                  team.team,
                                ),
                              )}
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
              {serieObject.comment && (
                <p className="bg-white p-1 text-xs font-bold">
                  {serieObject.comment}
                </p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default TableList
