import { Link } from '@tanstack/react-router'
import {
  Loading,
  DataError,
} from '../../utilitycomponents/Components/LoadingAndError/LoadingOrError'
import SeasonPlayoffTables from './PlayoffSubComponents/SeasonPlayoffTables'
import useGenderContext from '../../../hooks/contextHooks/useGenderContext'
import useScrollTo from '../../../hooks/domHooks/useScrollTo'
import useSeasonContext from '../../../hooks/contextHooks/useSeasonContext'
import { useGetPlayoffData } from '../../../hooks/dataHooks/seasonHooks/playoffHooks/useGetPlayoffData'
import { useGetFirstAndLastSeason } from '../../../hooks/dataHooks/seasonHooks/useGetFirstAndLastSeason'

const Playoff = () => {
  const { women } = useGenderContext()
  const { seasonId } = useSeasonContext()
  const { lastSeason } = useGetFirstAndLastSeason()

  const { isLoading, error, isSuccess, tables, final, playoffGames } =
    useGetPlayoffData(seasonId)

  useScrollTo()

  if (error) return <DataError error={error} />

  if (isLoading) return <Loading />

  if (!isSuccess) return null

  if (women && seasonId < 1973) {
    return (
      <div className="mx-auto mt-4 grid place-items-center py-5 font-inter text-sm font-bold text-foreground md:text-base">
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

  return (
    <div>
      {seasonId <= lastSeason && tables && playoffGames && final ? (
        <SeasonPlayoffTables
          tables={tables}
          playoffGames={playoffGames}
          final={final}
          women={women}
          seasonId={seasonId}
        />
      ) : null}
    </div>
  )
}

export default Playoff
