import { Link } from 'react-router-dom'
import { useState } from 'react'
import PlayoffSeriesPopup from './PlayoffSubComponents/PlayoffSeriesPopup'
import {
  Loading,
  DataError,
} from '../../utilitycomponents/Components/LoadingOrError'
import SeasonPlayoffTables from './PlayoffSubComponents/SeasonPlayoffTables'
import useGenderContext from '../../../hooks/contextHooks/useGenderContext'
import { GameObjectType } from '../../types/games/games'
import useScrollTo from '../../../hooks/domHooks/useScrollTo'
import useSeasonContext from '../../../hooks/contextHooks/useSeasonContext'
import { useGetPlayoffData } from '../../../hooks/dataHooks/seasonHooks/playoffHooks/useGetPlayoffData'
import { useGetFirstAndLastSeason } from '../../../hooks/dataHooks/seasonHooks/useGetFirstAndLastSeason'

const Playoff = () => {
  const { women } = useGenderContext()
  const { seasonId } = useSeasonContext()
  const { lastSeason } = useGetFirstAndLastSeason()
  const [gameData, setGameData] = useState<GameObjectType[] | null>(null)
  const [showPopup, setShowPopup] = useState<boolean>(false)

  const { isLoading, error, isSuccess, tables, final, playoffGames } =
    useGetPlayoffData(seasonId)

  useScrollTo()

  if (error) return <DataError />

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
          setGameData={setGameData}
          setShowPopup={setShowPopup}
          women={women}
          seasonId={seasonId}
        />
      ) : null}
      {showPopup && (
        <PlayoffSeriesPopup
          gameData={gameData}
          setShowPopup={setShowPopup}
          showPopup={showPopup}
        />
      )}
    </div>
  )
}

export default Playoff
