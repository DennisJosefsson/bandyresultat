import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { compareTeams } from '../../requests/tables'
import {
  compareSortFunction,
  compareAllTeamData,
  filterOpposition,
} from '../utilitycomponents/sortFunction'
import { groupConstant } from '../utilitycomponents/constants'
import Spinner from '../utilitycomponents/spinner'
import CompareHelpModal from './CompareHelpModal'
import StatsModal from './StatsModal'
import dayjs from 'dayjs'
import 'dayjs/locale/sv'

dayjs.locale('sv')

const Compare = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { compObject } = location.state
  const [showHelpModal, setShowHelpModal] = useState(false)
  const [showStatsModal, setShowStatsModal] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [width, setWidth] = useState(window.innerWidth)
  const breakpoint = 768

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleWindowResize)

    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])
  const { data, isLoading, error } = useQuery(
    ['compareTeams', compObject],
    () => compareTeams(compObject)
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

  const copyText = async (url) => {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(url)
    } else {
      return document.execCommand('copy', true, url)
    }
  }

  const handleCopyClick = (event) => {
    event.preventDefault()
    copyText(compareLink)
      .then(() => {
        setIsCopied(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const categoryData = compareSortFunction(data.data.tabeller)
  const allData =
    compObject.teamArray.length === 2
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
  const compareLink = `https://bandyresultat.se/link/${data.data.link[0].linkName}`

  const catStringArray = compObject.categoryArray.map(
    (cat) => groupConstant[cat]
  )

  let catString

  if (catStringArray.length === 1) {
    catString = 'i ' + catStringArray[0] + ','
  } else if (catStringArray.length === 6) {
    catString = ''
  } else {
    const last = catStringArray.pop()
    catString = 'i ' + catStringArray.join(', ') + ' och ' + last + ','
  }

  const teamStringArray = [
    ...new Set(data.data.compareAllGames.map((team) => team.lag.casualName)),
  ]

  const lastTeam = teamStringArray.pop()
  const teamString = teamStringArray.join(', ') + ' och ' + lastTeam

  return (
    <div className="max-w-7xl min-h-screen font-inter text-[#011d29] mx-auto flex flex-row justify-between pt-4">
      <div className="flex flex-row justify-between ml-2 xl:ml-0">
        {allData.length === 0 && (
          <div>
            <p className="font-bold text-base md:text-lg w-[90%] xl:w-[36rem] mb-2 lg:mb-4">
              Lagen har inte mötts {catString} sedan{' '}
              {data.data.seasonNames[0].year}.
            </p>
          </div>
        )}
        {allData.length > 0 && (
          <div>
            {compObject.teamArray.length > 2 && (
              <div className="w-full">
                <h2 className="text-base md:text-xl xl:text-2xl font-bold mb-2">
                  Inbördes möten
                </h2>
                <p className="font-bold text-xs md:text-sm w-[90%] xl:w-[36rem] mb-2 lg:mb-4">
                  Möten mellan {teamString} {catString}{' '}
                  {compObject.startSeason === compObject.endSeason
                    ? `säsongen ${data.data.seasonNames[0].year}`
                    : `mellan ${data.data.seasonNames[0].year} och ${data.data.seasonNames[1].year}.`}
                </p>
                <div>
                  <h3 className="text-sm md:text-lg font-bold">Sammanlagt</h3>
                  <table className="table-fixed text-[10px] md:text-base w-[90%] xl:w-[36rem] mb-6">
                    <thead>
                      <tr key={`tableheadAllgames`}>
                        <th
                          scope="col"
                          className="md:w-56 px-0.5 py-1 md:px-1 md:py-2 text-left"
                        >
                          Lag
                        </th>
                        <th
                          scope="col"
                          className="md:w-8 px-0.5 py-1 md:px-1 md:py-2 text-right"
                        >
                          M
                        </th>
                        <th
                          scope="col"
                          className="md:w-8 px-0.5 py-1 md:px-1 md:py-2 text-right"
                        >
                          V
                        </th>
                        <th
                          scope="col"
                          className="md:w-8 px-0.5 py-1 md:px-1 md:py-2 text-right"
                        >
                          O
                        </th>
                        <th
                          scope="col"
                          className="md:w-8 px-0.5 py-1 md:px-1 md:py-2 text-right"
                        >
                          F
                        </th>
                        <th
                          scope="col"
                          className="md:w-12 px-0.5 py-1 md:px-1 md:py-2 text-right"
                        >
                          GM
                        </th>
                        <th
                          scope="col"
                          className="md:w-12 px-0.5 py-1 md:px-1 md:py-2 text-right"
                        >
                          IM
                        </th>
                        <th
                          scope="col"
                          className="md:w-12 px-0.5 py-1 md:px-1 md:py-2 text-right"
                        >
                          MS
                        </th>
                        <th
                          scope="col"
                          className="md:w-8 px-0.5 py-1 md:px-1 md:py-2 text-right"
                        >
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
                            <td className="px-0.5 py-1 md:px-1 md:py-2">
                              {width < breakpoint
                                ? `${team.lag.shortName}`
                                : `${team.lag.casualName}`}
                            </td>
                            <td className="px-0.5 py-1 md:px-1 md:py-2 text-right tabular-nums">
                              {team.total_games}
                            </td>
                            <td className="px-0.5 py-1 md:px-1 md:py-2 text-right tabular-nums">
                              {team.total_wins}
                            </td>
                            <td className="px-0.5 py-1 md:px-1 md:py-2 text-right tabular-nums">
                              {team.total_draws}
                            </td>
                            <td className="px-0.5 py-1 md:px-1 md:py-2 text-right tabular-nums">
                              {team.total_lost}
                            </td>
                            <td className="px-0.5 py-1 md:px-1 md:py-2 text-right tabular-nums">
                              {team.total_goals_scored}
                            </td>
                            <td className="px-0.5 py-1 md:px-1 md:py-2 text-right tabular-nums">
                              {team.total_goals_conceded}
                            </td>
                            <td className="px-0.5 py-1 md:px-1 md:py-2 text-right tabular-nums">
                              {team.total_goal_difference}
                            </td>
                            <td className="px-0.5 py-1 md:px-1 md:py-2 p text-right tabular-nums">
                              {team.total_points}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="mb-6">
                  <h3 className="text-sm md:text-lg font-bold">Detaljerat</h3>
                  {categoryData.map((category, index) => {
                    return (
                      <div key={category.category} className="mb-6">
                        <h4 className="text-sm md:text-base font-semibold">
                          {groupConstant[category.category]}
                        </h4>
                        <div>
                          <table className="table-fixed text-[10px] md:text-base w-[90%] xl:w-[36rem] mb-3">
                            <thead>
                              <tr key={`head-${category.category}-${index}`}>
                                <th
                                  scope="col"
                                  className="md:w-56 px-0.5 py-1 md:px-1 md:py-2 text-left"
                                >
                                  Lag
                                </th>
                                <th
                                  scope="col"
                                  className="md:w-8 px-0.5 py-1 md:px-1 md:py-2 text-right"
                                >
                                  M
                                </th>
                                <th
                                  scope="col"
                                  className="md:w-8 px-0.5 py-1 md:px-1 md:py-2 text-right"
                                >
                                  V
                                </th>
                                <th
                                  scope="col"
                                  className="md:w-8 px-0.5 py-1 md:px-1 md:py-2 text-right"
                                >
                                  O
                                </th>
                                <th
                                  scope="col"
                                  className="md:w-8 px-0.5 py-1 md:px-1 md:py-2 text-right"
                                >
                                  F
                                </th>
                                <th
                                  scope="col"
                                  className="md:w-12 px-0.5 py-1 md:px-1 md:py-2 text-right"
                                >
                                  GM
                                </th>
                                <th
                                  scope="col"
                                  className="md:w-12 px-0.5 py-1 md:px-1 md:py-2 text-right"
                                >
                                  IM
                                </th>
                                <th
                                  scope="col"
                                  className="md:w-12 px-0.5 py-1 md:px-1 md:py-2 text-right"
                                >
                                  MS
                                </th>
                                <th
                                  scope="col"
                                  className="md:w-8 px-0.5 py-1 md:px-1 md:py-2 text-right"
                                >
                                  P
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {filterOpposition(category.teams).map(
                                (team, index) => {
                                  return (
                                    <tr
                                      key={`${team.teamId}-${index}`}
                                      className="odd:bg-slate-300 rounded"
                                    >
                                      <td className="px-0.5 py-1 md:px-1 md:py-2">
                                        {width < breakpoint
                                          ? `${team.lag.shortName}-${team.opp.shortName}`
                                          : `${team.lag.casualName}-${team.opp.casualName}`}
                                      </td>
                                      <td className="px-0.5 py-1 md:px-1 md:py-2 text-right tabular-nums">
                                        {team.total_games}
                                      </td>
                                      <td className="px-0.5 py-1 md:px-1 md:py-2 text-right tabular-nums">
                                        {team.total_wins}
                                      </td>
                                      <td className="px-0.5 py-1 md:px-1 md:py-2 text-right tabular-nums">
                                        {team.total_draws}
                                      </td>
                                      <td className="px-0.5 py-1 md:px-1 md:py-2 text-right tabular-nums">
                                        {team.total_lost}
                                      </td>
                                      <td className="px-0.5 py-1 md:px-1 md:py-2 text-right tabular-nums">
                                        {team.total_goals_scored}
                                      </td>
                                      <td className="px-0.5 py-1 md:px-1 md:py-2 text-right tabular-nums">
                                        {team.total_goals_conceded}
                                      </td>
                                      <td className="px-0.5 py-1 md:px-1 md:py-2 text-right tabular-nums">
                                        {team.total_goal_difference}
                                      </td>
                                      <td className="px-0.5 py-1 md:px-1 md:py-2 p text-right tabular-nums">
                                        {team.total_points}
                                      </td>
                                    </tr>
                                  )
                                }
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
            {compObject.teamArray.length === 2 && (
              <div className="w-full">
                <h2 className="text-base md:text-xl xl:text-2xl font-bold mb-2">
                  Inbördes möten
                </h2>
                <p className="font-bold text-xs md:text-sm w-[90%] xl:w-[36rem] mb-2 lg:mb-4">
                  Möten mellan {teamString} {catString}{' '}
                  {compObject.startSeason === compObject.endSeason
                    ? `säsongen ${data.data.seasonNames[0].year}`
                    : `mellan ${data.data.seasonNames[0].year} och ${data.data.seasonNames[1].year}.`}
                </p>
                <div>
                  <h3 className="text-sm md:text-lg font-bold">Sammanlagt</h3>
                  <table className="table-fixed text-[10px] md:text-base w-[90%] xl:w-[36rem] mb-6">
                    <thead>
                      <tr key={`tableheadAllgames`}>
                        <th
                          scope="col"
                          className="md:w-56 px-0.5 py-1 md:px-1 md:py-2 text-left"
                        >
                          Lag
                        </th>
                        <th
                          scope="col"
                          className="md:w-8 px-0.5 py-1 md:px-1 md:py-2 text-right"
                        >
                          M
                        </th>
                        <th
                          scope="col"
                          className="md:w-8 px-0.5 py-1 md:px-1 md:py-2 text-right"
                        >
                          V
                        </th>
                        <th
                          scope="col"
                          className="md:w-8 px-0.5 py-1 md:px-1 md:py-2 text-right"
                        >
                          O
                        </th>
                        <th
                          scope="col"
                          className="md:w-8 px-0.5 py-1 md:px-1 md:py-2 text-right"
                        >
                          F
                        </th>
                        <th
                          scope="col"
                          className="md:w-12 px-0.5 py-1 md:px-1 md:py-2 text-right"
                        >
                          GM
                        </th>
                        <th
                          scope="col"
                          className="md:w-12 px-0.5 py-1 md:px-1 md:py-2 text-right"
                        >
                          IM
                        </th>
                        <th
                          scope="col"
                          className="md:w-12 px-0.5 py-1 md:px-1 md:py-2 text-right"
                        >
                          MS
                        </th>
                        <th
                          scope="col"
                          className="md:w-8 px-0.5 py-1 md:px-1 md:py-2 text-right"
                        >
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
                            <td className="px-0.5 py-1 md:px-1 md:py-2">
                              {width < breakpoint
                                ? `${team.lag.shortName}-${team.opp.shortName}`
                                : `${team.lag.casualName}-${team.opp.casualName}`}
                            </td>
                            <td className="px-0.5 py-1 md:px-1 md:py-2 text-right tabular-nums">
                              {team.total_games}
                            </td>
                            <td className="px-0.5 py-1 md:px-1 md:py-2 text-right tabular-nums">
                              {team.total_wins}
                            </td>
                            <td className="px-0.5 py-1 md:px-1 md:py-2 text-right tabular-nums">
                              {team.total_draws}
                            </td>
                            <td className="px-0.5 py-1 md:px-1 md:py-2 text-right tabular-nums">
                              {team.total_lost}
                            </td>
                            <td className="px-0.5 py-1 md:px-1 md:py-2 text-right tabular-nums">
                              {team.total_goals_scored}
                            </td>
                            <td className="px-0.5 py-1 md:px-1 md:py-2 text-right tabular-nums">
                              {team.total_goals_conceded}
                            </td>
                            <td className="px-0.5 py-1 md:px-1 md:py-2 text-right tabular-nums">
                              {team.total_goal_difference}
                            </td>
                            <td className="px-0.5 py-1 md:px-1 md:py-2 p text-right tabular-nums">
                              {team.total_points}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="mb-6">
                  <h3 className="text-sm md:text-lg font-bold">Detaljerat</h3>
                  {categoryData.map((category, index) => {
                    return (
                      <div key={category.category} className="mb-6">
                        <h4 className="text-sm md:text-base font-semibold">
                          {groupConstant[category.category]}
                        </h4>
                        <div>
                          <table className="table-fixed text-[10px] md:text-base w-[90%] xl:w-[36rem] mb-3">
                            <thead>
                              <tr key={`head-${category.category}-${index}`}>
                                <th
                                  scope="col"
                                  className="md:w-56 px-0.5 py-1 md:px-1 md:py-2 text-left"
                                >
                                  Lag
                                </th>
                                <th
                                  scope="col"
                                  className="md:w-8 px-0.5 py-1 md:px-1 md:py-2 text-right"
                                >
                                  M
                                </th>
                                <th
                                  scope="col"
                                  className="md:w-8 px-0.5 py-1 md:px-1 md:py-2 text-right"
                                >
                                  V
                                </th>
                                <th
                                  scope="col"
                                  className="md:w-8 px-0.5 py-1 md:px-1 md:py-2 text-right"
                                >
                                  O
                                </th>
                                <th
                                  scope="col"
                                  className="md:w-8 px-0.5 py-1 md:px-1 md:py-2 text-right"
                                >
                                  F
                                </th>
                                <th
                                  scope="col"
                                  className="md:w-12 px-0.5 py-1 md:px-1 md:py-2 text-right"
                                >
                                  GM
                                </th>
                                <th
                                  scope="col"
                                  className="md:w-12 px-0.5 py-1 md:px-1 md:py-2 text-right"
                                >
                                  IM
                                </th>
                                <th
                                  scope="col"
                                  className="md:w-12 px-0.5 py-1 md:px-1 md:py-2 text-right"
                                >
                                  MS
                                </th>
                                <th
                                  scope="col"
                                  className="md:w-8 px-0.5 py-1 md:px-1 md:py-2 text-right"
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
                                    <td className="px-0.5 py-1 md:px-1 md:py-2">
                                      {width < breakpoint
                                        ? `${team.lag.shortName}-${team.opp.shortName}`
                                        : `${team.lag.casualName}-${team.opp.casualName}`}
                                    </td>
                                    <td className="px-0.5 py-1 md:px-1 md:py-2 text-right tabular-nums">
                                      {team.total_games}
                                    </td>
                                    <td className="px-0.5 py-1 md:px-1 md:py-2 text-right tabular-nums">
                                      {team.total_wins}
                                    </td>
                                    <td className="px-0.5 py-1 md:px-1 md:py-2 text-right tabular-nums">
                                      {team.total_draws}
                                    </td>
                                    <td className="px-0.5 py-1 md:px-1 md:py-2 text-right tabular-nums">
                                      {team.total_lost}
                                    </td>
                                    <td className="px-0.5 py-1 md:px-1 md:py-2 text-right tabular-nums">
                                      {team.total_goals_scored}
                                    </td>
                                    <td className="px-0.5 py-1 md:px-1 md:py-2 text-right tabular-nums">
                                      {team.total_goals_conceded}
                                    </td>
                                    <td className="px-0.5 py-1 md:px-1 md:py-2 text-right tabular-nums">
                                      {team.total_goal_difference}
                                    </td>
                                    <td className="px-0.5 py-1 md:px-1 md:py-2 p text-right tabular-nums">
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
      </div>
      <div className="mr-2 xl:mr-0">
        <div className="flex flex-col-reverse justify-end xl:flex-row xl:justify-end xl:gap-2 mb-2 xl:mb-6">
          {allData.length > 0 && (
            <div
              className="w-[84px] lg:w-[128px] cursor-pointer rounded-md px-1 py-0.5 lg:px-2 lg:py-1 bg-[#011d29] text-sm lg:text-lg text-white text-center mb-4 lg:mb-6 select-none"
              onClick={(event) => handleCopyClick(event)}
            >
              {isCopied ? 'Kopierad!' : 'Länk'}
            </div>
          )}
          <div
            onClick={() =>
              navigate('/teams', { state: { compObject: compObject } })
            }
            className="w-[84px] lg:w-[128px] cursor-pointer rounded-md px-1 py-0.5 lg:px-2 lg:py-1 bg-[#011d29] text-sm lg:text-lg text-white text-center mb-4 lg:mb-6 select-none"
          >
            Ändra
          </div>

          <div
            onClick={() => setShowHelpModal(true)}
            className="w-[84px] lg:w-[128px] cursor-pointer rounded-md px-1 py-0.5 lg:px-2 lg:py-1 bg-[#011d29] text-sm lg:text-lg text-white text-center mb-4 lg:mb-6 select-none"
          >
            Hjälp/Info
          </div>
          {allData.length > 0 && (
            <div
              onClick={() => setShowStatsModal(true)}
              className="w-[84px] lg:w-[128px] cursor-pointer rounded-md px-1 py-0.5 lg:px-2 lg:py-1 bg-[#011d29] text-sm lg:text-lg text-white text-center mb-4 lg:mb-6 xl:hidden select-none"
            >
              Statistik
            </div>
          )}
        </div>
        <div>
          {allData.length > 0 && (
            <div className="hidden xl:contents xl:w-[40rem]">
              <h2 className="text-2xl font-bold mb-2 text-right">Statistik</h2>
              <div className="flex flex-row justify-between gap-2">
                <div className="w-96">
                  <div>
                    <h3 className="text-lg font-bold">Första matcherna</h3>
                    <table className="mb-3">
                      <thead>
                        <tr key={`head-first-games`}>
                          <th
                            scope="col"
                            className="w-60 px-0.5 py-1 md:px-1 md:py-2"
                          ></th>
                          <th
                            scope="col"
                            className="w-60 px-0.5 py-1 md:px-1 md:py-2"
                          ></th>
                          <th
                            scope="col"
                            className="w-16 px-0.5 py-1 md:px-1 md:py-2"
                          ></th>
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
                          <th
                            scope="col"
                            className="w-60 px-0.5 py-1 md:px-1 md:py-2"
                          ></th>
                          <th
                            scope="col"
                            className="w-60 px-0.5 py-1 md:px-1 md:py-2"
                          ></th>
                          <th
                            scope="col"
                            className="w-16 px-0.5 py-1 md:px-1 md:py-2"
                          ></th>
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
                          <th
                            scope="col"
                            className="w-32 px-0.5 py-1 md:px-1 md:py-2 text-left"
                          ></th>
                          <th
                            scope="col"
                            className="w-8 px-0.5 py-1 md:px-1 md:py-2 text-right"
                          ></th>
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
                          <th
                            scope="col"
                            className="w-32 px-0.5 py-1 md:px-1 md:py-2 text-left"
                          ></th>
                          <th
                            scope="col"
                            className="w-8 px-0.5 py-1 md:px-1 md:py-2 text-right"
                          ></th>
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
                          <th
                            scope="col"
                            className="w-32 px-0.5 py-1 md:px-1 md:py-2"
                          ></th>
                          <th
                            scope="col"
                            className="w-8 px-0.5 py-1 md:px-1 md:py-2"
                          ></th>
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
                              <td className="px-1 py-1 text-right">
                                {team.guld}
                              </td>
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
      </div>

      {showHelpModal ? (
        <>
          <CompareHelpModal setShowModal={setShowHelpModal} />
        </>
      ) : null}
      {showStatsModal ? (
        <>
          <StatsModal
            setShowModal={setShowStatsModal}
            playoffs={playoffs}
            golds={golds}
            seasons={seasons}
            firstGames={firstGames}
            latestGames={latestGames}
          />
        </>
      ) : null}
    </div>
  )
}

export default Compare
