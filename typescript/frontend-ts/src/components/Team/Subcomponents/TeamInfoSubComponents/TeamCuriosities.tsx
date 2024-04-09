import TeamSeasonCuriosities from './CuriositiesSubComponents/TeamSeasonCuriosities'

import { SingleTeam } from '../../../types/teams/teams'
import StreakComponent from './CuriositiesSubComponents/StreakComponent'
const TeamCuriosities = ({ team }: { team: SingleTeam }) => {
  return (
    <div>
      <TeamSeasonCuriosities team={team} />
      <div className="grid grid-cols-1 gap-1 lg:grid-cols-2 lg:gap-2">
        <StreakComponent>
          <StreakComponent.Title>Obesegrade</StreakComponent.Title>
          <StreakComponent.Content
            streak={team.unbeatenStreak}
            limit={5}
          ></StreakComponent.Content>
        </StreakComponent>
        <StreakComponent>
          <StreakComponent.Title>Vinster i rad</StreakComponent.Title>
          <StreakComponent.Content
            streak={team.winStreak}
            limit={5}
          ></StreakComponent.Content>
        </StreakComponent>
        <StreakComponent>
          <StreakComponent.Title>Oavgjorda</StreakComponent.Title>
          <StreakComponent.Content
            streak={team.drawStreak}
            limit={2}
          ></StreakComponent.Content>
        </StreakComponent>
        <StreakComponent>
          <StreakComponent.Title>Förluster</StreakComponent.Title>
          <StreakComponent.Content
            streak={team.losingStreak}
            limit={5}
          ></StreakComponent.Content>
        </StreakComponent>
        <StreakComponent>
          <StreakComponent.Title>
            Matcher i rad utan vinst
          </StreakComponent.Title>
          <StreakComponent.Content
            streak={team.noWinStreak}
            limit={5}
          ></StreakComponent.Content>
        </StreakComponent>
      </div>
    </div>
  )
}

export default TeamCuriosities
