import { Dispatch, SetStateAction } from 'react'
import useSeasonContext from '../../../hooks/contextHooks/useSeasonContext'
import { useSingleSeasonGames } from '../../../hooks/dataHooks/seasonHooks/gameHooks/useSingleSeasonGames'
import GamesList from './GamesList'

import { useGamesSeason } from '../../../hooks/dataHooks/seasonHooks/gameHooks/useGamesSeason'
import { useGamesSingleSeason } from '../../../hooks/dataHooks/seasonHooks/gameHooks/useGamesSingleSeason'

type UnplayedGamesProps = {
  teamFilter: string
  setShowAddGameModal: Dispatch<SetStateAction<boolean>>
}

const UnplayedGames = ({
  teamFilter,
  setShowAddGameModal,
}: UnplayedGamesProps) => {
  const { seasonId } = useSeasonContext()
  const {
    unplayedEightGames,
    unplayedQualificationGames,
    unplayedFinalGames,
    unplayedSemiGames,
    unplayedQuarterGames,
    unplayedRegularGames,
  } = useSingleSeasonGames(seasonId, teamFilter)

  const { seriesInfo } = useGamesSingleSeason(seasonId)

  const { startSeason, endSeason } = useGamesSeason()
  return (
    <div>
      <h1 className="text-[1rem] font-bold md:text-[1.25rem]">Kommande</h1>
      <div className="w-full px-2 xl:px-0">
        {unplayedFinalGames.length > 0 && (
          <GamesList
            gamesArray={unplayedFinalGames}
            title={'Final'}
            setShowModal={setShowAddGameModal}
            seriesInfo={seriesInfo}
            startSeason={startSeason}
            endSeason={endSeason}
          />
        )}
        {unplayedSemiGames.length > 0 && (
          <GamesList
            gamesArray={unplayedSemiGames}
            title={'Semifinaler'}
            setShowModal={setShowAddGameModal}
            seriesInfo={seriesInfo}
            startSeason={startSeason}
            endSeason={endSeason}
          />
        )}
        {unplayedQuarterGames.length > 0 && (
          <GamesList
            gamesArray={unplayedQuarterGames}
            title={'Kvartsfinaler'}
            setShowModal={setShowAddGameModal}
            seriesInfo={seriesInfo}
            startSeason={startSeason}
            endSeason={endSeason}
          />
        )}
        {unplayedEightGames.length > 0 && (
          <GamesList
            gamesArray={unplayedEightGames}
            title={'Åttondelsfinaler'}
            setShowModal={setShowAddGameModal}
            seriesInfo={seriesInfo}
            startSeason={startSeason}
            endSeason={endSeason}
          />
        )}
        {unplayedRegularGames.length > 0 && (
          <GamesList
            gamesArray={unplayedRegularGames}
            title={'Grundseriematcher'}
            setShowModal={setShowAddGameModal}
            seriesInfo={seriesInfo}
            startSeason={startSeason}
            endSeason={endSeason}
          />
        )}

        {unplayedQualificationGames.length > 0 && (
          <GamesList
            gamesArray={unplayedQualificationGames}
            title={'Kvalmatcher'}
            setShowModal={setShowAddGameModal}
            seriesInfo={seriesInfo}
            startSeason={startSeason}
            endSeason={endSeason}
          />
        )}
      </div>
    </div>
  )
}

export default UnplayedGames
