import { useState, useEffect } from 'react'
import { CompareResponseObjectType } from '../../types/teams/compare'
import { CompareFormState } from '../../types/teams/teams'
import AllDataTableHeader from './AllDataTableHeader'

type AllDataProps = {
  allData: CompareResponseObjectType['allData']
  sortedData: CompareResponseObjectType['sortedData']
  compObject: CompareFormState
}

const AllData = ({ allData, compObject, sortedData }: AllDataProps) => {
  const [width, setWidth] = useState(window.innerWidth)
  const breakpoint = 768
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleWindowResize)

    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])

  if (compObject.teamArray.length > 2) {
    return (
      <div>
        <h3 className="text-sm font-bold md:text-lg">Sammanlagt</h3>
        <table className="compareGames mb-2 w-full table-fixed text-[8px] sm:text-sm xl:w-[36rem]">
          <AllDataTableHeader />
          <tbody>
            {sortedData.map((team, index) => {
              return (
                <tr
                  key={`${team.team}-${index}`}
                  className="rounded odd:bg-slate-300"
                >
                  <td className="team">
                    {width < breakpoint
                      ? team.lag.shortName
                      : team.lag.casualName}
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
  } else
    return (
      <div>
        <h3 className="text-sm font-bold md:text-lg">Sammanlagt</h3>
        <table className="compareGames mb-2 w-full table-fixed text-[8px] sm:text-sm xl:w-[36rem]">
          <AllDataTableHeader />
          <tbody>
            {allData.slice(1).map((team, index) => {
              return (
                <tr
                  key={`${team.team}-${index}`}
                  className="rounded odd:bg-slate-300"
                >
                  <td className="team">
                    {width < breakpoint
                      ? `${team.lag.shortName}-${team.opp.shortName}`
                      : `${team.lag.casualName}-${team.opp.casualName}`}
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

export default AllData
