import { useQuery } from 'react-query'
import { getSingleTeam } from '../../requests/teams'
import { useParams } from 'react-router-dom'
import Spinner from '../utilitycomponents/spinner'
import dayjs from 'dayjs'
import 'dayjs/locale/sv'
import TeamTable from './TeamTable'

dayjs.locale('sv')

const Team = () => {
  const teamId = parseInt(useParams().teamId)

  const { data, isLoading, error } = useQuery(['teams', teamId], () =>
    getSingleTeam(teamId)
  )
  if (isLoading) {
    return (
      <div className="max-w-7xl min-h-screen mx-auto font-inter text-[#011d29]">
        <Spinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl min-h-screen mx-auto font-inter text-[#011d29]">
        There was an error
      </div>
    )
  }

  const teams = data

  const seasons = teams.team.seasonteam.filter(
    (season) =>
      season.teamseason.qualification === false ||
      season.teamseason.qualification === null
  )

  const qualificationSeasons = teams.team.seasonteam.filter(
    (season) => season.teamseason.qualification === true
  )

  const finals = teams.finalsAndWins.length
  const golds = teams.finalsAndWins.filter((table) => table.win === true).length
  let winString = ''
  winString += teams.finalsAndWins
    .filter((table) => table.win === true)
    .reduce((str, winYear) => `${str}, ${winYear.date.slice(0, 4)}`, '')

  const noWinStreak = teams.noWinStreak.filter(
    (streak) => streak.game_count > 5
  )
  const unbeatenStreak = teams.unbeatenStreak.filter(
    (streak) => streak.game_count > 5
  )
  const winStreak = teams.winStreak.filter((streak) => streak.game_count > 5)
  const drawStreak = teams.drawStreak.filter((streak) => streak.game_count > 2)
  const losingStreak = teams.losingStreak.filter(
    (streak) => streak.game_count > 5
  )

  const playoffStreak = teams.playoffStreak
  const playoffCount = Number(teams.playoffCount[0].playoff_count)

  return (
    <div className="max-w-7xl min-h-screen mx-auto font-inter text-[#011d29] flex flex-col">
      <div>
        <h1 className="text-center text-2xl font-bold mb-4">
          {teams.team.name}
        </h1>
      </div>
      <div className="flex flex-row-reverse justify-between">
        <div className="w-[30rem]">
          <h2 className="font-bold text-2xl text-right">Kuriosa</h2>
          <p className="text-sm mb-3">
            {seasons.length === 1 && (
              <span>
                {teams.team.name} från {teams.team.city} har spelat en säsong i
                högsta serien, det var {seasons[0].year}.
              </span>
            )}
            {seasons.length > 1 && (
              <span>
                {teams.team.name} från {teams.team.city} har spelat{' '}
                {seasons.length} säsonger i högsta serien. Första säsongen var{' '}
                {seasons[seasons.length - 1].year} och senaste {seasons[0].year}
                .{' '}
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
            <p className="text-sm mb-3">
              {teams.team.casualName} har spelat {finals} finalmatcher och
              vunnit{' '}
              {golds === 1
                ? `1 gång (${winString.slice(2)}).`
                : `${golds} gånger (${winString.slice(2)}).`}
            </p>
          )}
          {finals > 0 && golds === 0 && (
            <p className="text-sm mb-3">
              {teams.team.casualName} har spelat{' '}
              {finals === 1 ? 'en finalmatch' : `${finals} finalmatcher`} men
              har aldrig vunnit.
            </p>
          )}
          {playoffCount > 0 && (
            <p className="text-sm mb-3">
              Laget har kvalificerat sig för slutspel{' '}
              {playoffCount === 1 ? 'en gång.' : `${playoffCount} gånger.`}
            </p>
          )}
          {playoffCount === 0 && (
            <p className="text-sm mb-3">
              Laget har inte kvalificerat sig för slutspel genom seriespel.
            </p>
          )}
          {playoffStreak.length > 0 && (
            <span>
              {playoffStreak.map((streak, index) => {
                return (
                  <p
                    className="text-sm mb-3"
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
              <h4 className="font-bold text-xl text-right">Obesegrade</h4>
              {unbeatenStreak.map((streak, index) => {
                return (
                  <p
                    className="text-sm mb-3"
                    key={`${streak.start_date}-${index}`}
                  >
                    Mellan {dayjs(streak.start_date).format('D MMMM YYYY')} och{' '}
                    {dayjs(streak.end_date).format('D MMMM YYYY')} spelade laget{' '}
                    {streak.game_count} matcher utan att förlora.
                  </p>
                )
              })}
            </span>
          )}
          {winStreak.length > 0 && (
            <span>
              <h4 className="font-bold text-xl text-right">Vinster i rad</h4>
              {winStreak.map((streak, index) => {
                return (
                  <p
                    className="text-sm mb-3"
                    key={`${streak.start_date}-${index}`}
                  >
                    Mellan {dayjs(streak.start_date).format('D MMMM YYYY')} och{' '}
                    {dayjs(streak.end_date).format('D MMMM YYYY')} vann laget{' '}
                    {streak.game_count} matcher i rad.
                  </p>
                )
              })}
            </span>
          )}
          {drawStreak.length > 0 && (
            <span>
              <h4 className="font-bold text-xl text-right">
                Oavgjorda matcher
              </h4>
              {drawStreak.map((streak, index) => {
                return (
                  <p
                    className="text-sm mb-3"
                    key={`${streak.start_date}-${index}`}
                  >
                    Mellan {dayjs(streak.start_date).format('D MMMM YYYY')} och{' '}
                    {dayjs(streak.end_date).format('D MMMM YYYY')} spelade laget
                    oavgjort {streak.game_count} matcher på raken.
                  </p>
                )
              })}
            </span>
          )}
          {losingStreak.length > 0 && (
            <span>
              <h4 className="font-bold text-xl text-right">Förlustsvit</h4>
              {losingStreak.map((streak, index) => {
                return (
                  <p
                    className="text-sm mb-3"
                    key={`${streak.start_date}-${index}`}
                  >
                    Mellan {dayjs(streak.start_date).format('D MMMM YYYY')} och{' '}
                    {dayjs(streak.end_date).format('D MMMM YYYY')} spelade laget{' '}
                    {streak.game_count} matcher och förlorade alla.
                  </p>
                )
              })}
            </span>
          )}
          {noWinStreak.length > 0 && (
            <span>
              <h4 className="font-bold text-xl text-right">
                Matcher i rad utan vinst
              </h4>
              {noWinStreak.map((streak, index) => {
                return (
                  <p
                    className="text-sm mb-3"
                    key={`${streak.start_date}-${index}`}
                  >
                    Mellan {dayjs(streak.start_date).format('D MMMM YYYY')} och{' '}
                    {dayjs(streak.end_date).format('D MMMM YYYY')} spelade laget{' '}
                    {streak.game_count} matcher utan att vinna.
                  </p>
                )
              })}
            </span>
          )}
        </div>
        <div>
          <h2 className="font-bold text-2xl">Tabeller</h2>
          <TeamTable tableArray={teams.tabeller} />
        </div>
      </div>
    </div>
  )
}

export default Team
