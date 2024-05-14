import { useSuspenseQuery } from '@tanstack/react-query'
import { getSeasonGames } from '../../../../requests/games'
import useGenderContext from '../../../contextHooks/useGenderContext'
import { gameSortFunction } from '../../../../components/utilitycomponents/functions/sortFunction'

export const useSingleSeasonGames = (seasonId: number, teamFilter: string) => {
  const { women } = useGenderContext()
  const { data, isLoading, error } = useSuspenseQuery({
    queryKey: ['singleSeasonGames', seasonId],
    queryFn: () => getSeasonGames(seasonId),
  })

  const games = data
    .filter((table) => table.women === women)
    .filter(
      (game) =>
        game.homeTeam?.name.toLowerCase().includes(teamFilter.toLowerCase()) ||
        game.awayTeam?.name.toLowerCase().includes(teamFilter.toLowerCase()),
    )

  const playedGamesLength = games.filter((game) => game.played === true).length
  const unplayedGamesLength = games.filter((game) => !game.played).length

  const unsortedPlayedFinalGames = games
    .filter((game) => game.category === 'final')
    .filter((game) => game.played === true)
  const unsortedPlayedSemiGames = games
    .filter((game) => game.category === 'semi')
    .filter((game) => game.played === true)
  const unsortedPlayedQuarterGames = games
    .filter((game) => game.category === 'quarter')
    .filter((game) => game.played === true)
  const unsortedPlayedEightGames = games
    .filter((game) => game.category === 'eight')
    .filter((game) => game.played === true)
  const unsortedPlayedRegularGames = games
    .filter((game) => game.category === 'regular')
    .filter((game) => game.played === true)
  const unsortedPlayedQualificationGames = games
    .filter((game) => game.category === 'qualification')
    .filter((game) => game.played === true)
  const unsortedUnplayedFinalGames = games
    .filter((game) => game.category === 'final')
    .filter((game) => game.played === false)
  const unsortedUnplayedSemiGames = games
    .filter((game) => game.category === 'semi')
    .filter((game) => game.played === false)
  const unsortedUnplayedQuarterGames = games
    .filter((game) => game.category === 'quarter')
    .filter((game) => game.played === false)
  const unsortedUnplayedEightGames = games
    .filter((game) => game.category === 'eight')
    .filter((game) => game.played === false)
  const unsortedUnplayedRegularGames = games
    .filter((game) => game.category === 'regular')
    .filter((game) => game.played === false)
  const unsortedUnplayedQualificationGames = games
    .filter((game) => game.category === 'qualification')
    .filter((game) => game.played === false)

  const playedFinalGames = gameSortFunction(unsortedPlayedFinalGames, true)
  const playedSemiGames = gameSortFunction(unsortedPlayedSemiGames, true)
  const playedQuarterGames = gameSortFunction(unsortedPlayedQuarterGames, true)
  const playedEightGames = gameSortFunction(unsortedPlayedEightGames, true)
  const playedRegularGames = gameSortFunction(unsortedPlayedRegularGames, true)
  const playedQualificationGames = gameSortFunction(
    unsortedPlayedQualificationGames,
    true,
  )
  const unplayedFinalGames = gameSortFunction(unsortedUnplayedFinalGames)
  const unplayedSemiGames = gameSortFunction(unsortedUnplayedSemiGames)
  const unplayedQuarterGames = gameSortFunction(unsortedUnplayedQuarterGames)
  const unplayedEightGames = gameSortFunction(unsortedUnplayedEightGames)
  const unplayedRegularGames = gameSortFunction(unsortedUnplayedRegularGames)
  const unplayedQualificationGames = gameSortFunction(
    unsortedUnplayedQualificationGames,
  )

  return {
    playedFinalGames,
    playedSemiGames,
    playedQuarterGames,
    playedEightGames,
    playedRegularGames,
    playedQualificationGames,
    unplayedFinalGames,
    unplayedSemiGames,
    unplayedQuarterGames,
    unplayedEightGames,
    unplayedRegularGames,
    unplayedQualificationGames,
    playedGamesLength,
    unplayedGamesLength,
    isLoading,
    error,
  }
}
