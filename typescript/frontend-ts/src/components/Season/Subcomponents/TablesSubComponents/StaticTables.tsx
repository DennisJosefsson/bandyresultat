import { StaticSeasonTable } from '../../../types/tables/tables'
import { TeamAndSeasonAttributes } from '../../../types/teams/teams'
import { SerieAttributes } from '../../../types/series/series'
import StaticTableList from './StaticTableList'

type StaticTableListProps = {
  tableArray: StaticSeasonTable[]
  teams: TeamAndSeasonAttributes[]
  seriesInfo: SerieAttributes[]
}

const StaticTables = ({
  tableArray,
  teams,
  seriesInfo,
}: StaticTableListProps) => {
  return (
    <div>
      <StaticTableList
        tableArray={tableArray.filter((team) => team.group === 'Div1Norr')}
        seriesInfo={seriesInfo}
        teams={teams}
        serieName="Division 1 Norra"
      />
      <StaticTableList
        tableArray={tableArray.filter((team) => team.group === 'Div1Syd')}
        seriesInfo={seriesInfo}
        teams={teams}
        serieName="Division 1 Södra"
      />
    </div>
  )
}

export default StaticTables
