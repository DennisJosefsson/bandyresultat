import { useQuery } from 'react-query'
import { getSeasonGames } from '../../../../requests/games'
import { getSingleSeason } from '../../../../requests/seasons'
import useGenderContext from '../../../contextHooks/useGenderContext'
import {
  gameSortFunction,
  animationData,
} from '../../../../components/utilitycomponents/functions/sortFunction'
import { useEffect } from 'react'

export const useAnimationData = (
  seasonId: number,
  group: string | null,
  setGroup: React.Dispatch<React.SetStateAction<string | null>>,
  setRound: React.Dispatch<React.SetStateAction<number>>,
) => {
  const { women } = useGenderContext()
  const { data, isLoading, error, isSuccess } = useQuery(
    ['singleSeasonGames', seasonId],
    () => getSeasonGames(seasonId),
  )

  const {
    data: season,
    isLoading: isSeasonLoading,
    error: seasonError,
    isSuccess: isSeasonSuccess,
  } = useQuery(['singleSeason', seasonId], () => getSingleSeason(seasonId))

  useEffect(() => {
    if (isSuccess) {
      const unsortedRegularGames = data
        .filter((table) => table.women === women)
        .filter((game) => game.category === 'regular')

      const groupArray = [
        ...new Set(unsortedRegularGames.map((game) => game.group)),
      ]
      if (groupArray.length === 1) {
        setGroup(groupArray[0])
      }
    }
    setRound(0)
  }, [data, isLoading, error, women])

  useEffect(() => {
    setRound(0)
  }, [women, seasonId])

  const seasonData = isSeasonSuccess ? season : []

  const seasonObject = seasonData.find((season) => season.women === women)

  const seriesArray = seasonObject ? seasonObject.series : []

  const teamArray = seasonObject ? seasonObject.teams : []

  const unsortedRegularGames = isSuccess
    ? data
        .filter((table) => table.women === women)
        .filter((game) => game.category === 'regular')
    : []

  const gameLength = unsortedRegularGames.filter(
    (game) => game.result !== null,
  ).length

  const regularGames = gameSortFunction(
    unsortedRegularGames.filter((game) => game.result !== null),
  )

  const animationArray = animationData(
    regularGames,
    teamArray,
    seriesArray,
    seasonId,
  )

  const serieObject = seriesArray.find(
    (serie) => serie.serieGroupCode === group,
  )

  const groupName = serieObject ? serieObject.serieName : ''

  const gamesArray = regularGames
    .filter((group) => group.group !== 'mix')
    .map((group) => {
      const animationObject = animationArray.find(
        (aniGroup) => aniGroup.group === group.group,
      )
      if (
        !animationObject ||
        !animationObject.serieName ||
        !animationObject.tables
      ) {
        throw new Error('Missing data from Animation')
      }
      return {
        group: group.group,
        serieName: animationObject.serieName,
        dates: group.dates.map((date) => {
          const tableObject = animationObject.tables.find(
            (tableDate) => tableDate.date === date.date,
          )
          if (!tableObject || !tableObject.table) {
            throw new Error('Missing table data from Animation')
          }
          return {
            date: date.date,
            games: [...date.games],
            table: tableObject.table,
          }
        }),
      }
    })

  const dateArray =
    gamesArray.filter((serieGroup) => serieGroup.group === group).length > 0
      ? gamesArray.filter((serieGroup) => serieGroup.group === group)[0].dates
      : []

  return {
    isLoading,
    isSeasonLoading,
    isSuccess,
    isSeasonSuccess,
    error,
    seasonError,
    dateArray,
    gameLength,
    groupName,
    gamesArray,
    seriesArray,
  }
}
