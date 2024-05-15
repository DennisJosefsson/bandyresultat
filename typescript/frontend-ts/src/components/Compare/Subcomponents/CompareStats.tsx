import { CompareResponseObjectType } from '../../types/teams/compare'
import { CompareFormState } from '../../types/teams/teams'
import FirstGames from './CompareStatsSubComponents/FirstGames'
import Golds from './CompareStatsSubComponents/Golds'
import LatestGames from './CompareStatsSubComponents/LatestGames'
import Playoffs from './CompareStatsSubComponents/Playoffs'
import Seasons from './CompareStatsSubComponents/Seasons'
import { TabsContent } from '@/src/@/components/ui/tabs'
type CompareStatsProps = {
  searchObject: CompareFormState
  firstGames: CompareResponseObjectType['firstGames']
  latestGames: CompareResponseObjectType['latestGames']
  golds: CompareResponseObjectType['golds']
  playoffs: CompareResponseObjectType['playoffs']
  allPlayoffs: CompareResponseObjectType['allPlayoffs']
  seasons: CompareResponseObjectType['seasons']
  allSeasons: CompareResponseObjectType['allSeasons']
}

const CompareStats = ({
  searchObject,
  firstGames,
  latestGames,
  golds,
  playoffs,
  allPlayoffs,
  seasons,
  allSeasons,
}: CompareStatsProps) => {
  if (!searchObject) return null
  return (
    <>
      <TabsContent value="games">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FirstGames firstGames={firstGames} searchObject={searchObject} />
          {latestGames.length > 0 && <LatestGames latestGames={latestGames} />}
        </div>
      </TabsContent>
      <TabsContent value="stats">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Seasons
            seasons={seasons}
            allSeasons={allSeasons}
            searchObject={searchObject}
          />
          <Playoffs
            playoffs={playoffs}
            allPlayoffs={allPlayoffs}
            searchObject={searchObject}
          />
          {golds.length > 0 && <Golds golds={golds} />}
        </div>
      </TabsContent>
    </>
  )
}

export default CompareStats
