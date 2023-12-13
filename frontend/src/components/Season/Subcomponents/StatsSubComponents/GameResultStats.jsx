import { sortStatsCat } from '../../../utilitycomponents/Functions/sortFunction'
import { groupConstant } from '../../../utilitycomponents/Functions/constants'
import GameResultStatsCard from './GameResultStatsCard'

const GameResultStats = ({ data, women }) => {
  const gamesCountTotal = data.gamesCountTotal.find(
    (cat) => cat.women === women,
  )
  const gamesCountTotalCat = data.gamesCountTotalCat.filter(
    (cat) => cat.women === women,
  )
  const winCountHomeTeam = data.winCountHomeTeam.find(
    (cat) => cat.women === women,
  )
  const winCountAwayTeam = data.winCountAwayTeam.find(
    (cat) => cat.women === women,
  )
  const drawCount = data.drawCount.find((cat) => cat.women === women)

  const winCountHomeTeamCat = data.winCountHomeTeamCat
    .filter((cat) => cat.women === women)
    .filter((cat) => cat.category !== 'final')
  const winCountAwayTeamCat = data.winCountAwayTeamCat
    .filter((cat) => cat.women === women)
    .filter((cat) => cat.category !== 'final')
  const drawCountCat = data.drawCountCat
    .filter((cat) => cat.women === women)
    .filter((cat) => cat.category !== 'final')

  return (
    <div>
      <h4 className="ml-2 font-bold md:text-lg xl:ml-0">
        Match- och resultatstatistik
      </h4>
      <div className="grid grid-cols-1 gap-y-4 pt-2 md:grid-cols-2 md:gap-x-20 lg:grid-cols-3 xl:gap-x-44">
        <div>
          <GameResultStatsCard
            title="Antal matcher"
            count={gamesCountTotal?.count}
          />

          {sortStatsCat(gamesCountTotalCat).map((cat) => {
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
          {winCountHomeTeam?.count > 0 && (
            <GameResultStatsCard
              title="Vinster hemmalag"
              count={winCountHomeTeam?.count}
            />
          )}
          {winCountAwayTeam?.count > 0 && (
            <GameResultStatsCard
              title="Vinster bortalag"
              count={winCountAwayTeam?.count}
            />
          )}
          {drawCount?.count > 0 && (
            <GameResultStatsCard
              title="Oavgjort"
              count={drawCount?.count / 2}
            />
          )}
        </div>
        <div>
          {winCountHomeTeam?.count > 0 && (
            <GameResultStatsCard
              title="Vinster hemmalag"
              count={`${(
                (winCountHomeTeam?.count / gamesCountTotal?.count) *
                100
              ).toFixed(1)}%`}
            />
          )}
          {winCountAwayTeam?.count > 0 && (
            <GameResultStatsCard
              title="Vinster bortalag"
              count={`${(
                (winCountAwayTeam?.count / gamesCountTotal?.count) *
                100
              ).toFixed(1)}%`}
            />
          )}
          {drawCount?.count > 0 && (
            <GameResultStatsCard
              title="Oavgjort"
              count={`${(
                (drawCount?.count / 2 / gamesCountTotal?.count) *
                100
              ).toFixed(1)}%`}
            />
          )}
        </div>
      </div>
      {winCountHomeTeamCat.length > 1 && (
        <div>
          <h4 className="ml-2 font-bold md:text-lg xl:ml-0">
            Resultatstatistik kategori
          </h4>
          <div className="grid grid-cols-1 gap-y-4 pt-2 md:grid-cols-2 md:gap-x-20 lg:grid-cols-3 xl:gap-x-44">
            {winCountHomeTeamCat.length > 0 && (
              <div>
                <h5 className="ml-2 text-sm font-bold md:text-base xl:ml-0">
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
            )}
            {winCountAwayTeamCat.length > 0 && (
              <div>
                <h5 className="ml-2 text-sm font-bold md:text-base xl:ml-0">
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
            )}
            {drawCountCat.length > 0 && (
              <div>
                <h5 className="ml-2 text-sm font-bold md:text-base xl:ml-0">
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
            )}
          </div>
        </div>
      )}
      {winCountHomeTeamCat.length > 1 && (
        <div>
          <h4 className="ml-2 font-bold md:text-lg xl:ml-0">
            Resultatstatistik kategori genomsnitt
          </h4>
          <div className="grid grid-cols-1 gap-y-4 pt-2 md:grid-cols-2 md:gap-x-20 lg:grid-cols-3 xl:gap-x-44">
            {winCountHomeTeamCat.length > 0 && (
              <div>
                <h5 className="ml-2 text-sm font-bold md:text-base xl:ml-0">
                  Vinst hemmalag
                </h5>
                {sortStatsCat(winCountHomeTeamCat).map((cat) => {
                  return (
                    <GameResultStatsCard
                      key={`${cat.category}-${Math.random()}`}
                      title={groupConstant[cat.category]}
                      count={`${(
                        (cat?.count /
                          gamesCountTotalCat.find(
                            (category) => category.category === cat.category,
                          ).count) *
                        100
                      ).toFixed(1)}%`}
                    />
                  )
                })}
              </div>
            )}
            {winCountAwayTeamCat.length > 0 && (
              <div>
                <h5 className="ml-2 text-sm font-bold md:text-base xl:ml-0">
                  Vinst bortalag
                </h5>
                {sortStatsCat(winCountAwayTeamCat).map((cat) => {
                  return (
                    <GameResultStatsCard
                      key={`${cat.category}-${Math.random()}`}
                      title={groupConstant[cat.category]}
                      count={`${(
                        (cat?.count /
                          gamesCountTotalCat.find(
                            (category) => category.category === cat.category,
                          ).count) *
                        100
                      ).toFixed(1)}%`}
                    />
                  )
                })}
              </div>
            )}
            {drawCountCat.length > 0 && (
              <div>
                <h5 className="ml-2 text-sm font-bold md:text-base xl:ml-0">
                  Oavgjort
                </h5>
                {sortStatsCat(drawCountCat).map((cat) => {
                  return (
                    <GameResultStatsCard
                      key={`${cat.category}-${Math.random()}`}
                      title={groupConstant[cat.category]}
                      count={`${(
                        (cat?.count /
                          2 /
                          gamesCountTotalCat.find(
                            (category) => category.category === cat.category,
                          ).count) *
                        100
                      ).toFixed(1)}%`}
                    />
                  )
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default GameResultStats
