import { StaticSeasonTable } from '../../../types/tables/tables'
import { SerieAttributes } from '../../../types/series/series'
import StaticTableList from './StaticTableList'

type StaticTableListProps = {
  tableArray: StaticSeasonTable[]
  seriesInfo: SerieAttributes[]
}

const StaticTables = ({
  tableArray,

  seriesInfo,
}: StaticTableListProps) => {
  return (
    <div>
      <StaticTableList
        tableArray={tableArray.filter((team) => team.group === 'Div1Norr')}
        seriesInfo={seriesInfo}
        serieName="Division 1 Norra"
      />
      <StaticTableList
        tableArray={tableArray.filter((team) => team.group === 'Div1Syd')}
        seriesInfo={seriesInfo}
        serieName="Division 1 Södra"
      />
    </div>
  )
}

export default StaticTables
