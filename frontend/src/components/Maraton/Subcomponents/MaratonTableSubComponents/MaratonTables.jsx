import { useState, useEffect, useContext } from 'react'
import { TeamPreferenceContext } from '../../../../contexts/contexts'

const MaratonTables = ({ tabell }) => {
  const { favTeams } = useContext(TeamPreferenceContext)
  const [width, setWidth] = useState(window.innerWidth)
  const breakpoint = 576

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleWindowResize)

    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])
  return (
    <div className="w-full">
      <table className="w-full table-auto text-[10px] md:text-sm">
        <thead>
          <tr className="maraton" key={'header'}>
            <th scope="col" className="pos">
              Pos
            </th>
            <th scope="col" className="team">
              Lag
            </th>
            <th scope="col">M</th>
            <th scope="col">V</th>
            <th scope="col">O</th>
            <th scope="col">F</th>
            <th scope="col">GM</th>
            <th scope="col">IM</th>
            <th scope="col">MS</th>
            <th scope="col">Poä</th>
          </tr>
        </thead>
        <tbody>
          {tabell.map((team, index) => {
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
                <td>{team.total_games}</td>
                <td>{team.total_wins}</td>
                <td>{team.total_draws}</td>
                <td>{team.total_lost}</td>
                <td>{team.total_goals_scored}</td>
                <td>{team.total_goals_conceded}</td>
                <td>{team.total_goal_difference}</td>
                <td>{team.total_points}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default MaratonTables
