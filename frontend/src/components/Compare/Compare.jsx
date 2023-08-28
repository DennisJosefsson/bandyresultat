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
import {
  ButtonComponent,
  HiddenButtonComponent,
} from '../utilitycomponents/ButtonComponents'
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
    () => compareTeams(compObject),
  )

  if (compObject === null) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
        Ingen data.
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
        <Spinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
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
    (game) => game.ranked_first_games === '1',
  )
  const latestGames = data.data.firstAndLatestGames.filter(
    (game) => game.ranked_last_games === '1',
  )
  const compareLink = `https://bandyresultat.se/link/${data.data.link[0].linkName}`

  const catStringArray = compObject.categoryArray.map(
    (cat) => groupConstant[cat],
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
    <div className="mx-auto flex min-h-screen max-w-7xl flex-row justify-between pt-4 font-inter text-[#011d29]">
      <div className="ml-2 flex flex-row justify-between xl:ml-0">
        {allData.length === 0 && (
          <div>
            <p className="mb-2 w-[90%] text-base font-bold md:text-lg lg:mb-4 xl:w-[36rem]">
              Lagen har inte mötts {catString} mellan{' '}
              {data.data.seasonNames[0].year} och{' '}
              {data.data.seasonNames[1].year}.
            </p>
          </div>
        )}
        {allData.length > 0 && (
          <div>
            {compObject.teamArray.length > 2 && (
              <div className="w-full">
                <h2 className="mb-2 text-base font-bold md:text-xl xl:text-2xl">
                  Inbördes möten
                </h2>
                <p className="mb-2 w-[90%] text-xs font-bold md:text-sm lg:mb-4 xl:w-[36rem]">
                  Möten mellan {teamString} {catString}{' '}
                  {compObject.startSeason === compObject.endSeason
                    ? `säsongen ${data.data.seasonNames[0].year}`
                    : `${data.data.seasonNames[0].year}-${data.data.seasonNames[1].year}.`}
                </p>
                <div>
                  <h3 className="text-sm font-bold md:text-lg">Sammanlagt</h3>
                  <table className="compareGames mb-6 w-[90%] table-fixed text-[10px] md:text-base xl:w-[36rem]">
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
                      {allData.map((team, index) => {
                        return (
                          <tr
                            key={`${team.teamId}-${index}`}
                            className="rounded odd:bg-slate-300"
                          >
                            <td className="team">
                              {width < breakpoint
                                ? `${team.lag.shortName}`
                                : `${team.lag.casualName}`}
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
                <div className="mb-6">
                  <h3 className="text-sm font-bold md:text-lg">Detaljerat</h3>
                  {categoryData.map((category, index) => {
                    return (
                      <div key={category.category} className="mb-6">
                        <h4 className="text-sm font-semibold md:text-base">
                          {groupConstant[category.category]}
                        </h4>
                        <div>
                          <table className="compareGames mb-3 w-[90%] table-fixed text-[10px] md:text-base xl:w-[36rem]">
                            <thead>
                              <tr key={`head-${category.category}-${index}`}>
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
                              {filterOpposition(category.teams).map(
                                (team, index) => {
                                  return (
                                    <tr
                                      key={`${team.teamId}-${index}`}
                                      className="rounded odd:bg-slate-300"
                                    >
                                      <td className="team">
                                        {width < breakpoint
                                          ? `${team.lag.shortName}-${team.opp.shortName}`
                                          : `${team.lag.casualName}-${team.opp.casualName}`}
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
                                },
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
                <h2 className="mb-2 text-base font-bold md:text-xl xl:text-2xl">
                  Inbördes möten
                </h2>
                <p className="mb-2 w-[90%] text-xs font-bold md:text-sm lg:mb-4 xl:w-[36rem]">
                  Möten mellan {teamString} {catString}{' '}
                  {compObject.startSeason === compObject.endSeason
                    ? `säsongen ${data.data.seasonNames[0].year}`
                    : `${data.data.seasonNames[0].year}-${data.data.seasonNames[1].year}.`}
                </p>
                <div>
                  <h3 className="text-sm font-bold md:text-lg">Sammanlagt</h3>
                  <table className="compareGames mb-6 w-[90%] table-fixed text-[10px] md:text-base xl:w-[36rem]">
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
                      {allData.slice(1).map((team, index) => {
                        return (
                          <tr
                            key={`${team.teamId}-${index}`}
                            className="rounded odd:bg-slate-300"
                          >
                            <td className="team">
                              {width < breakpoint
                                ? `${team.lag.shortName}-${team.opp.shortName}`
                                : `${team.lag.casualName}-${team.opp.casualName}`}
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
                <div className="mb-6">
                  <h3 className="text-sm font-bold md:text-lg">Detaljerat</h3>
                  {categoryData.map((category, index) => {
                    return (
                      <div key={category.category} className="mb-6">
                        <h4 className="text-sm font-semibold md:text-base">
                          {groupConstant[category.category]}
                        </h4>
                        <div>
                          <table className="compareGames mb-3 w-[90%] table-fixed text-[10px] md:text-base xl:w-[36rem]">
                            <thead>
                              <tr key={`head-${category.category}-${index}`}>
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
                              {category.teams.slice(1).map((team, index) => {
                                return (
                                  <tr
                                    key={`${team.teamId}-${index}`}
                                    className="rounded odd:bg-slate-300"
                                  >
                                    <td className="team">
                                      {width < breakpoint
                                        ? `${team.lag.shortName}-${team.opp.shortName}`
                                        : `${team.lag.casualName}-${team.opp.casualName}`}
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
        <div className="mb-2 flex flex-col-reverse justify-end xl:mb-6 xl:flex-row xl:justify-end xl:gap-2">
          {allData.length > 0 && (
            <ButtonComponent clickFunctions={(event) => handleCopyClick(event)}>
              {isCopied ? 'Kopierad!' : `Länk: ${compareLink}`}
            </ButtonComponent>
          )}
          <ButtonComponent
            clickFunctions={() =>
              navigate('/teams', { state: { compObject: compObject } })
            }
          >
            Ändra
          </ButtonComponent>

          <ButtonComponent clickFunctions={() => setShowHelpModal(true)}>
            Hjälp/Info
          </ButtonComponent>
          {allData.length > 0 && (
            <HiddenButtonComponent
              clickFunctions={() => setShowStatsModal(true)}
            >
              Statistik
            </HiddenButtonComponent>
          )}
        </div>
        <div>
          {allData.length > 0 && (
            <div className="hidden xl:contents xl:w-[40rem]">
              <h2 className="mb-2 text-right text-2xl font-bold">Statistik</h2>
              <div className="flex flex-row justify-between gap-2">
                <div className="w-96">
                  <div>
                    <h3 className="text-lg font-bold">Första matcherna</h3>
                    <table className="compareFirstLast mb-3">
                      <thead>
                        <tr key={`head-first-games`}>
                          <th scope="col" className="w-60"></th>
                          <th scope="col" className="w-60"></th>
                          <th scope="col" className="w-16"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {firstGames.map((game) => {
                          return (
                            <tr
                              key={game.game_id}
                              className="rounded odd:bg-slate-300"
                            >
                              <td>
                                {game.date && (
                                  <span>
                                    {dayjs(game.date).format('D MMMM YYYY')}:
                                  </span>
                                )}
                              </td>
                              <td>
                                {game.home_name}-{game.away_name}
                              </td>
                              <td>{game.result}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Senaste matcherna</h3>
                    <table className="compareFirstLast mb-3">
                      <thead>
                        <tr key={`head-latest-games`}>
                          <th scope="col" className="w-60"></th>
                          <th scope="col" className="w-60"></th>
                          <th scope="col" className="w-16"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {latestGames.map((game) => {
                          return (
                            <tr
                              key={game.game_id}
                              className="rounded odd:bg-slate-300"
                            >
                              <td>
                                {game.date && (
                                  <span>
                                    {dayjs(game.date).format('D MMMM YYYY')}:
                                  </span>
                                )}
                              </td>
                              <td>
                                {game.home_name}-{game.away_name}
                              </td>
                              <td>{game.result}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="w-56">
                  <div className="w-56">
                    <h3 className="text-right text-lg font-bold">Säsonger</h3>
                    <table className="compareStats mb-3 w-56">
                      <thead>
                        <tr key={`head-seasons`}>
                          <th scope="col" className="w-32 text-left"></th>
                          <th scope="col" className="w-8 text-right"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {seasons.map((team) => {
                          return (
                            <tr
                              key={team.team}
                              className="rounded odd:bg-slate-300"
                            >
                              <td>{team.casual_name}</td>
                              <td className="text-right">{team.seasons}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div>
                    <h3 className="text-right text-lg font-bold">Slutspel</h3>
                    <table className="compareStats mb-3 w-56">
                      <thead>
                        <tr key={`head-playoffs`}>
                          <th scope="col" className="w-32 text-left"></th>
                          <th scope="col" className="w-8 text-right"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {playoffs.map((team) => {
                          return (
                            <tr
                              key={team.team}
                              className="rounded odd:bg-slate-300"
                            >
                              <td>{team.casual_name}</td>
                              <td className="text-right">{team.playoffs}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div>
                    <h3 className="text-right text-lg font-bold">SM-Guld</h3>
                    <table className="compareStats mb-3 w-56">
                      <thead>
                        <tr key={`head-golds`}>
                          <th scope="col" className="w-32"></th>
                          <th scope="col" className="w-8"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {golds.map((team) => {
                          return (
                            <tr
                              key={team.team}
                              className="rounded odd:bg-slate-300"
                            >
                              <td>{team.casual_name}</td>
                              <td className="text-right">{team.guld}</td>
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
