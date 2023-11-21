import { useState, useEffect } from 'react'

const AllData = ({ allData, compObject }) => {
  const [width, setWidth] = useState(window.innerWidth)
  const breakpoint = 768
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleWindowResize)

    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])

  const games = compObject.teamArray.length > 2 ? allData : allData.slice(1)

  return (
    <div>
      <h3 className="text-sm font-bold md:text-lg">Sammanlagt</h3>
      <table className="compareGames mb-2 w-full table-fixed text-[8px] sm:text-sm xl:w-[36rem]">
        <thead>
          <tr key={`tableheadAllgames`}>
            <th scope="col" className="team">
              Lag
            </th>
            <th scope="col">M</th>
            <th scope="col">V</th>
            <th scope="col">O</th>
            <th scope="col">F</th>
            <th scope="col" className="twelve">
              GM
            </th>
            <th scope="col" className="twelve">
              IM
            </th>
            <th scope="col" className="twelve">
              MS
            </th>
            <th scope="col">P</th>
          </tr>
        </thead>
        <tbody>
          {games.map((team, index) => {
            return (
              <tr
                key={`${team.teamId}-${index}`}
                className="rounded odd:bg-slate-300"
              >
                {compObject.teamArray.length > 2 && (
                  <td className="team">
                    {width < breakpoint
                      ? `${team.lag.shortName}`
                      : `${team.lag.casualName}`}
                  </td>
                )}
                {compObject.teamArray.length === 2 && (
                  <td className="team">
                    {width < breakpoint
                      ? `${team.lag.shortName}-${team.opp.shortName}`
                      : `${team.lag.casualName}-${team.opp.casualName}`}
                  </td>
                )}
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

export default AllData
