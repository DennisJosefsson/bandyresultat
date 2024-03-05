import useGenderContext from '../../../../hooks/contextHooks/useGenderContext'
import useSeasonContext from '../../../../hooks/contextHooks/useSeasonContext'
import { useGetStreakStats } from '../../../../hooks/dataHooks/seasonHooks/statsHooks/useGetStreaksStats'
import MaxDiffStatsCard from './MaxDiffStatsCard'

const MaxDiffData = () => {
  const { seasonId } = useSeasonContext()
  const { women } = useGenderContext()
  const { maxDiffMen, maxDiffWomen } = useGetStreakStats(seasonId, women)

  return (
    <>
      {maxDiffMen && maxDiffWomen ? (
        <MaxDiffStatsCard
          title="Match(er) med störst målskillnad:"
          maxDiffMen={maxDiffMen}
          maxDiffWomen={maxDiffWomen}
          women={women}
        />
      ) : null}
    </>
  )
}

export default MaxDiffData
