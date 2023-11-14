import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient } from 'react-query'
import { compareTeams } from '../../requests/tables'
import {
  compareSortFunction,
  compareAllTeamData,
  filterOpposition,
} from '../../components/utilitycomponents/Functions/sortFunction'
import { groupConstant } from '../../components/utilitycomponents/Functions/constants'
import Spinner from '../../components/utilitycomponents/Components/spinner'
import { handleCopyClick } from '../utilitycomponents/Functions/copyLinkFunctions'
import { ButtonComponent } from '../../components/utilitycomponents/Components/ButtonComponents'
import dayjs from 'dayjs'
import 'dayjs/locale/sv'

dayjs.locale('sv')

const Compare = ({ compObject, origin }) => {
  const navigate = useNavigate()
  const client = useQueryClient()
  const [isCopied, setIsCopied] = useState(false)
  const [width, setWidth] = useState(window.innerWidth)
  const breakpoint = 768

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    const handleWindowResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleWindowResize)

    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])

  const { data, isLoading, error } = useQuery(
    ['compareTeams', compObject],
    () => compareTeams(compObject),
  )

  if (compObject === null || compObject === undefined) {
    client.cancelQueries({ queryKey: ['compareTeams'] })

    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
        <p className="mx-10 text-center">
          Någon sköt högt över mål, och alla bollar i bollkorgarna är borta. Det
          var nog inte meningen att det skulle länkas till denna sidan direkt,
          så tyvärr har vi ingen information till dig. Om du kom hit från en
          länk på bandyresultat.se, meddela gärna dennis@bandyresultat.se att
          det finns en bugg han behöver fixa.
        </p>
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

  const categoryData = compareSortFunction(data.data.tabeller)
  const allData =
    compObject.teamArray.length === 2
      ? data.data.compareAllGames
      : compareAllTeamData(data.data.compareAllGames)

  console.log(data.data.compareAllGames.slice(1))

  const seasons = data.data.seasons
  const playoffs = data.data.playoffs
  const allSeasons = data.data.allSeasons
  const allPlayoffs = data.data.allPlayoffs
  const golds = data.data.golds
  const firstGames = data.data.firstAndLatestGames
    .filter((game) => game.ranked_first_games === '1')
    .sort((a, b) => a.date < b.date)

  const latestGames =
    compObject.teamArray.length === 2
      ? data.data.firstAndLatestGames
          .filter((game) => game.ranked_first_games !== '1')
          .sort((a, b) => new Date(b.date) - new Date(a.date))
      : data.data.firstAndLatestGames
          .filter((game) => game.ranked_last_games === '1')
          .sort((a, b) => new Date(b.date) - new Date(a.date))

  const baseUrl = import.meta.env.PROD
    ? 'https://bandyresultat.se'
    : 'http://localhost:5173'
  const compareLink = `${baseUrl}/link/${data.data.link[0].linkName}`

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

  const startSeasonName =
    data.data.seasonNames[0].seasonId < data.data.seasonNames[1].seasonId
      ? data.data.seasonNames[0].year
      : data.data.seasonNames[1].year
  const endSeasonName =
    data.data.seasonNames[0].seasonId > data.data.seasonNames[1].seasonId
      ? data.data.seasonNames[0].year
      : data.data.seasonNames[1].year

  const janFirstGames = compObject.women
    ? 'Speldatum 1 januari från säsongerna 1988/1989 och 1989/1990 gäller enbart tillsvidare, de betyder att faktiskt datum saknas.'
    : 'Obs! Speldatum 1 januari före 1931 gäller enbart tillsvidare, de betyder att faktiskt datum saknas.'

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col pt-4 font-inter text-[#011d29]">
      {allData.length === 0 && (
        <div className="mx-2 flex flex-row justify-between xl:mx-0">
          <div>
            <p className="mb-2 w-[90%] text-base font-bold md:text-lg lg:mb-4 xl:w-[36rem]">
              Lagen har inte mötts {catString} mellan{' '}
              {data.data.seasonNames[0].year} och{' '}
              {data.data.seasonNames[1].year}.
            </p>
          </div>
          <div className="mb-2 flex flex-col-reverse justify-end gap-2 xl:mb-6 xl:flex-row xl:justify-end">
            {origin === 'gamesList' && (
              <ButtonComponent clickFunctions={() => navigate(-1)}>
                Tillbaka
              </ButtonComponent>
            )}
            {allData.length > 0 && (
              <ButtonComponent
                clickFunctions={(event) => handleCopyClick(event)}
              >
                {isCopied ? 'Kopierad!' : `Länk: ${compareLink}`}
              </ButtonComponent>
            )}
          </div>
        </div>
      )}
      {allData.length > 0 && (
        <div className="mx-2 flex flex-row justify-between xl:mx-0">
          {compObject.teamArray.length > 2 && (
            <div className="w-full">
              <h2 className="mb-2 text-base font-bold md:text-xl xl:text-2xl">
                Inbördes möten
              </h2>
              <p className="mb-2 w-[90%] text-xs font-bold md:text-sm lg:mb-4 xl:w-[36rem]">
                Möten mellan {teamString} {catString}{' '}
                {compObject.startSeason === compObject.endSeason
                  ? `säsongen ${data.data.seasonNames[0].year}`
                  : `${startSeasonName}-${endSeasonName}.`}
              </p>
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
                  : `${startSeasonName}-${endSeasonName}.`}
              </p>
            </div>
          )}
          <div className="mb-2 flex flex-col-reverse justify-end gap-2 xl:mb-6 xl:h-9 xl:flex-row xl:justify-end">
            {origin === 'gamesList' && (
              <ButtonComponent clickFunctions={() => navigate(-1)}>
                Tillbaka
              </ButtonComponent>
            )}
            {allData.length > 0 && (
              <ButtonComponent
                clickFunctions={(event) =>
                  handleCopyClick(event, compareLink, setIsCopied)
                }
              >
                {isCopied ? 'Kopierad!' : `Länk: ${compareLink}`}
              </ButtonComponent>
            )}
          </div>
        </div>
      )}
      <div className="flex flex-col justify-between xl:flex-row">
        {allData.length > 0 && (
          <div className="mx-2 xl:mx-0">
            {compObject.teamArray.length > 2 && (
              <div className="w-full">
                <div>
                  <h3 className="text-sm font-bold md:text-lg">Sammanlagt</h3>
                  <table className="compareGames mb-6 w-full table-fixed text-[8px] sm:text-sm xl:w-[36rem]">
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
                          <table className="compareGames mb-6 w-full table-fixed text-[8px] sm:text-sm xl:w-[36rem]">
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
                          <table className="compareGames mb-3 w-full table-fixed text-[8px] sm:text-sm xl:w-[36rem]">
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

        <div className="mx-2 xl:mx-0 xl:mr-0">
          <div>
            {allData.length > 0 && (
              <div className="">
                <h2 className="text-sm font-bold md:text-lg xl:text-right">
                  Statistik
                </h2>
                <div className="grid grid-cols-1 flex-row justify-between gap-2 md:flex xl:gap-8">
                  <div className="w-full md:w-80">
                    <div className="w-full">
                      <h3 className="text-sm font-semibold md:text-base">
                        Första matcherna
                      </h3>
                      <div className="compareFirstLast mb-3 w-full text-[8px] sm:text-sm">
                        <div>
                          {firstGames.map((game) => {
                            return (
                              <div key={game.game_id} className="card">
                                <div className="line1">
                                  {game.date && (
                                    <span>
                                      {dayjs(game.date).format('D MMMM YYYY')}:
                                    </span>
                                  )}
                                </div>
                                <div className="line2">
                                  <div>
                                    {game.home_name}-{game.away_name}
                                  </div>
                                  <div className="result">{game.result}</div>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                      <p className="my-2 w-full bg-white p-1 text-[8px] font-bold md:text-xs">
                        {janFirstGames}
                      </p>
                    </div>
                    {latestGames.length > 0 && (
                      <div className="w-full">
                        <h3 className="text-sm font-semibold md:text-base">
                          Senaste matcherna
                        </h3>
                        <div className="compareFirstLast mb-3 w-full text-[8px] sm:text-sm">
                          <div>
                            {latestGames.map((game) => {
                              return (
                                <div key={game.game_id} className="card">
                                  <div className="line1">
                                    {game.date && (
                                      <span>
                                        {dayjs(game.date).format('D MMMM YYYY')}
                                        :
                                      </span>
                                    )}
                                  </div>
                                  <div className="line2">
                                    <div>
                                      {game.home_name}-{game.away_name}
                                    </div>
                                    <div className="result">{game.result}</div>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="w-full md:w-80">
                    <div className="w-full">
                      <h3 className="text-sm font-semibold md:text-base lg:text-right">
                        Säsonger
                      </h3>
                      <table className="compareStats mb-3 w-full text-[8px] sm:text-sm">
                        <thead>
                          <tr key={`head-seasons`}>
                            <th scope="col" className="w-32 text-left"></th>
                            <th scope="col" className="w-8 text-right"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {allSeasons.map((team) => {
                            return (
                              <tr key={team.team} className="rounded">
                                <td>{team.casual_name}</td>
                                <td className="text-right">{team.seasons}</td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                    {!compObject.women && (
                      <div className="w-full">
                        <h3 className="text-sm font-semibold md:text-base lg:text-right">
                          Säsonger sedan 1931
                        </h3>
                        <table className="compareStats mb-3 w-full text-[8px] sm:text-sm">
                          <thead>
                            <tr key={`head-seasons`}>
                              <th scope="col" className="w-32 text-left"></th>
                              <th scope="col" className="w-8 text-right"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {seasons.map((team) => {
                              return (
                                <tr key={team.team} className="rounded">
                                  <td>{team.casual_name}</td>
                                  <td className="text-right">{team.seasons}</td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                    <div>
                      <h3 className="text-sm font-semibold md:text-base lg:text-right">
                        Slutspel
                      </h3>
                      <table className="compareStats mb-3 w-full text-[8px] sm:text-sm">
                        <thead>
                          <tr key={`head-playoffs`}>
                            <th scope="col" className="w-32 text-left"></th>
                            <th scope="col" className="w-8 text-right"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {allPlayoffs.map((team) => {
                            return (
                              <tr key={team.team} className="rounded">
                                <td>{team.casual_name}</td>
                                <td className="text-right">{team.playoffs}</td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                    {!compObject.women && (
                      <div>
                        <h3 className="text-sm font-semibold md:text-base lg:text-right">
                          Slutspel sedan 1931
                        </h3>
                        <table className="compareStats mb-3 w-full text-[8px] sm:text-sm">
                          <thead>
                            <tr key={`head-playoffs`}>
                              <th scope="col" className="w-32 text-left"></th>
                              <th scope="col" className="w-8 text-right"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {playoffs.map((team) => {
                              return (
                                <tr key={team.team} className="rounded">
                                  <td>{team.casual_name}</td>
                                  <td className="text-right">
                                    {team.playoffs}
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                    {golds.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold md:text-base lg:text-right">
                          SM-Guld
                        </h3>
                        <table className="compareStats mb-3 w-full text-[8px] sm:text-sm">
                          <thead>
                            <tr key={`head-golds`}>
                              <th scope="col" className="w-32"></th>
                              <th scope="col" className="w-8"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {golds.map((team) => {
                              return (
                                <tr key={team.team} className="rounded">
                                  <td>{team.casual_name}</td>
                                  <td className="text-right">{team.guld}</td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Compare
