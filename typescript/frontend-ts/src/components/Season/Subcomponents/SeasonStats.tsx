import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

import { getSeasonStats } from '../../../requests/games'

import LoadingOrError from '../../utilitycomponents/Components/LoadingOrError'
import StatsComponent from './StatsSubComponents/StatsComponent'
import useGenderContext from '../../../hooks/contextHooks/useGenderContext'
import useScrollTo from '../../../hooks/useScrollTo'

const SeasonStats = ({ seasonId }: { seasonId: number }) => {
  const { data, isLoading, error } = useQuery(
    ['singleSeasonStats', seasonId],
    () => getSeasonStats(seasonId),
  )

  const { women } = useGenderContext()

  useScrollTo()

  if (isLoading || error)
    return <LoadingOrError isLoading={isLoading} error={error} />

  if (women && (seasonId === 1973 || seasonId === 1974)) {
    return (
      <div className="mx-auto mt-4 grid place-items-center py-5 font-inter text-sm font-bold text-[#011d29] md:text-base">
        <p className="mx-10 text-center">Statistik saknas för denna säsong.</p>
      </div>
    )
  }

  if (women && seasonId < 1973) {
    return (
      <div className="mx-auto mt-4 grid place-items-center py-5 font-inter text-sm font-bold text-[#011d29] md:text-base">
        <p className="mx-10 text-center">
          Första säsongen för damernas högsta serie var{' '}
          <Link to="/season/1973" className="font-bold">
            1972/73
          </Link>
          .
        </p>
      </div>
    )
  }

  return <>{data && <StatsComponent data={data} women={women} />}</>
}

export default SeasonStats
