import TeamSeasonCuriosities from './CuriositiesSubComponents/TeamSeasonCuriosities'
import UnbeatenStreak from './CuriositiesSubComponents/UnbeatenStreak'
import WinStreak from './CuriositiesSubComponents/WinStreak'
import DrawStreak from './CuriositiesSubComponents/DrawStreak'
import LosingStreak from './CuriositiesSubComponents/LosingStreak'
import NoWinStreak from './CuriositiesSubComponents/NoWinStreak'
const TeamCuriosities = ({ teams }) => {
  return (
    <div>
      <h2 className="text-sm font-bold xs:text-base md:text-xl lg:text-right">
        Kuriosa
      </h2>
      <TeamSeasonCuriosities teams={teams} />
      <UnbeatenStreak teams={teams} />
      <WinStreak teams={teams} />
      <DrawStreak teams={teams} />
      <LosingStreak teams={teams} />
      <NoWinStreak teams={teams} />
    </div>
  )
}

export default TeamCuriosities
