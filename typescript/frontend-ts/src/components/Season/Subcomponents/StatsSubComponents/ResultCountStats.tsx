import useGenderContext from '../../../../hooks/contextHooks/useGenderContext'
import { useGetGameResultStats } from '../../../../hooks/dataHooks/seasonHooks/statsHooks/useGetGameResultStats'
import GameResultStatsCard from './GameResultStatsCard'
import useSeasonContext from '../../../../hooks/contextHooks/useSeasonContext'

const ResultCountStats = () => {
  const { seasonId } = useSeasonContext()
  const { women } = useGenderContext()
  const {
    gamesCountTotal,

    winCountAwayTeam,
    winCountHomeTeam,
    drawCount,
  } = useGetGameResultStats(seasonId, women)
  return (
    <>
      <div>
        {winCountHomeTeam && winCountHomeTeam.count > 0 && (
          <GameResultStatsCard
            title="Vinster hemmalag"
            count={winCountHomeTeam?.count}
          />
        )}
        {winCountAwayTeam && winCountAwayTeam.count > 0 && (
          <GameResultStatsCard
            title="Vinster bortalag"
            count={winCountAwayTeam.count}
          />
        )}
        {drawCount && drawCount.count > 0 && (
          <GameResultStatsCard title="Oavgjort" count={drawCount.count} />
        )}
      </div>
      <div>
        {winCountHomeTeam && gamesCountTotal && winCountHomeTeam.count > 0 && (
          <GameResultStatsCard
            title="Vinster hemmalag"
            count={`${(
              (winCountHomeTeam?.count / gamesCountTotal.count) *
              100
            ).toFixed(1)}%`}
          />
        )}
        {winCountAwayTeam && gamesCountTotal && winCountAwayTeam.count > 0 && (
          <GameResultStatsCard
            title="Vinster bortalag"
            count={`${(
              (winCountAwayTeam?.count / gamesCountTotal.count) *
              100
            ).toFixed(1)}%`}
          />
        )}
        {drawCount && gamesCountTotal && drawCount.count > 0 && (
          <GameResultStatsCard
            title="Oavgjort"
            count={`${((drawCount.count / gamesCountTotal.count) * 100).toFixed(
              1,
            )}%`}
          />
        )}
      </div>
    </>
  )
}

export default ResultCountStats
