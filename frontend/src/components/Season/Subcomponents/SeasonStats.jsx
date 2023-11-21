import { useContext, useEffect } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { GenderContext } from '../../../contexts/contexts'
import { getSeasonStats } from '../../../requests/games'

import LoadingOrError from '../../utilitycomponents/Components/LoadingOrError'
import StatsComponent from './StatsSubComponents/StatsComponent'

const SeasonStats = ({ seasonId }) => {
  const { data, isLoading, error } = useQuery(
    ['singleSeasonStats', seasonId],
    () => getSeasonStats(seasonId),
  )

  const { women } = useContext(GenderContext)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  if (isLoading || error)
    return <LoadingOrError isLoading={isLoading} error={error} />

  if (data?.success === 'false') {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
        {data.message}
      </div>
    )
  }

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

  return <StatsComponent data={data} women={women} />
}

export default SeasonStats
