import useSeasonContext from '../../../hooks/contextHooks/useSeasonContext'
import Games from '../../Game/Games'
import SeasonHelp from './SeasonHelpModal'
import Playoff from './SeasonPlayoff'
import SeasonStats from './SeasonStats'
import SeasonTables from './SeasonTables'
import Animation from '../../Game/Subcomponents/Animation'
import Map from './Map'
import { useGetFirstAndLastSeason } from '@/src/hooks/dataHooks/seasonHooks/useGetFirstAndLastSeason'

const SeasonComponentSwitch = ({ tab }: { tab: string | null }) => {
  const { seasonId } = useSeasonContext()
  const { lastSeason } = useGetFirstAndLastSeason()

  let pageContent
  switch (tab) {
    case 'tables':
      pageContent = <SeasonTables />
      break
    case 'games':
      pageContent = <Games />
      break
    case 'playoff':
      pageContent = <Playoff />
      break
    case 'roundForRound':
      pageContent = <Animation />
      break
    case 'stats':
      pageContent = <SeasonStats />
      break
    case 'map':
      pageContent = <Map />
      break
    case 'help':
      pageContent = <SeasonHelp />
      break
    default:
      pageContent = <div>Något gick fel, ingen sida.</div>
      break
  }
  return <>{seasonId <= lastSeason && pageContent}</>
}

export default SeasonComponentSwitch
