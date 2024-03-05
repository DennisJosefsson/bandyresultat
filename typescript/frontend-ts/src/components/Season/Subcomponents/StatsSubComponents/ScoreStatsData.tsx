import useGenderContext from '../../../../hooks/contextHooks/useGenderContext'
import useSeasonContext from '../../../../hooks/contextHooks/useSeasonContext'
import { useGetStreakStats } from '../../../../hooks/dataHooks/seasonHooks/statsHooks/useGetStreaksStats'
import ScoreStatsCard from './MaxMinGoalsStatsCard'

const ScoreStatsData = () => {
  const { seasonId } = useSeasonContext()
  const { women } = useGenderContext()
  const { maxGoalsMen, maxGoalsWomen, minGoalsMen, minGoalsWomen } =
    useGetStreakStats(seasonId, women)

  return (
    <>
      {maxGoalsMen && maxGoalsWomen ? (
        <ScoreStatsCard
          title="Match(er) med flest antal mål:"
          maxMinGoalsMen={maxGoalsMen}
          maxMinGoalsWomen={maxGoalsWomen}
          women={women}
        />
      ) : null}
      {minGoalsMen && minGoalsWomen ? (
        <ScoreStatsCard
          title="Match(er) med minst antal mål:"
          maxMinGoalsMen={minGoalsMen}
          maxMinGoalsWomen={minGoalsWomen}
          women={women}
        />
      ) : null}
    </>
  )
}

export default ScoreStatsData
