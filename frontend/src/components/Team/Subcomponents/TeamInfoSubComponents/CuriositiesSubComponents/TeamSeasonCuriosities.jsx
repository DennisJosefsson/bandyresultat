const TeamSeasonCuriosities = ({ teams }) => {
  const playoffStreak = teams.playoffStreak
  const playoffCount = Number(teams.playoffCount[0].playoff_count)
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
  return (
    <div className="teamCurCard">
      {seasons.length === 1 && (
        <div className="cur">
          {teams.team.name} från {teams.team.city} har spelat en säsong i högsta
          serien, det var {seasons[0].year}.
        </div>
      )}
      {seasons.length > 1 && (
        <div className="cur">
          {teams.team.name} från {teams.team.city} har spelat {seasons.length}{' '}
          säsonger i högsta serien. Första säsongen var{' '}
          {seasons[seasons.length - 1].year} och senaste {seasons[0].year}.{' '}
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
          {finals === 1 ? 'en finalmatch' : `${finals} finalmatcher`} och vunnit{' '}
          {golds === 1
            ? `en gång (${winString.slice(2)}).`
            : `${golds} gånger (${winString.slice(2)}).`}
        </div>
      )}
      {finals > 0 && golds === 0 && (
        <div className="cur">
          {teams.team.casualName} har spelat{' '}
          {finals === 1 ? 'en finalmatch' : `${finals} finalmatcher`} men har
          aldrig vunnit.
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
                {teams.team.casualName} spelade slutspel {streak.streak_length}{' '}
                år på raken mellan {streak.start_year} och {streak.end_year}.
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default TeamSeasonCuriosities
