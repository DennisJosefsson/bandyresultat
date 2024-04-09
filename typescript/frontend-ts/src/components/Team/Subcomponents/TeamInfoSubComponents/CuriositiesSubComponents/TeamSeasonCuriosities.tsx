import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/src/@/components/ui/card'
import { SingleTeam } from '../../../../types/teams/teams'

const TeamSeasonCuriosities = ({ team }: { team: SingleTeam }) => {
  const playoffStreak = team.playoffStreak
  const playoffCount = Number(team.playoffCount[0].playoff_count)
  const seasons = team.team.seasonteam.filter(
    (season) =>
      season.teamseason.qualification === false ||
      season.teamseason.qualification === null,
  )

  const qualificationSeasons = team.team.seasonteam.filter(
    (season) => season.teamseason.qualification === true,
  )

  const finals = team.finalsAndWins.length
  const golds = team.finalsAndWins.filter((table) => table.win === true).length
  let winString = ''
  winString += team.finalsAndWins
    .filter((table) => table.win === true)
    .reduce((str, winYear) => `${str}, ${winYear.date.slice(0, 4)}`, '')
  return (
    <Card className="mb-2">
      <CardHeader>
        <CardTitle>Kuriosa</CardTitle>
      </CardHeader>
      <CardContent className="text-[10px] xxs:text-xs md:p-2 lg:mr-0 lg:text-sm">
        {seasons.length === 1 && (
          <div className="mb-1">
            {team.team.name} från {team.team.city} har spelat en säsong i högsta
            serien, det var {seasons[0].year}.
          </div>
        )}
        {seasons.length > 1 && (
          <div className="mb-1">
            {team.team.name} från {team.team.city} har spelat {seasons.length}{' '}
            säsonger i högsta serien. Första säsongen var{' '}
            {seasons[seasons.length - 1].year} och senaste {seasons[0].year}.{' '}
          </div>
        )}
        <div className="mb-1">
          {qualificationSeasons.length === 1
            ? `${team.team.casualName} har kvalat till högsta serien, mot motstånd från den högre serien, vid ett tillfälle.`
            : ''}
        </div>
        <div className="mb-1">
          {qualificationSeasons.length > 1
            ? `${team.team.casualName} har kvalat till högsta serien, mot motstånd från den högre serien, vid ${qualificationSeasons.length} tillfällen.`
            : ''}
        </div>

        {finals > 0 && golds > 0 && (
          <div className="mb-1">
            {team.team.casualName} har spelat{' '}
            {finals === 1 ? 'en finalmatch' : `${finals} finalmatcher`} och
            vunnit{' '}
            {golds === 1
              ? `en gång (${winString.slice(2)}).`
              : `${golds} gånger (${winString.slice(2)}).`}
          </div>
        )}
        {finals > 0 && golds === 0 && (
          <div className="mb-1">
            {team.team.casualName} har spelat{' '}
            {finals === 1 ? 'en finalmatch' : `${finals} finalmatcher`} men har
            aldrig vunnit.
          </div>
        )}
        {playoffCount > 0 && (
          <div className="mb-1">
            Laget har kvalificerat sig för slutspel{' '}
            {playoffCount === 1 ? 'en gång.' : `${playoffCount} gånger.`}
          </div>
        )}
        {playoffCount === 0 && (
          <div className="mb-1">
            Laget har inte kvalificerat sig för slutspel genom seriespel.
          </div>
        )}

        {playoffStreak.length > 0 && (
          <div className="mb-1">
            {playoffStreak.map((streak, index) => {
              return (
                <div key={`${streak.start_year}-${index}`}>
                  {team.team.casualName} spelade slutspel {streak.streak_length}{' '}
                  år på raken mellan {streak.start_year} och {streak.end_year}.
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default TeamSeasonCuriosities
