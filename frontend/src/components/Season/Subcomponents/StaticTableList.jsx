import { useState, useEffect } from 'react'

const StaticTableList = ({ tableArray, teams, seriesInfo, serieName }) => {
  const [width, setWidth] = useState(window.innerWidth)
  const breakpoint = 576

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleWindowResize)

    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])

  const group = tableArray[0].group

  return (
    <div className="mb-6">
      <div className="mb-6">
        <h2 className="text-sm font-bold lg:text-base xl:text-xl">
          {serieName}
        </h2>

        <div>
          <table className="w-full px-1 text-xs md:text-sm xl:text-base">
            <thead>
              <tr className="season">
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
              {tableArray
                .sort((a, b) => a.position - b.position)
                .map((team, index) => {
                  return (
                    <tr
                      key={`${team.teamId}-${index}`}
                      className={`season ${
                        seriesInfo
                          .find((serie) => serie.serieGroupCode === group)
                          .serieStructure?.includes(index + 1)
                          ? 'border-b-2 border-black'
                          : null
                      } odd:bg-slate-300`}
                    >
                      <td className="pos">{team.position}</td>
                      <td className="team">
                        {width < breakpoint
                          ? `${
                              teams.find((lag) => lag.teamId === team.teamId)
                                .shortName
                            }`
                          : `${
                              teams.find((lag) => lag.teamId === team.teamId)
                                .casualName
                            }`}
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
          {seriesInfo.find((serie) => serie.serieGroupCode === group).comment !=
            null && (
            <p className="bg-white p-1 text-xs font-bold">
              {
                seriesInfo.find((serie) => serie.serieGroupCode === group)
                  .comment
              }
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default StaticTableList
