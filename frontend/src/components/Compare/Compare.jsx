import { useLocation } from 'react-router-dom'
import { useQuery } from 'react-query'
import { compareTeams } from '../../requests/tables'
import {
  compareSortFunction,
  compareAllTeamData,
} from '../utilitycomponents/sortFunction'
import { groupConstant } from '../utilitycomponents/constants'
import Spinner from '../utilitycomponents/spinner'
import dayjs from 'dayjs'
import 'dayjs/locale/sv'

dayjs.locale('sv')

const Compare = () => {
  const location = useLocation()
  const teamArray = location.state

  const { data, isLoading, error } = useQuery(['compareTeams', teamArray], () =>
    compareTeams(teamArray)
  )

  if (isLoading) {
    return (
      <div className="grid h-screen place-items-center mx-auto font-inter text-[#011d29]">
        <Spinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="grid h-screen place-items-center mx-auto font-inter text-[#011d29]">
        Något gick fel.
      </div>
    )
  }

  const categoryData = compareSortFunction(data.data.tabeller)
  const allData =
    teamArray.teamArray.length === 2
      ? data.data.compareAllGames
      : compareAllTeamData(data.data.compareAllGames)

  const seasons = data.data.seasons
  const playoffs = data.data.playoffs
  const golds = data.data.golds
  const firstGames = data.data.firstAndLatestGames.filter(
    (game) => game.ranked_first_games === '1'
  )
  const latestGames = data.data.firstAndLatestGames.filter(
    (game) => game.ranked_last_games === '1'
  )

  return (
    <div className="max-w-7xl min-h-screen font-inter text-[#011d29] mx-auto flex flex-row justify-between">
      {allData.length === 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-2 text-center">
            Lagen har aldrig mötts.
          </h2>
        </div>
      )}
      {allData.length > 0 && (
        <div>
          {teamArray.teamArray.length > 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-2">Inbördes möten</h2>
              <div>
                <h3 className="text-lg font-bold">Sammanlagt</h3>
                <table className="table-fixed w-[36rem] mb-6">
                  <thead>
                    <tr key={`tableheadAllgames`}>
                      <th scope="col" className="w-56 px-1 py-2 text-left">
                        Lag
                      </th>
                      <th scope="col" className="w-8 px-1 py-2 text-right">
                        M
                      </th>
                      <th scope="col" className="w-8 px-1 py-2 text-right">
                        V
                      </th>
                      <th scope="col" className="w-8 px-1 py-2 text-right">
                        O
                      </th>
                      <th scope="col" className="w-8 px-1 py-2 text-right">
                        F
                      </th>
                      <th scope="col" className="w-12 px-1 py-2 text-right">
                        GM
                      </th>
                      <th scope="col" className="w-12 px-1 py-2 text-right">
                        IM
                      </th>
                      <th scope="col" className="w-12 px-1 py-2 text-right">
                        MS
                      </th>
                      <th scope="col" className="w-8 px-1 py-2 text-right">
                        P
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allData.map((team, index) => {
                      return (
                        <tr
                          key={`${team.teamId}-${index}`}
                          className="odd:bg-slate-300 rounded"
                        >
                          <td className="px-1 py-2">{team.lag.casualName}</td>
                          <td className="px-1 py-2 text-right tabular-nums">
                            {team.total_games}
                          </td>
                          <td className="px-1 py-2 text-right tabular-nums">
                            {team.total_wins}
                          </td>
                          <td className="px-1 py-2 text-right tabular-nums">
                            {team.total_draws}
                          </td>
                          <td className="px-1 py-2 text-right tabular-nums">
                            {team.total_lost}
                          </td>
                          <td className="px-1 py-2 text-right tabular-nums">
                            {team.total_goals_scored}
                          </td>
                          <td className="px-1 py-2 text-right tabular-nums">
                            {team.total_goals_conceded}
                          </td>
                          <td className="px-1 py-2 text-right tabular-nums">
                            {team.total_goal_difference}
                          </td>
                          <td className="px-1 py-2 p text-right tabular-nums">
                            {team.total_points}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-bold">Detaljerat</h3>
                {categoryData.map((category, index) => {
                  return (
                    <div key={category.category} className="mb-6">
                      <h4 className="text-base font-semibold">
                        {groupConstant[category.category]}
                      </h4>
                      <div>
                        <table className="table-fixed w-[36rem] mb-3">
                          <thead>
                            <tr key={`head-${category.category}-${index}`}>
                              <th
                                scope="col"
                                className="w-56 px-1 py-2 text-left"
                              >
                                Lag
                              </th>
                              <th
                                scope="col"
                                className="w-8 px-1 py-2 text-right"
                              >
                                M
                              </th>
                              <th
                                scope="col"
                                className="w-8 px-1 py-2 text-right"
                              >
                                V
                              </th>
                              <th
                                scope="col"
                                className="w-8 px-1 py-2 text-right"
                              >
                                O
                              </th>
                              <th
                                scope="col"
                                className="w-8 px-1 py-2 text-right"
                              >
                                F
                              </th>
                              <th
                                scope="col"
                                className="w-12 px-1 py-2 text-right"
                              >
                                GM
                              </th>
                              <th
                                scope="col"
                                className="w-12 px-1 py-2 text-right"
                              >
                                IM
                              </th>
                              <th
                                scope="col"
                                className="w-12 px-1 py-2 text-right"
                              >
                                MS
                              </th>
                              <th
                                scope="col"
                                className="w-8 px-1 py-2 text-right"
                              >
                                P
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {category.teams.map((team, index) => {
                              return (
                                <tr
                                  key={`${team.teamId}-${index}`}
                                  className="odd:bg-slate-300 rounded"
                                >
                                  <td className="px-1 py-2">
                                    {team.lag.casualName}-{team.opp.casualName}
                                  </td>
                                  <td className="px-1 py-2 text-right tabular-nums">
                                    {team.total_games}
                                  </td>
                                  <td className="px-1 py-2 text-right tabular-nums">
                                    {team.total_wins}
                                  </td>
                                  <td className="px-1 py-2 text-right tabular-nums">
                                    {team.total_draws}
                                  </td>
                                  <td className="px-1 py-2 text-right tabular-nums">
                                    {team.total_lost}
                                  </td>
                                  <td className="px-1 py-2 text-right tabular-nums">
                                    {team.total_goals_scored}
                                  </td>
                                  <td className="px-1 py-2 text-right tabular-nums">
                                    {team.total_goals_conceded}
                                  </td>
                                  <td className="px-1 py-2 text-right tabular-nums">
                                    {team.total_goal_difference}
                                  </td>
                                  <td className="px-1 py-2 p text-right tabular-nums">
                                    {team.total_points}
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
          {teamArray.teamArray.length === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-2">Inbördes möten</h2>
              <div>
                <h3 className="text-lg font-bold">Sammanlagt</h3>
                <table className="table-fixed w-[36rem] mb-6">
                  <thead>
                    <tr key={`tableheadAllgames`}>
                      <th scope="col" className="w-56 px-1 py-2 text-left">
                        Lag
                      </th>
                      <th scope="col" className="w-8 px-1 py-2 text-right">
                        M
                      </th>
                      <th scope="col" className="w-8 px-1 py-2 text-right">
                        V
                      </th>
                      <th scope="col" className="w-8 px-1 py-2 text-right">
                        O
                      </th>
                      <th scope="col" className="w-8 px-1 py-2 text-right">
                        F
                      </th>
                      <th scope="col" className="w-12 px-1 py-2 text-right">
                        GM
                      </th>
                      <th scope="col" className="w-12 px-1 py-2 text-right">
                        IM
                      </th>
                      <th scope="col" className="w-12 px-1 py-2 text-right">
                        MS
                      </th>
                      <th scope="col" className="w-8 px-1 py-2 text-right">
                        P
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allData.slice(1).map((team, index) => {
                      return (
                        <tr
                          key={`${team.teamId}-${index}`}
                          className="odd:bg-slate-300 rounded"
                        >
                          <td className="px-1 py-2">
                            {team.lag.casualName}-{team.opp.casualName}
                          </td>
                          <td className="px-1 py-2 text-right tabular-nums">
                            {team.total_games}
                          </td>
                          <td className="px-1 py-2 text-right tabular-nums">
                            {team.total_wins}
                          </td>
                          <td className="px-1 py-2 text-right tabular-nums">
                            {team.total_draws}
                          </td>
                          <td className="px-1 py-2 text-right tabular-nums">
                            {team.total_lost}
                          </td>
                          <td className="px-1 py-2 text-right tabular-nums">
                            {team.total_goals_scored}
                          </td>
                          <td className="px-1 py-2 text-right tabular-nums">
                            {team.total_goals_conceded}
                          </td>
                          <td className="px-1 py-2 text-right tabular-nums">
                            {team.total_goal_difference}
                          </td>
                          <td className="px-1 py-2 p text-right tabular-nums">
                            {team.total_points}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-bold">Detaljerat</h3>
                {categoryData.map((category, index) => {
                  return (
                    <div key={category.category} className="mb-6">
                      <h4 className="text-base font-semibold">
                        {groupConstant[category.category]}
                      </h4>
                      <div>
                        <table className="table-fixed w-[36rem] mb-3">
                          <thead>
                            <tr key={`head-${category.category}-${index}`}>
                              <th
                                scope="col"
                                className="w-56 px-1 py-2 text-left"
                              >
                                Lag
                              </th>
                              <th
                                scope="col"
                                className="w-8 px-1 py-2 text-right"
                              >
                                M
                              </th>
                              <th
                                scope="col"
                                className="w-8 px-1 py-2 text-right"
                              >
                                V
                              </th>
                              <th
                                scope="col"
                                className="w-8 px-1 py-2 text-right"
                              >
                                O
                              </th>
                              <th
                                scope="col"
                                className="w-8 px-1 py-2 text-right"
                              >
                                F
                              </th>
                              <th
                                scope="col"
                                className="w-12 px-1 py-2 text-right"
                              >
                                GM
                              </th>
                              <th
                                scope="col"
                                className="w-12 px-1 py-2 text-right"
                              >
                                IM
                              </th>
                              <th
                                scope="col"
                                className="w-12 px-1 py-2 text-right"
                              >
                                MS
                              </th>
                              <th
                                scope="col"
                                className="w-8 px-1 py-2 text-right"
                              >
                                P
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {category.teams.slice(1).map((team, index) => {
                              return (
                                <tr
                                  key={`${team.teamId}-${index}`}
                                  className="odd:bg-slate-300 rounded"
                                >
                                  <td className="px-1 py-2">
                                    {team.lag.casualName}-{team.opp.casualName}
                                  </td>
                                  <td className="px-1 py-2 text-right tabular-nums">
                                    {team.total_games}
                                  </td>
                                  <td className="px-1 py-2 text-right tabular-nums">
                                    {team.total_wins}
                                  </td>
                                  <td className="px-1 py-2 text-right tabular-nums">
                                    {team.total_draws}
                                  </td>
                                  <td className="px-1 py-2 text-right tabular-nums">
                                    {team.total_lost}
                                  </td>
                                  <td className="px-1 py-2 text-right tabular-nums">
                                    {team.total_goals_scored}
                                  </td>
                                  <td className="px-1 py-2 text-right tabular-nums">
                                    {team.total_goals_conceded}
                                  </td>
                                  <td className="px-1 py-2 text-right tabular-nums">
                                    {team.total_goal_difference}
                                  </td>
                                  <td className="px-1 py-2 p text-right tabular-nums">
                                    {team.total_points}
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}
      {allData.length > 0 && (
        <div className="w-[40rem]">
          <h2 className="text-2xl font-bold mb-2 text-right">Statistik</h2>
          <div className="flex flex-row justify-between">
            <div className="w-96">
              <div>
                <h3 className="text-lg font-bold">Första matcherna</h3>
                <table className="mb-3">
                  <thead>
                    <tr key={`head-first-games`}>
                      <th scope="col" className="w-60 px-1 py-2"></th>
                      <th scope="col" className="w-60 px-1 py-2"></th>
                      <th scope="col" className="w-16 px-1 py-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {firstGames.map((game) => {
                      return (
                        <tr
                          key={game.game_id}
                          className="odd:bg-slate-300 rounded"
                        >
                          <td className="px-1 py-1">
                            {game.date && (
                              <span>
                                {dayjs(game.date).format('D MMMM YYYY')}:
                              </span>
                            )}
                          </td>
                          <td className="px-1 py-1">
                            {game.home_name}-{game.away_name}
                          </td>
                          <td className="px-1 py-1">{game.result}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <div>
                <h3 className="text-lg font-bold">Senaste matcherna</h3>
                <table className="mb-3">
                  <thead>
                    <tr key={`head-latest-games`}>
                      <th scope="col" className="w-60 px-1 py-2"></th>
                      <th scope="col" className="w-60 px-1 py-2"></th>
                      <th scope="col" className="w-16 px-1 py-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {latestGames.map((game) => {
                      return (
                        <tr
                          key={game.game_id}
                          className="odd:bg-slate-300 rounded"
                        >
                          <td className="px-1 py-1">
                            {game.date && (
                              <span>
                                {dayjs(game.date).format('D MMMM YYYY')}:
                              </span>
                            )}
                          </td>
                          <td className="px-1 py-1">
                            {game.home_name}-{game.away_name}
                          </td>
                          <td className="px-1 py-1">{game.result}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="w-56">
              <div className="w-56">
                <h3 className="text-lg font-bold text-right">Säsonger</h3>
                <table className="mb-3 w-56">
                  <thead>
                    <tr key={`head-seasons`}>
                      <th scope="col" className="w-32 px-1 py-2 text-left"></th>
                      <th scope="col" className="w-8 px-1 py-2 text-right"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {seasons.map((team) => {
                      return (
                        <tr
                          key={team.team}
                          className="odd:bg-slate-300 rounded"
                        >
                          <td className="px-1 py-1">{team.casual_name}</td>
                          <td className="px-1 py-1 text-right">
                            {team.seasons}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <div>
                <h3 className="text-lg font-bold text-right">Slutspel</h3>
                <table className="mb-3 w-56">
                  <thead>
                    <tr key={`head-playoffs`}>
                      <th scope="col" className="w-32 px-1 py-2 text-left"></th>
                      <th scope="col" className="w-8 px-1 py-2 text-right"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {playoffs.map((team) => {
                      return (
                        <tr
                          key={team.team}
                          className="odd:bg-slate-300 rounded"
                        >
                          <td className="px-1 py-1">{team.casual_name}</td>
                          <td className="px-1 py-1 text-right">
                            {team.playoffs}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <div>
                <h3 className="text-lg font-bold text-right">SM-Guld</h3>
                <table className="mb-3 w-56">
                  <thead>
                    <tr key={`head-golds`}>
                      <th scope="col" className="w-32 px-1 py-2"></th>
                      <th scope="col" className="w-8 px-1 py-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {golds.map((team) => {
                      return (
                        <tr
                          key={team.team}
                          className="odd:bg-slate-300 rounded"
                        >
                          <td className="px-1 py-1">{team.casual_name}</td>
                          <td className="px-1 py-1 text-right">{team.guld}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Compare
