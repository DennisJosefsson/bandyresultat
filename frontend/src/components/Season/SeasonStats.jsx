import { useContext } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { GenderContext } from '../../contexts/contexts'
import { getSeasonStats } from '../../requests/games'
import { sortStatsCat } from '../utilitycomponents/sortFunction'
import { groupConstant } from '../utilitycomponents/constants'
import Spinner from '../utilitycomponents/spinner'

import dayjs from 'dayjs'
import 'dayjs/locale/sv'

dayjs.locale('sv')

const SeasonStats = ({ seasonId }) => {
  const { data, isLoading, error } = useQuery(
    ['singleSeasonStats', seasonId],
    () => getSeasonStats(seasonId),
  )

  const { women } = useContext(GenderContext)

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

  if (data?.success === 'false') {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
        {data.message}
      </div>
    )
  }

  if (women && seasonId < 1973) {
    return (
      <div className="mx-auto mt-4 grid place-items-center font-inter text-[#011d29]">
        <p>
          Första säsongen för damernas högsta serie var{' '}
          <Link to="/season/1973" className="font-bold">
            1972/73
          </Link>
          .
        </p>
      </div>
    )
  }

  const unbeatenStreak = data.unbeatenStreak.filter(
    (table) => table.women === women,
  )
  const winStreak = data.winStreak.filter((table) => table.women === women)
  const drawStreak = data.drawStreak.filter((table) => table.women === women)
  const noWinStreak = data.noWinStreak.filter((table) => table.women === women)
  const losingStreak = data.losingStreak.filter(
    (table) => table.women === women,
  )

  const gamesCountTotal = data.gamesCountTotal.find(
    (cat) => cat.women === women,
  )
  const gamesCountTotalCat = data.gamesCountTotalCat.filter(
    (cat) => cat.women === women,
  )

  const winCountHomeTeam = data.winCountHomeTeam.find(
    (cat) => cat.women === women,
  )
  const winCountAwayTeam = data.winCountAwayTeam.find(
    (cat) => cat.women === women,
  )
  const drawCount = data.drawCount.find((cat) => cat.women === women)

  const winCountHomeTeamCat = data.winCountHomeTeamCat
    .filter((cat) => cat.women === women)
    .filter((cat) => cat.category !== 'final')
  const winCountAwayTeamCat = data.winCountAwayTeamCat
    .filter((cat) => cat.women === women)
    .filter((cat) => cat.category !== 'final')
  const drawCountCat = data.drawCountCat
    .filter((cat) => cat.women === women)
    .filter((cat) => cat.category !== 'final')

  const goalsScoredTotal = data.goalsScoredTotal.find(
    (cat) => cat.women === women,
  )
  const goalsScoredTotalCat = data.goalsScoredTotalCat.filter(
    (cat) => cat.women === women,
  )

  const goalsScoredAverage = data.goalsScoredAverage.find(
    (cat) => cat.women === women,
  )
  const goalsScoredAverageCat = data.goalsScoredAverageCat.filter(
    (cat) => cat.women === women,
  )

  const goalsScoredHomeTotal = data.goalsScoredHomeTotal.find(
    (cat) => cat.women === women,
  )
  const goalsScoredAwayTotal = data.goalsScoredAwayTotal.find(
    (cat) => cat.women === women,
  )
  const goalsScoredHomeTotalCat = data.goalsScoredHomeTotalCat.filter(
    (cat) => cat.women === women,
  )

  const goalsScoredAwayTotalCat = data.goalsScoredAwayTotalCat.filter(
    (cat) => cat.women === women,
  )

  const goalsScoredHomeAverage = data.goalsScoredHomeAverage.find(
    (cat) => cat.women === women,
  )
  const goalsScoredAwayAverage = data.goalsScoredAwayAverage.find(
    (cat) => cat.women === women,
  )
  const goalsScoredHomeAverageCat = data.goalsScoredHomeAverageCat.filter(
    (cat) => cat.women === women,
  )

  const goalsScoredAwayAverageCat = data.goalsScoredAwayAverageCat.filter(
    (cat) => cat.women === women,
  )

  const maxGoalsMen = data.maxGoalsMen
  const minGoalsMen = data.minGoalsMen
  const maxDiffMen = data.maxDiffMen
  const maxGoalsWomen = data.maxGoalsWomen
  const minGoalsWomen = data.minGoalsWomen
  const maxDiffWomen = data.maxDiffWomen

  const streakDataLength =
    winStreak.length +
    unbeatenStreak.length +
    drawStreak.length +
    noWinStreak.length +
    losingStreak.length

  const statsLength =
    maxGoalsMen.length +
    minGoalsMen.length +
    maxDiffMen.length +
    maxGoalsWomen.length +
    minGoalsWomen.length +
    maxDiffWomen.length

  return (
    <div>
      <div>
        <h4 className="font-bold md:text-lg">Match- och resultatstatistik</h4>
        <div className="grid grid-cols-1 gap-y-4 pt-2 md:grid-cols-2 md:gap-x-20 lg:grid-cols-3 xl:gap-x-44">
          <div>
            <div className="statsCard">
              <div className="name">Antal matcher: </div>
              <div className="count">{gamesCountTotal.count}</div>
            </div>

            {sortStatsCat(gamesCountTotalCat).map((cat) => {
              return (
                <div
                  key={`${cat.category}-${Math.random()}`}
                  className="statsCard"
                >
                  <div className="name">{groupConstant[cat.category]}</div>
                  <div className="count">{cat.count}</div>
                </div>
              )
            })}
          </div>
          <div>
            <div className="statsCard">
              <div className="name">Vinster hemmalag: </div>
              <div className="count">{winCountHomeTeam.count}</div>
            </div>
            <div className="statsCard">
              <div className="name">Vinster bortalag: </div>
              <div className="count">{winCountAwayTeam.count}</div>
            </div>
            <div className="statsCard">
              <div className="name">Oavgjort: </div>
              <div className="count">{drawCount.count / 2}</div>
            </div>
          </div>
          <div>
            <div className="statsCard">
              <div className="name">Vinster hemmalag: </div>
              <div className="count">
                {`${(
                  (winCountHomeTeam.count / gamesCountTotal.count) *
                  100
                ).toFixed(1)}%`}
              </div>
            </div>
            <div className="statsCard">
              <div className="name">Vinster bortalag: </div>
              <div className="count">
                {`${(
                  (winCountAwayTeam.count / gamesCountTotal.count) *
                  100
                ).toFixed(1)}%`}
              </div>
            </div>
            <div className="statsCard">
              <div className="name">Oavgjort: </div>
              <div className="count">
                {`${(
                  (drawCount.count / 2 / gamesCountTotal.count) *
                  100
                ).toFixed(1)}%`}
              </div>
            </div>
          </div>
        </div>
        {winCountHomeTeamCat.length > 1 && (
          <div>
            <h4 className="font-bold md:text-lg">Resultatstatistik kategori</h4>
            <div className="grid grid-cols-1 gap-y-4 pt-2 md:grid-cols-2 md:gap-x-20 lg:grid-cols-3 xl:gap-x-44">
              <div>
                <h5 className="text-sm font-bold md:text-base">
                  Vinst hemmalag
                </h5>
                {sortStatsCat(winCountHomeTeamCat).map((cat) => {
                  return (
                    <div
                      key={`${cat.category}-${Math.random()}`}
                      className="statsCard"
                    >
                      <div className="name">{groupConstant[cat.category]}</div>
                      <div className="count">{cat.count}</div>
                    </div>
                  )
                })}
              </div>
              <div>
                <h5 className="text-sm font-bold md:text-base">
                  Vinst bortalag
                </h5>
                {sortStatsCat(winCountAwayTeamCat).map((cat) => {
                  return (
                    <div
                      key={`${cat.category}-${Math.random()}`}
                      className="statsCard"
                    >
                      <div className="name">{groupConstant[cat.category]}</div>
                      <div className="count">{cat.count}</div>
                    </div>
                  )
                })}
              </div>
              <div>
                <h5 className="text-sm font-bold md:text-base">Oavgjort</h5>
                {sortStatsCat(drawCountCat).map((cat) => {
                  return (
                    <div
                      key={`${cat.category}-${Math.random()}`}
                      className="statsCard"
                    >
                      <div className="name">{groupConstant[cat.category]}</div>
                      <div className="count">{cat.count / 2}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
        {winCountHomeTeamCat.length > 1 && (
          <div>
            <h4 className="font-bold md:text-lg">
              Resultatstatistik kategori genomsnitt
            </h4>
            <div className="grid grid-cols-1 gap-y-4 pt-2 md:grid-cols-2 md:gap-x-20 lg:grid-cols-3 xl:gap-x-44">
              <div>
                <h5 className="text-sm font-bold md:text-base">
                  Vinst hemmalag
                </h5>
                {sortStatsCat(winCountHomeTeamCat).map((cat) => {
                  return (
                    <div
                      key={`${cat.category}-${Math.random()}`}
                      className="statsCard"
                    >
                      <div className="name">{groupConstant[cat.category]}</div>
                      <div className="count">{`${(
                        (cat.count /
                          gamesCountTotalCat.find(
                            (category) => category.category === cat.category,
                          ).count) *
                        100
                      ).toFixed(1)}%`}</div>
                    </div>
                  )
                })}
              </div>
              <div>
                <h5 className="text-sm font-bold md:text-base">
                  Vinst bortalag
                </h5>
                {sortStatsCat(winCountAwayTeamCat).map((cat) => {
                  return (
                    <div
                      key={`${cat.category}-${Math.random()}`}
                      className="statsCard"
                    >
                      <div className="name">{groupConstant[cat.category]}</div>
                      <div className="count">{`${(
                        (cat.count /
                          gamesCountTotalCat.find(
                            (category) => category.category === cat.category,
                          ).count) *
                        100
                      ).toFixed(1)}%`}</div>
                    </div>
                  )
                })}
              </div>
              <div>
                <h5 className="text-sm font-bold md:text-base">Oavgjort</h5>
                {sortStatsCat(drawCountCat).map((cat) => {
                  return (
                    <div
                      key={`${cat.category}-${Math.random()}`}
                      className="statsCard"
                    >
                      <div className="name">{groupConstant[cat.category]}</div>
                      <div className="count">{`${(
                        (cat.count /
                          2 /
                          gamesCountTotalCat.find(
                            (category) => category.category === cat.category,
                          ).count) *
                        100
                      ).toFixed(1)}%`}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
      <h4 className="font-bold md:text-lg">Målstatistik</h4>
      <div className="grid grid-cols-1 gap-y-4 pt-2 md:grid-cols-2 md:gap-x-20 lg:grid-cols-3 xl:gap-x-44">
        <div>
          <div className="statsCard">
            <div className="name">Antal mål: </div>
            <div className="count">{parseInt(goalsScoredTotal.data) / 2}</div>
          </div>

          {sortStatsCat(goalsScoredTotalCat).map((cat) => {
            return (
              <div
                key={`${cat.category}-${Math.random()}`}
                className="statsCard"
              >
                <div className="name">{groupConstant[cat.category]}</div>
                <div className="count">{parseInt(cat.data) / 2}</div>
              </div>
            )
          })}
        </div>
        <div>
          <div className="statsCard">
            <div className="name">Antal mål hemmalag: </div>
            <div className="count">{goalsScoredHomeTotal.data}</div>
          </div>

          {sortStatsCat(goalsScoredHomeTotalCat).map((cat) => {
            return (
              <div
                key={`${cat.category}-${Math.random()}`}
                className="statsCard"
              >
                <div className="name">{groupConstant[cat.category]}</div>
                <div className="count">{cat.data}</div>
              </div>
            )
          })}
        </div>
        <div>
          <div className="statsCard">
            <div className="name">Antal mål bortalag: </div>
            <div className="count">{goalsScoredAwayTotal.data}</div>
          </div>

          {sortStatsCat(goalsScoredAwayTotalCat).map((cat) => {
            return (
              <div
                key={`${cat.category}-${Math.random()}`}
                className="statsCard"
              >
                <div className="name">{groupConstant[cat.category]}</div>
                <div className="count">{cat.data}</div>
              </div>
            )
          })}
        </div>
        <div>
          <div className="statsCard">
            <div className="name">Genomsnitt mål: </div>
            <div className="count">{goalsScoredAverage.data}</div>
          </div>

          {sortStatsCat(goalsScoredAverageCat).map((cat) => {
            return (
              <div
                key={`${cat.category}-${Math.random()}`}
                className="statsCard"
              >
                <div className="name">{groupConstant[cat.category]}</div>
                <div className="count">{cat.data}</div>
              </div>
            )
          })}
        </div>
        <div>
          <div className="statsCard">
            <div className="name">Genomsnitt mål hemmalag: </div>
            <div className="count">{goalsScoredHomeAverage.data}</div>
          </div>

          {sortStatsCat(goalsScoredHomeAverageCat).map((cat) => {
            return (
              <div
                key={`${cat.category}-${Math.random()}`}
                className="statsCard"
              >
                <div className="name">{groupConstant[cat.category]}</div>
                <div className="count">{cat.data}</div>
              </div>
            )
          })}
        </div>
        <div>
          <div className="statsCard">
            <div className="name">Genomsnitt mål bortalag: </div>
            <div className="count">{goalsScoredAwayAverage.data}</div>
          </div>

          {sortStatsCat(goalsScoredAwayAverageCat).map((cat) => {
            return (
              <div
                key={`${cat.category}-${Math.random()}`}
                className="statsCard"
              >
                <div className="name">{groupConstant[cat.category]}</div>
                <div className="count">{cat.data}</div>
              </div>
            )
          })}
        </div>
      </div>
      <h4 className="font-bold md:text-lg">Resultat</h4>
      <div className="grid grid-cols-1 gap-y-4 pt-2 md:grid-cols-2 md:gap-x-20 lg:grid-cols-3 xl:gap-x-44">
        {(streakDataLength > 0 || statsLength > 0) && (
          <div>
            <div className="streakCard">
              <div className="head">Match(er) med flest antal mål:</div>
              {!women && (
                <div>
                  {maxGoalsMen.map((game) => {
                    return (
                      <>
                        <div
                          key={`${game.casual_name}-${game.game_count}-${
                            game.start_date
                          }-${Math.random()}`}
                          className="streak1st"
                        >
                          <div className="name">
                            {game.home_name}-{game.away_name}
                          </div>
                          <div className="count">{game.resultat}</div>
                        </div>
                        <div className="streak2nd">
                          <div className="dates">
                            {dayjs(game.datum).format('D MMMM YYYY')}
                          </div>
                        </div>
                      </>
                    )
                  })}
                </div>
              )}
              {women && (
                <div>
                  {maxGoalsWomen.map((game) => {
                    return (
                      <>
                        <div
                          key={`${game.casual_name}-${game.game_count}-${
                            game.start_date
                          }-${Math.random()}`}
                          className="streak1st"
                        >
                          <div className="name">
                            {game.home_name}-{game.away_name}
                          </div>
                          <div className="count">{game.resultat}</div>
                        </div>
                        <div className="streak2nd">
                          <div className="dates">
                            {dayjs(game.datum).format('D MMMM YYYY')}
                          </div>
                        </div>
                      </>
                    )
                  })}
                </div>
              )}
            </div>
            <div className="streakCard">
              <h6 className="head">Match(er) med minst antal mål:</h6>
              {!women && (
                <div>
                  {minGoalsMen.map((game) => {
                    return (
                      <>
                        <div
                          key={`${game.casual_name}-${game.game_count}-${
                            game.start_date
                          }-${Math.random()}`}
                          className="streak1st"
                        >
                          <div className="name">
                            {game.home_name}-{game.away_name}
                          </div>
                          <div className="count">{game.resultat}</div>
                        </div>
                        <div className="streak2nd">
                          <div className="dates">
                            {dayjs(game.datum).format('D MMMM YYYY')}
                          </div>
                        </div>
                      </>
                    )
                  })}
                </div>
              )}
              {women && (
                <div>
                  {minGoalsWomen.map((game) => {
                    return (
                      <>
                        <div
                          key={`${game.casual_name}-${game.game_count}-${
                            game.start_date
                          }-${Math.random()}`}
                          className="streak1st"
                        >
                          <div className="name">
                            {game.home_name}-{game.away_name}
                          </div>
                          <div className="count">{game.resultat}</div>
                        </div>
                        <div className="streak2nd">
                          <div className="dates">
                            {dayjs(game.datum).format('D MMMM YYYY')}
                          </div>
                        </div>
                      </>
                    )
                  })}
                </div>
              )}
            </div>
            <div className="streakCard">
              <h6 className="head">Match(er) med störst målskillnad:</h6>
              {!women && (
                <div>
                  {maxDiffMen.map((game) => {
                    return (
                      <>
                        <div
                          key={`${game.casual_name}-${game.game_count}-${
                            game.start_date
                          }-${Math.random()}`}
                          className="streak1st"
                        >
                          <div className="name">
                            {game.home_name}-{game.away_name}
                          </div>
                          <div className="count">{game.resultat}</div>
                        </div>
                        <div className="streak2nd">
                          <div className="dates">
                            {dayjs(game.datum).format('D MMMM YYYY')}
                          </div>
                        </div>
                      </>
                    )
                  })}
                </div>
              )}
              {women && (
                <div>
                  {maxDiffWomen.map((game) => {
                    return (
                      <>
                        <div
                          key={`${game.casual_name}-${game.game_count}-${
                            game.start_date
                          }-${Math.random()}`}
                          className="streak1st"
                        >
                          <div className="name">
                            {game.home_name}-{game.away_name}
                          </div>
                          <div className="count">{game.resultat}</div>
                        </div>
                        <div className="streak2nd">
                          <div className="dates">
                            {dayjs(game.datum).format('D MMMM YYYY')}
                          </div>
                        </div>
                      </>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        )}
        {streakDataLength > 0 && (
          <div>
            {unbeatenStreak.length > 0 && (
              <div className="streakCard">
                <h6 className="head">Matcher i rad utan förlust:</h6>

                {unbeatenStreak?.map((team) => {
                  return (
                    <>
                      <div
                        key={`${team.casual_name}-${team.game_count}-${
                          team.start_date
                        }-${Math.random()}`}
                        className="streak1st"
                      >
                        <div className="name">{team.casual_name}</div>
                        <div className="count">{team.game_count}</div>
                      </div>
                      <div className="streak2nd">
                        <div className="dates">
                          {dayjs(team.start_date).format('D MMMM YYYY')} -
                          {dayjs(team.end_date).format('D MMMM YYYY')}
                        </div>
                      </div>
                    </>
                  )
                })}
              </div>
            )}

            {winStreak.length > 0 && (
              <div className="streakCard">
                <h6 className="head">Matcher i rad med vinst:</h6>

                {winStreak?.map((team) => {
                  return (
                    <>
                      <div
                        key={`${team.casual_name}-${team.game_count}-${
                          team.start_date
                        }-${Math.random()}`}
                        className="streak1st"
                      >
                        <div className="name">{team.casual_name}</div>
                        <div className="count">{team.game_count}</div>
                      </div>
                      <div className="streak2nd">
                        <div className="dates">
                          {dayjs(team.start_date).format('D MMMM YYYY')} -
                          {dayjs(team.end_date).format('D MMMM YYYY')}
                        </div>
                      </div>
                    </>
                  )
                })}
              </div>
            )}

            {drawStreak.length > 0 && (
              <div className="streakCard">
                <h6 className="head">Matcher i rad med oavgjort:</h6>

                {drawStreak?.map((team) => {
                  return (
                    <>
                      <div
                        key={`${team.casual_name}-${team.game_count}-${
                          team.start_date
                        }-${Math.random()}`}
                        className="streak1st"
                      >
                        <div className="name">{team.casual_name}</div>
                        <div className="count">{team.game_count}</div>
                      </div>
                      <div className="streak2nd">
                        <div className="dates">
                          {dayjs(team.start_date).format('D MMMM YYYY')} -
                          {dayjs(team.end_date).format('D MMMM YYYY')}
                        </div>
                      </div>
                    </>
                  )
                })}
              </div>
            )}

            {noWinStreak.length > 0 && (
              <div className="streakCard">
                <div className="head">Matcher i rad utan vinst:</div>

                {noWinStreak?.map((team) => {
                  return (
                    <>
                      <div
                        key={`${team.casual_name}-${team.game_count}-${
                          team.start_date
                        }-${Math.random()}`}
                        className="streak1st"
                      >
                        <div className="name">{team.casual_name}</div>
                        <div className="count">{team.game_count}</div>
                      </div>
                      <div className="streak2nd">
                        <div className="dates">
                          {dayjs(team.start_date).format('D MMMM YYYY')} -
                          {dayjs(team.end_date).format('D MMMM YYYY')}
                        </div>
                      </div>
                    </>
                  )
                })}
              </div>
            )}

            {losingStreak.length > 0 && (
              <div className="streakCard">
                <div className="head">Matcher i rad med förlust:</div>

                {losingStreak?.map((team) => {
                  return (
                    <>
                      <div
                        key={`${team.casual_name}-${team.game_count}-${
                          team.start_date
                        }-${Math.random()}`}
                        className="streak1st"
                      >
                        <div className="name">{team.casual_name}</div>
                        <div className="count">{team.game_count}</div>
                      </div>
                      <div className="streak2nd">
                        <div className="dates">
                          {dayjs(team.start_date).format('D MMMM YYYY')} -
                          {dayjs(team.end_date).format('D MMMM YYYY')}
                        </div>
                      </div>
                    </>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default SeasonStats
