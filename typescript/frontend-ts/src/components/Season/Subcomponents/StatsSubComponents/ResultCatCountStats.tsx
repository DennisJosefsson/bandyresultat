import useGenderContext from '../../../../hooks/contextHooks/useGenderContext'
import { useGetGameResultStats } from '../../../../hooks/dataHooks/seasonHooks/statsHooks/useGetGameResultStats'
import GameResultStatsCard from './GameResultStatsCard'
import { sortStatsCat } from '../../../utilitycomponents/functions/sortFunction'
import { groupConstant } from '../../../utilitycomponents/functions/constants'
import useSeasonContext from '../../../../hooks/contextHooks/useSeasonContext'

const ResultCatCountStats = () => {
  const { seasonId } = useSeasonContext()
  const { women } = useGenderContext()
  const {
    gamesCountTotalCat,
    winCountAwayTeamCat,
    winCountHomeTeamCat,
    drawCountCat,
  } = useGetGameResultStats(seasonId, women)


  return (
    <>
      {winCountHomeTeamCat &&
      winCountAwayTeamCat &&
      winCountHomeTeamCat.length > 1 ? (
        <div>
          <h4 className="ml-2 text-xs font-bold md:text-sm xl:ml-0 xl:text-base">
            Resultatstatistik kategori
          </h4>
          <div className="grid grid-cols-1 gap-y-4 pt-2 md:grid-cols-2 md:gap-x-20 lg:grid-cols-3 xl:gap-x-44">
            <div>
              <h5 className="ml-2 text-xs font-bold md:text-sm xl:ml-0 xl:text-base">
                Vinst hemmalag
              </h5>
              {sortStatsCat(winCountHomeTeamCat).map((cat) => {
                return (
                  <GameResultStatsCard
                    key={`${cat.category}-${Math.random()}`}
                    title={groupConstant[cat.category]}
                    count={cat.count}
                  />
                )
              })}
            </div>
            <div>
              <h5 className="ml-2 text-xs font-bold md:text-sm xl:ml-0 xl:text-base">
                Vinst bortalag
              </h5>
              {sortStatsCat(winCountAwayTeamCat).map((cat) => {
                return (
                  <GameResultStatsCard
                    key={`${cat.category}-${Math.random()}`}
                    title={groupConstant[cat.category]}
                    count={cat.count}
                  />
                )
              })}
            </div>
            {drawCountCat && drawCountCat.length > 0 ? (
              <div>
                <h5 className="ml-2 text-xs font-bold md:text-sm xl:ml-0 xl:text-base">
                  Oavgjort
                </h5>
                {sortStatsCat(drawCountCat).map((cat) => {
                  return (
                    <GameResultStatsCard
                      key={`${cat.category}-${Math.random()}`}
                      title={groupConstant[cat.category]}
                      count={cat.count}
                    />
                  )
                })}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
      {winCountHomeTeamCat &&
      winCountHomeTeamCat.length > 1 &&
      gamesCountTotalCat ? (
        <div>
          <h4 className="ml-2 text-xs font-bold md:text-sm xl:ml-0 xl:text-base">
            Resultatstatistik kategori genomsnitt
          </h4>
          <div className="grid grid-cols-1 gap-y-4 pt-2 md:grid-cols-2 md:gap-x-20 lg:grid-cols-3 xl:gap-x-44">
            <div>
              <h5 className="ml-2 text-xs font-bold md:text-sm xl:ml-0 xl:text-base">
                Vinst hemmalag
              </h5>
              {sortStatsCat(winCountHomeTeamCat).map((cat) => {
                const gamesObject = gamesCountTotalCat.find(
                  (category) => category.category === cat.category,
                )
                if (!gamesObject || !cat.count) return null
                return (
                  <GameResultStatsCard
                    key={`${cat.category}-${Math.random()}`}
                    title={groupConstant[cat.category]}
                    count={`${((cat?.count / gamesObject.count) * 100).toFixed(
                      1,
                    )}%`}
                  />
                )
              })}
            </div>
            {winCountAwayTeamCat && winCountAwayTeamCat.length > 0 ? (
              <div>
                <h5 className="ml-2 text-xs font-bold md:text-sm xl:ml-0 xl:text-base">
                  Vinst bortalag
                </h5>
                {sortStatsCat(winCountAwayTeamCat).map((cat) => {
                  const gamesObject = gamesCountTotalCat.find(
                    (category) => category.category === cat.category,
                  )
                  if (!gamesObject || !cat.count) return null
                  return (
                    <GameResultStatsCard
                      key={`${cat.category}-${Math.random()}`}
                      title={groupConstant[cat.category]}
                      count={`${(
                        (cat?.count / gamesObject.count) *
                        100
                      ).toFixed(1)}%`}
                    />
                  )
                })}
              </div>
            ) : null}
            {drawCountCat && drawCountCat.length > 0 ? (
              <div>
                <h5 className="ml-2 text-xs font-bold md:text-sm xl:ml-0 xl:text-base">
                  Oavgjort
                </h5>
                {sortStatsCat(drawCountCat).map((cat) => {
                  const gamesObject = gamesCountTotalCat.find(
                    (category) => category.category === cat.category,
                  )
                  if (!gamesObject || !cat.count) return null
                  return (
                    <GameResultStatsCard
                      key={`${cat.category}-${Math.random()}`}
                      title={groupConstant[cat.category]}
                      count={`${(
                        (cat?.count / gamesObject.count) *
                        100
                      ).toFixed(1)}%`}
                    />
                  )
                })}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  )
}

export default ResultCatCountStats
