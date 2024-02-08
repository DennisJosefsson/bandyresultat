import ScoreStatsCard from './ScoreStatsCard'
import StreakStatsCard from './StreakStatsCard'
import dayjs from 'dayjs'
import 'dayjs/locale/sv'
dayjs.locale('sv')

const StreakStats = ({ data, women }) => {
  const unbeatenStreak = data.unbeatenStreak.filter(
    (table) => table.women === women,
  )
  const winStreak = data.winStreak.filter((table) => table.women === women)
  const drawStreak = data.drawStreak.filter((table) => table.women === women)
  const noWinStreak = data.noWinStreak.filter((table) => table.women === women)
  const losingStreak = data.losingStreak.filter(
    (table) => table.women === women,
  )

  const maxGoalsMen = data.maxGoalsMen
  const minGoalsMen = data.minGoalsMen
  const maxDiffMen = data.maxDiffMen
  const maxGoalsWomen = data.maxGoalsWomen
  const minGoalsWomen = data.minGoalsWomen
  const maxDiffWomen = data.maxDiffWomen

  const streakDataLength =
    winStreak.length +
    unbeatenStreak.length +
    drawStreak.length +
    noWinStreak.length +
    losingStreak.length

  const statsLength =
    maxGoalsMen.length +
    minGoalsMen.length +
    maxDiffMen.length +
    maxGoalsWomen.length +
    minGoalsWomen.length +
    maxDiffWomen.length

  if (streakDataLength === 0 && statsLength === 0) return null

  return (
    <div>
      <h4 className="ml-2 font-bold md:text-lg xl:ml-0">Resultat</h4>
      <div className="grid grid-cols-1 gap-y-4 pt-2 md:grid-cols-2 md:gap-x-20 lg:grid-cols-3 xl:gap-x-44">
        {(streakDataLength > 0 || statsLength > 0) && (
          <div>
            <ScoreStatsCard
              title="Match(er) med flest antal mål:"
              streakMen={maxGoalsMen}
              streakWomen={maxGoalsWomen}
              women={women}
            />
            <ScoreStatsCard
              title="Match(er) med minst antal mål:"
              streakMen={minGoalsMen}
              streakWomen={minGoalsWomen}
              women={women}
            />
            <ScoreStatsCard
              title="Match(er) med störst målskillnad:"
              streakMen={maxDiffMen}
              streakWomen={maxDiffWomen}
              women={women}
            />
          </div>
        )}
        {streakDataLength > 0 && (
          <div>
            {unbeatenStreak.length > 0 && (
              <StreakStatsCard
                title="Matcher i rad utan förlust:"
                streak={unbeatenStreak}
              />
            )}

            {winStreak.length > 0 && (
              <StreakStatsCard
                title="Matcher i rad med vinst:"
                streak={winStreak}
              />
            )}

            {drawStreak.length > 0 && (
              <StreakStatsCard
                title="Matcher i rad med oavgjort:"
                streak={drawStreak}
              />
            )}

            {noWinStreak.length > 0 && (
              <StreakStatsCard
                title="Matcher i rad utan vinst:"
                streak={noWinStreak}
              />
            )}

            {losingStreak.length > 0 && (
              <StreakStatsCard
                title="Matcher i rad med förlust:"
                streak={losingStreak}
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default StreakStats
