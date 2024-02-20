import TeamSeasonCuriosities from './CuriositiesSubComponents/TeamSeasonCuriosities'
import UnbeatenStreak from './CuriositiesSubComponents/UnbeatenStreak'
import WinStreak from './CuriositiesSubComponents/WinStreak'
import DrawStreak from './CuriositiesSubComponents/DrawStreak'
import LosingStreak from './CuriositiesSubComponents/LosingStreak'
import NoWinStreak from './CuriositiesSubComponents/NoWinStreak'
import { SingleTeam } from '../../../types/teams/teams'
const TeamCuriosities = ({ team }: { team: SingleTeam }) => {
  return (
    <div>
      <h2 className="text-sm font-bold xs:text-base md:text-xl lg:text-right">
        Kuriosa
      </h2>
      <TeamSeasonCuriosities team={team} />
      <UnbeatenStreak team={team} />
      <WinStreak team={team} />
      <DrawStreak team={team} />
      <LosingStreak team={team} />
      <NoWinStreak team={team} />
    </div>
  )
}

export default TeamCuriosities
