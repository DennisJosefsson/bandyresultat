import FirstGames from './CompareStatsSubComponents/FirstGames'
import Golds from './CompareStatsSubComponents/Golds'
import LatestGames from './CompareStatsSubComponents/LatestGames'
import Playoffs from './CompareStatsSubComponents/Playoffs'
import Seasons from './CompareStatsSubComponents/Seasons'

const CompareStats = ({
  compObject,
  firstGames,
  latestGames,
  golds,
  playoffs,
  allPlayoffs,
  seasons,
  allSeasons,
}) => {
  return (
    <div>
      <h2 className="text-sm font-bold md:text-lg xl:text-right">Statistik</h2>
      <div className="grid grid-cols-1 flex-row justify-between gap-2 md:flex xl:gap-8">
        <div className="w-full md:w-80">
          <FirstGames compObject={compObject} firstGames={firstGames} />
          {latestGames.length > 0 && <LatestGames latestGames={latestGames} />}
        </div>
        <div className="w-full md:w-80">
          <div className="w-full">
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompareStats