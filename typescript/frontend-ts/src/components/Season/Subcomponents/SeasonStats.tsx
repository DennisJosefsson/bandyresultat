import {
  Loading,
  DataError,
} from '../../utilitycomponents/Components/LoadingOrError'
import StatsComponent from './StatsSubComponents/StatsComponent'
import useGenderContext from '../../../hooks/contextHooks/useGenderContext'
import useScrollTo from '../../../hooks/domHooks/useScrollTo'
import { NoWomenSeason } from '../../utilitycomponents/Components/NoWomenSeason'
import { useGetSeasonStats } from '../../../hooks/dataHooks/seasonHooks/statsHooks/useGetSeasonStats'
import useSeasonContext from '../../../hooks/contextHooks/useSeasonContext'

const SeasonStats = () => {
  const { seasonId } = useSeasonContext()
  const { data, isLoading, error } = useGetSeasonStats(seasonId)

  const { women } = useGenderContext()

  useScrollTo()

  if (error) return <DataError />

  if (isLoading) return <Loading />

  if (women && (seasonId === 1973 || seasonId === 1974)) {
    return (
      <div className="mx-auto mt-4 grid place-items-center py-5 font-inter text-sm font-bold text-foreground md:text-base">
        <p className="mx-10 text-center">Statistik saknas för denna säsong.</p>
      </div>
    )
  }

  if (women && seasonId < 1973) {
    return <NoWomenSeason />
  }

  return <>{data && <StatsComponent />}</>
}

export default SeasonStats
