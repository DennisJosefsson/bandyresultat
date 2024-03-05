import useGenderContext from '../../../../hooks/contextHooks/useGenderContext'
import { useGetGameResultStats } from '../../../../hooks/dataHooks/seasonHooks/statsHooks/useGetGameResultStats'
import GameResultStatsCard from './GameResultStatsCard'
import { sortStatsCat } from '../../../utilitycomponents/functions/sortFunction'
import { groupConstant } from '../../../utilitycomponents/functions/constants'
import useSeasonContext from '../../../../hooks/contextHooks/useSeasonContext'

const GameCountStats = () => {
  const { seasonId } = useSeasonContext()
  const { women } = useGenderContext()
  const { gamesCountTotal, gamesCountTotalCat } = useGetGameResultStats(
    seasonId,
    women,
  )

  return (
    <>
      {gamesCountTotal && (
        <div>
          <GameResultStatsCard
            title="Antal matcher"
            count={gamesCountTotal.count}
          />
          {gamesCountTotalCat && gamesCountTotalCat.length > 0 ? (
            <>
              {sortStatsCat(gamesCountTotalCat).map((cat) => {
                return (
                  <GameResultStatsCard
                    key={`${cat.category}-${Math.random()}`}
                    title={groupConstant[cat.category]}
                    count={cat.count}
                  />
                )
              })}
            </>
          ) : null}
        </div>
      )}
    </>
  )
}

export default GameCountStats
