import { useQuery } from 'react-query'
import { getSingleTeam } from '../../requests/teams'
import { useParams } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { TeamPreferenceContext } from '../../contexts/contexts'
import {
  addToFavTeams,
  removeFromFavTeams,
} from '../../reducers/favteamsReducer'
import Spinner from '../utilitycomponents/spinner'
import dayjs from 'dayjs'
import 'dayjs/locale/sv'
import TeamTable from './TeamTable'
import TeamCuriositiesModal from './TeamCuriositiesModal'
import {
  ButtonComponent,
  HiddenButtonComponent,
} from '../utilitycomponents/ButtonComponents'

dayjs.locale('sv')

const Team = () => {
  const teamId = parseInt(useParams().teamId)
  const [showTCModal, setShowTCModal] = useState(false)
  const { favTeams, favTeamsDispatch } = useContext(TeamPreferenceContext)
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  const { data, isLoading, error } = useQuery(['teams', teamId], () =>
    getSingleTeam(teamId),
  )
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
        <div className="hidden xl:contents">
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
      <div className="mx-2 flex flex-row-reverse justify-between xl:mx-0">
        <div className="w-[30rem]">
          <div className="flex flex-col items-center justify-end xl:hidden">
            <HiddenButtonComponent clickFunctions={() => setShowTCModal(true)}>
              Statistik
            </HiddenButtonComponent>
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
          <div className="hidden xl:contents">
            <h2 className="text-right text-2xl font-bold">Kuriosa</h2>
            <p className="mb-3 text-sm">
              {seasons.length === 1 && (
                <span>
                  {teams.team.name} från {teams.team.city} har spelat en säsong
                  i högsta serien, det var {seasons[0].year}.
                </span>
              )}
              {seasons.length > 1 && (
                <span>
                  {teams.team.name} från {teams.team.city} har spelat{' '}
                  {seasons.length} säsonger i högsta serien. Första säsongen var{' '}
                  {seasons[seasons.length - 1].year} och senaste{' '}
                  {seasons[0].year}.{' '}
                </span>
              )}
              {qualificationSeasons.length === 1
                ? `${teams.team.casualName} har kvalat till högsta serien, mot motstånd från den högre serien, vid ett tillfälle.`
                : ''}{' '}
              {qualificationSeasons.length > 1
                ? `${teams.team.casualName} har kvalat till högsta serien, mot motstånd från den högre serien, vid ${qualificationSeasons.length} tillfällen.`
                : ''}
            </p>
            {finals > 0 && golds > 0 && (
              <p className="mb-3 text-sm">
                {teams.team.casualName} har spelat{' '}
                {finals === 1 ? 'en finalmatch' : `${finals} finalmatcher`} och
                vunnit{' '}
                {golds === 1
                  ? `en gång (${winString.slice(2)}).`
                  : `${golds} gånger (${winString.slice(2)}).`}
              </p>
            )}
            {finals > 0 && golds === 0 && (
              <p className="mb-3 text-sm">
                {teams.team.casualName} har spelat{' '}
                {finals === 1 ? 'en finalmatch' : `${finals} finalmatcher`} men
                har aldrig vunnit.
              </p>
            )}
            {playoffCount > 0 && (
              <p className="mb-3 text-sm">
                Laget har kvalificerat sig för slutspel{' '}
                {playoffCount === 1 ? 'en gång.' : `${playoffCount} gånger.`}
              </p>
            )}
            {playoffCount === 0 && (
              <p className="mb-3 text-sm">
                Laget har inte kvalificerat sig för slutspel genom seriespel.
              </p>
            )}
            {playoffStreak.length > 0 && (
              <span>
                {playoffStreak.map((streak, index) => {
                  return (
                    <p
                      className="mb-3 text-sm"
                      key={`${streak.start_year}-${index}`}
                    >
                      {teams.team.casualName} spelade slutspel{' '}
                      {streak.streak_length} år på raken mellan{' '}
                      {streak.start_year} och {streak.end_year}.
                    </p>
                  )
                })}
              </span>
            )}
            {unbeatenStreak.length > 0 && (
              <span>
                <h4 className="text-right text-xl font-bold">Obesegrade</h4>
                {unbeatenStreak.map((streak, index) => {
                  return (
                    <p
                      className="mb-3 text-sm"
                      key={`${streak.start_date}-${index}`}
                    >
                      Mellan {dayjs(streak.start_date).format('D MMMM YYYY')}{' '}
                      och {dayjs(streak.end_date).format('D MMMM YYYY')} spelade
                      laget {streak.game_count} matcher utan att förlora.
                    </p>
                  )
                })}
              </span>
            )}
            {winStreak.length > 0 && (
              <span>
                <h4 className="text-right text-xl font-bold">Vinster i rad</h4>
                {winStreak.map((streak, index) => {
                  return (
                    <p
                      className="mb-3 text-sm"
                      key={`${streak.start_date}-${index}`}
                    >
                      Mellan {dayjs(streak.start_date).format('D MMMM YYYY')}{' '}
                      och {dayjs(streak.end_date).format('D MMMM YYYY')} vann
                      laget {streak.game_count} matcher i rad.
                    </p>
                  )
                })}
              </span>
            )}
            {drawStreak.length > 0 && (
              <span>
                <h4 className="text-right text-xl font-bold">
                  Oavgjorda matcher
                </h4>
                {drawStreak.map((streak, index) => {
                  return (
                    <p
                      className="mb-3 text-sm"
                      key={`${streak.start_date}-${index}`}
                    >
                      Mellan {dayjs(streak.start_date).format('D MMMM YYYY')}{' '}
                      och {dayjs(streak.end_date).format('D MMMM YYYY')} spelade
                      laget oavgjort {streak.game_count} matcher på raken.
                    </p>
                  )
                })}
              </span>
            )}
            {losingStreak.length > 0 && (
              <span>
                <h4 className="text-right text-xl font-bold">Förlustsvit</h4>
                {losingStreak.map((streak, index) => {
                  return (
                    <p
                      className="mb-3 text-sm"
                      key={`${streak.start_date}-${index}`}
                    >
                      Mellan {dayjs(streak.start_date).format('D MMMM YYYY')}{' '}
                      och {dayjs(streak.end_date).format('D MMMM YYYY')} spelade
                      laget {streak.game_count} matcher och förlorade alla.
                    </p>
                  )
                })}
              </span>
            )}
            {noWinStreak.length > 0 && (
              <span>
                <h4 className="text-right text-xl font-bold">
                  Matcher i rad utan vinst
                </h4>
                {noWinStreak.map((streak, index) => {
                  return (
                    <p
                      className="mb-3 text-sm"
                      key={`${streak.start_date}-${index}`}
                    >
                      Mellan {dayjs(streak.start_date).format('D MMMM YYYY')}{' '}
                      och {dayjs(streak.end_date).format('D MMMM YYYY')} spelade
                      laget {streak.game_count} matcher utan att vinna.
                    </p>
                  )
                })}
              </span>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-base font-bold md:text-xl">Tabeller</h2>
          <TeamTable tableArray={teams.tabeller} />
        </div>
      </div>
      {showTCModal ? (
        <>
          <TeamCuriositiesModal
            finals={finals}
            golds={golds}
            winString={winString}
            setShowModal={setShowTCModal}
            winStreak={winStreak}
            noWinStreak={noWinStreak}
            losingStreak={losingStreak}
            unbeatenStreak={unbeatenStreak}
            drawStreak={drawStreak}
            playoffStreak={playoffStreak}
            playoffCount={playoffCount}
            teams={teams}
            seasons={seasons}
            qualificationSeasons={qualificationSeasons}
          />
        </>
      ) : null}
    </div>
  )
}

export default Team
