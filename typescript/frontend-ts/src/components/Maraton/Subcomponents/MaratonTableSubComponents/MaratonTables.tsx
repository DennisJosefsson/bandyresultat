import { useState, useEffect } from 'react'
import { MaratonTabell } from '../../../types/tables/tables'
import useTeampreferenceContext from '../../../../hooks/contextHooks/useTeampreferenceContext'
import {
  sortTitles,
  maratonSortFunctions,
} from '../../../utilitycomponents/functions/tableSortFunctions'

const MaratonTables = ({ tabell }: { tabell: MaratonTabell }) => {
  const [sortColumn, setSortColumn] = useState('maratonPointsDesc')
  const [width, setWidth] = useState(window.innerWidth)
  const breakpoint = 576

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleWindowResize)

    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])

  const { favTeams } = useTeampreferenceContext()

  return (
    <div className="w-full">
      <p className="m-2 text-[8px] sm:text-xs xl:m-0">
        Sorteras efter {sortTitles[sortColumn]}
      </p>
      <table className="w-full table-auto text-[10px] md:text-sm">
        <thead>
          <tr className="maraton" key={'header'}>
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
                  sortColumn !== 'gamesDesc' ? 'gamesDesc' : 'gamesAsc',
                )
              }
            >
              M
            </th>
            <th
              scope="col"
              className="cursor-pointer"
              onClick={() =>
                setSortColumn(sortColumn !== 'winDesc' ? 'winDesc' : 'winAsc')
              }
            >
              V
            </th>
            <th
              scope="col"
              className="cursor-pointer"
              onClick={() =>
                setSortColumn(
                  sortColumn !== 'drawDesc' ? 'drawDesc' : 'drawAsc',
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
                  sortColumn !== 'lostDesc' ? 'lostDesc' : 'lostAsc',
                )
              }
            >
              F
            </th>
            <th
              scope="col"
              className="cursor-pointer"
              onClick={() =>
                setSortColumn(
                  sortColumn !== 'scoredDesc' ? 'scoredDesc' : 'scoredAsc',
                )
              }
            >
              GM
            </th>
            <th
              scope="col"
              className="cursor-pointer"
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
              className="cursor-pointer"
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
              className="cursor-pointer"
              onClick={() =>
                setSortColumn(
                  sortColumn !== 'maratonPointsDesc'
                    ? 'maratonPointsDesc'
                    : 'maratonPointsAsc',
                )
              }
            >
              Poä
            </th>
          </tr>
        </thead>
        <tbody>
          {tabell.sort(maratonSortFunctions[sortColumn]).map((team, index) => {
            return (
              <tr
                key={`${team.team}-${index}`}
                className={
                  favTeams.includes(team.team)
                    ? 'maraton rounded font-bold odd:bg-slate-300'
                    : 'maraton rounded odd:bg-slate-300'
                }
              >
                <td className="center">{index + 1}</td>
                <td className="left">
                  {width < breakpoint
                    ? `${team.lag.shortName}`
                    : `${team.lag.name}`}
                </td>
                <td>{team.totalGames}</td>
                <td>{team.totalWins}</td>
                <td>{team.totalDraws}</td>
                <td>{team.totalLost}</td>
                <td>{team.totalGoalsScored}</td>
                <td>{team.totalGoalsConceded}</td>
                <td>{team.totalGoalDifference}</td>
                <td>{team.totalPoints}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default MaratonTables
