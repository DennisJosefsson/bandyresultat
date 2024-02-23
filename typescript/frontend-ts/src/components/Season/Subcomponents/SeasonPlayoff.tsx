import { useQuery } from 'react-query'
import { getSingleSeasonTable } from '../../../requests/tables'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import PlayoffSeriesPopup from './PlayoffSubComponents/PlayoffSeriesPopup'
import LoadingOrError from '../../utilitycomponents/Components/LoadingOrError'
import SeasonPlayoffTables from './PlayoffSubComponents/SeasonPlayoffTables'
import useGenderContext from '../../../hooks/contextHooks/useGenderContext'
import { GameObjectType } from '../../types/games/games'

const Playoff = ({ seasonId }: { seasonId: number }) => {
  const { women } = useGenderContext()

  const [gameData, setGameData] = useState<GameObjectType[] | null>(null)
  const [showPopup, setShowPopup] = useState<boolean>(false)

  const { data, isLoading, error, isSuccess } = useQuery(
    ['singleSeasonTable', seasonId],
    () => getSingleSeasonTable(seasonId),
  )

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  if (isLoading || error)
    return <LoadingOrError isLoading={isLoading} error={error} />

  if (!isSuccess) return null

  const tables = data.tabell.filter((table) => table.women === women)
  const playoffGames = data.playoffGames.filter(
    (table) => table.women === women,
  )
  const final = playoffGames.filter((games) => games.category === 'final')

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

  return (
    <div>
      {seasonId < 2025 && (
        <SeasonPlayoffTables
          tables={tables}
          playoffGames={playoffGames}
          final={final}
          setGameData={setGameData}
          setShowPopup={setShowPopup}
          women={women}
          seasonId={seasonId}
        />
      )}
      {showPopup && (
        <PlayoffSeriesPopup gameData={gameData} setShowPopup={setShowPopup} />
      )}
    </div>
  )
}

export default Playoff
