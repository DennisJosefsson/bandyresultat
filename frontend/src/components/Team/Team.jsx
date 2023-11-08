import { useQuery } from 'react-query'
import { getSingleTeam } from '../../requests/teams'
import { useEffect, useContext } from 'react'
import { TeamPreferenceContext } from '../../contexts/contexts'
import {
  addToFavTeams,
  removeFromFavTeams,
} from '../../reducers/favteamsReducer'
import Spinner from '../utilitycomponents/Components/spinner'
import TeamTable from './Subcomponents/TeamTable'

import { ButtonComponent } from '../utilitycomponents/Components/ButtonComponents'
import dayjs from 'dayjs'
import 'dayjs/locale/sv'

dayjs.locale('sv')

const Team = ({ teamId }) => {
  const { favTeams, favTeamsDispatch } = useContext(TeamPreferenceContext)
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  const { data, isLoading, error } = useQuery(['teams', teamId], () =>
    getSingleTeam(teamId),
  )

  useEffect(() => {
    if (data?.team) document.title = `Bandyresultat - ${data?.team.name}`

    return () => (document.title = 'Bandyresultat')
  }, [data])

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

  if (!teamId.toString().match('^[0-9]{1,3}$')) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
        Kolla länken, angivet lag-id är felaktigt.
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

  const teams = data

  const seasons = teams.team.seasonteam.filter(
    (season) =>
      season.teamseason.qualification === false ||
      season.teamseason.qualification === null,
  )

  const qualificationSeasons = teams.team.seasonteam.filter(
    (season) => season.teamseason.qualification === true,
  )

  const finals = teams.finalsAndWins.length
  const golds = teams.finalsAndWins.filter((table) => table.win === true).length
  let winString = ''
  winString += teams.finalsAndWins
    .filter((table) => table.win === true)
    .reduce((str, winYear) => `${str}, ${winYear.date.slice(0, 4)}`, '')

  const noWinStreak = teams.noWinStreak.filter(
    (streak) => streak.game_count > 5,
  )
  const unbeatenStreak = teams.unbeatenStreak.filter(
    (streak) => streak.game_count > 5,
  )
  const winStreak = teams.winStreak.filter((streak) => streak.game_count > 5)
  const drawStreak = teams.drawStreak.filter((streak) => streak.game_count > 2)
  const losingStreak = teams.losingStreak.filter(
    (streak) => streak.game_count > 5,
  )

  const playoffStreak = teams.playoffStreak
  const playoffCount = Number(teams.playoffCount[0].playoff_count)

  return (
    <div className="mx-auto mt-2 flex min-h-screen max-w-7xl flex-col font-inter text-[#011d29]">
      <div className="flex flex-row">
        <div className="flex-1">
          <h1 className="mb-4 text-center text-base font-bold md:text-2xl">
            {teams.team.name}
          </h1>
        </div>
        <div>
          {favTeams.includes(teamId) && (
            <ButtonComponent
              clickFunctions={() =>
                favTeamsDispatch(removeFromFavTeams(teamId))
              }
            >
              Ta bort favorit
            </ButtonComponent>
          )}
          {!favTeams.includes(teamId) && (
            <div>
              <ButtonComponent
                clickFunctions={() => favTeamsDispatch(addToFavTeams(teamId))}
              >
                Favoritlag
              </ButtonComponent>
            </div>
          )}
        </div>
      </div>
      <div className="mx-2 flex flex-col-reverse justify-between lg:flex-row-reverse xl:mx-0">
        <div className="max-w-[30rem]">
          <div>
            <h2 className="text-sm font-bold xs:text-base md:text-xl lg:text-right">
              Kuriosa
            </h2>
            <div className="teamCurCard">
              {seasons.length === 1 && (
                <div className="cur">
                  {teams.team.name} från {teams.team.city} har spelat en säsong
                  i högsta serien, det var {seasons[0].year}.
                </div>
              )}
              {seasons.length > 1 && (
                <div className="cur">
                  {teams.team.name} från {teams.team.city} har spelat{' '}
                  {seasons.length} säsonger i högsta serien. Första säsongen var{' '}
                  {seasons[seasons.length - 1].year} och senaste{' '}
                  {seasons[0].year}.{' '}
                </div>
              )}
              <div className="cur">
                {qualificationSeasons.length === 1
                  ? `${teams.team.casualName} har kvalat till högsta serien, mot motstånd från den högre serien, vid ett tillfälle.`
                  : ''}
              </div>
              <div className="cur">
                {qualificationSeasons.length > 1
                  ? `${teams.team.casualName} har kvalat till högsta serien, mot motstånd från den högre serien, vid ${qualificationSeasons.length} tillfällen.`
                  : ''}
              </div>

              {finals > 0 && golds > 0 && (
                <div className="cur">
                  {teams.team.casualName} har spelat{' '}
                  {finals === 1 ? 'en finalmatch' : `${finals} finalmatcher`}{' '}
                  och vunnit{' '}
                  {golds === 1
                    ? `en gång (${winString.slice(2)}).`
                    : `${golds} gånger (${winString.slice(2)}).`}
                </div>
              )}
              {finals > 0 && golds === 0 && (
                <div className="cur">
                  {teams.team.casualName} har spelat{' '}
                  {finals === 1 ? 'en finalmatch' : `${finals} finalmatcher`}{' '}
                  men har aldrig vunnit.
                </div>
              )}
              {playoffCount > 0 && (
                <div className="cur">
                  Laget har kvalificerat sig för slutspel{' '}
                  {playoffCount === 1 ? 'en gång.' : `${playoffCount} gånger.`}
                </div>
              )}
              {playoffCount === 0 && (
                <div className="cur">
                  Laget har inte kvalificerat sig för slutspel genom seriespel.
                </div>
              )}

              {playoffStreak.length > 0 && (
                <div className="cur">
                  {playoffStreak.map((streak, index) => {
                    return (
                      <div key={`${streak.start_year}-${index}`}>
                        {teams.team.casualName} spelade slutspel{' '}
                        {streak.streak_length} år på raken mellan{' '}
                        {streak.start_year} och {streak.end_year}.
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
            {unbeatenStreak.length > 0 && (
              <div>
                <h4 className="text-sm font-bold xs:text-base md:text-xl lg:text-right">
                  Obesegrade
                </h4>
                <div className="teamCurCard">
                  {unbeatenStreak.map((streak, index) => {
                    return (
                      <div
                        key={`${streak.start_date}-${index}`}
                        className="curCard1st"
                      >
                        <div className="dates">
                          {dayjs(streak.start_date).format('D MMMM YYYY')} -
                          {dayjs(streak.end_date).format('D MMMM YYYY')}
                        </div>
                        <div className="count">{streak.game_count} matcher</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
            {winStreak.length > 0 && (
              <div>
                <h4 className="text-sm font-bold xs:text-base md:text-xl lg:text-right">
                  Vinster i rad
                </h4>
                <div className="teamCurCard">
                  {winStreak.map((streak, index) => {
                    return (
                      <div
                        key={`${streak.start_date}-${index}`}
                        className="curCard1st"
                      >
                        <div className="dates">
                          {dayjs(streak.start_date).format('D MMMM YYYY')} -
                          {dayjs(streak.end_date).format('D MMMM YYYY')}
                        </div>
                        <div className="count">{streak.game_count} matcher</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
            {drawStreak.length > 0 && (
              <div>
                <h4 className="text-sm font-bold xs:text-base md:text-xl lg:text-right">
                  Oavgjorda matcher
                </h4>
                <div className="teamCurCard">
                  {drawStreak.map((streak, index) => {
                    return (
                      <div
                        key={`${streak.start_date}-${index}`}
                        className="curCard1st"
                      >
                        <div className="dates">
                          {dayjs(streak.start_date).format('D MMMM YYYY')} -
                          {dayjs(streak.end_date).format('D MMMM YYYY')}
                        </div>
                        <div className="count">{streak.game_count} matcher</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
            {losingStreak.length > 0 && (
              <div>
                <h4 className="text-sm font-bold xs:text-base md:text-xl lg:text-right">
                  Förlustsvit
                </h4>
                <div className="teamCurCard">
                  {losingStreak.map((streak, index) => {
                    return (
                      <div
                        key={`${streak.start_date}-${index}`}
                        className="curCard1st"
                      >
                        <div className="dates">
                          {dayjs(streak.start_date).format('D MMMM YYYY')} -
                          {dayjs(streak.end_date).format('D MMMM YYYY')}
                        </div>
                        <div className="count">{streak.game_count} matcher</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
            {noWinStreak.length > 0 && (
              <div>
                <h4 className="text-sm font-bold xs:text-base md:text-xl lg:text-right">
                  Matcher i rad utan vinst
                </h4>
                <div className="teamCurCard">
                  {noWinStreak.map((streak, index) => {
                    return (
                      <div
                        key={`${streak.start_date}-${index}`}
                        className="curCard1st"
                      >
                        <div className="dates">
                          {dayjs(streak.start_date).format('D MMMM YYYY')} -
                          {dayjs(streak.end_date).format('D MMMM YYYY')}
                        </div>
                        <div className="count">{streak.game_count} matcher</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
        <div>
          <h2 className="ml-0 text-base font-bold md:text-xl">Tabeller</h2>
          <TeamTable tableArray={teams.tabeller} />
        </div>
      </div>
    </div>
  )
}

export default Team
