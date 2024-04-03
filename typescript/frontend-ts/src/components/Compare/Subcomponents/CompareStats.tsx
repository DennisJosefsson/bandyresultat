import { CompareResponseObjectType } from '../../types/teams/compare'
import { CompareFormState } from '../../types/teams/teams'
import FirstGames from './CompareStatsSubComponents/FirstGames'
import Golds from './CompareStatsSubComponents/Golds'
import LatestGames from './CompareStatsSubComponents/LatestGames'
import Playoffs from './CompareStatsSubComponents/Playoffs'
import Seasons from './CompareStatsSubComponents/Seasons'
import { TabsContent } from '@/src/@/components/ui/tabs'
type CompareStatsProps = {
  compObject: CompareFormState | null
  firstGames: CompareResponseObjectType['firstGames']
  latestGames: CompareResponseObjectType['latestGames']
  golds: CompareResponseObjectType['golds']
  playoffs: CompareResponseObjectType['playoffs']
  allPlayoffs: CompareResponseObjectType['allPlayoffs']
  seasons: CompareResponseObjectType['seasons']
  allSeasons: CompareResponseObjectType['allSeasons']
}

const CompareStats = ({
  compObject,
  firstGames,
  latestGames,
  golds,
  playoffs,
  allPlayoffs,
  seasons,
  allSeasons,
}: CompareStatsProps) => {
  if (!compObject) return null
  return (
    <>
      <TabsContent value="games">
        <FirstGames compObject={compObject} firstGames={firstGames} />
        {latestGames.length > 0 && <LatestGames latestGames={latestGames} />}
      </TabsContent>
      <TabsContent value="stats">
        <Seasons
          compObject={compObject}
          seasons={seasons}
          allSeasons={allSeasons}
        />
        <Playoffs
          compObject={compObject}
          playoffs={playoffs}
          allPlayoffs={allPlayoffs}
        />
        {golds.length > 0 && <Golds golds={golds} />}
      </TabsContent>
    </>
  )
}

export default CompareStats
