import { StreakObjectTypes } from '../../../types/games/streaks'
import GeneralStats from './GeneralStats'
import PointsGoals from './PointsGoals'
import Streaks from './Streaks'

type ParamType = {
  record: string
  women: boolean
}

type RecordComponentSwitchProps = {
  data: StreakObjectTypes
  params: ParamType
}

const RecordComponentSwitch = ({
  data,
  params,
}: RecordComponentSwitchProps) => {
  let pageContent
  switch (params.record) {
    case 'points':
    case 'scored':
    case 'conceded':
      if (data) pageContent = <PointsGoals data={data} />
      break
    case 'generalStats':
      if (data) pageContent = <GeneralStats data={data} />
      break
    case 'streaks':
      if (data) pageContent = <Streaks data={data} />
      break
    default:
      pageContent = <div>Något är fel, tom sida.</div>
  }
  return <>{pageContent}</>
}

export default RecordComponentSwitch
