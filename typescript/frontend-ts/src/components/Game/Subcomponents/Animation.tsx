import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getSeasonGames } from '../../../requests/games'
import { getSingleSeason } from '../../../requests/seasons'
import { useContext, useState, useEffect } from 'react'
import {
  TeamPreferenceContext,
  GenderContext,
} from '../../../contexts/contexts'
import {
  animationData,
  gameSortFunction,
} from '../../utilitycomponents/functions/sortFunction'
import LoadingOrError from '../../utilitycomponents/Components/LoadingOrError'

import AnimationClicker from './AnimationSubComponents/AnimationClicker'
import AnimationGamesList from './AnimationSubComponents/AnimationGamesList'
import AnimationTable from './AnimationSubComponents/AnimationTable'
import GroupSelector from './AnimationSubComponents/GroupSelector'

const Animation = ({ seasonId }: { seasonId: number }) => {
  const [group, setGroup] = useState<string | null>(null)
  const [round, setRound] = useState<number>(0)
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

  const teamPreferenceContext = useContext(TeamPreferenceContext)
  const genderContext = useContext(GenderContext)
  if (!teamPreferenceContext) {
    throw new Error('Missing team preference context')
  }
  if (!genderContext) {
    throw new Error('Missing gender context')
  }
  const { favTeams } = teamPreferenceContext
  const { women } = genderContext

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

  if (isLoading || isSeasonLoading || error || seasonError)
    return (
      <LoadingOrError
        isLoading={isLoading || isSeasonLoading}
        error={error || seasonError}
      />
    )

  const seasonData = isSeasonSuccess ? season : []

  const seasonObject = seasonData.find((season) => season.women === women)

  const seriesArray = seasonObject ? seasonObject.series : []

  const teamArray = seasonObject ? seasonObject.teams : []

  const unsortedRegularGames = isSuccess
    ? data
        .filter((table) => table.women === women)
        .filter((game) => game.category === 'regular')
    : []

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

  if (
    unsortedRegularGames.filter((game) => game.result !== null).length === 0
  ) {
    return (
      <div className="mx-auto mt-4 grid place-items-center py-5 font-inter text-sm font-bold text-[#011d29] md:text-base">
        <p className="mx-10 text-center">
          Data över serieutvecklingen saknas för denna säsong.
        </p>
      </div>
    )
  }

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

  return (
    <div className="mx-auto flex flex-col pt-4 font-inter text-[#011d29]">
      {gamesArray.length > 1 && (
        <GroupSelector
          gamesArray={gamesArray}
          setRound={setRound}
          setGroup={setGroup}
          groupName={groupName}
        />
      )}

      {groupName !== '' && gamesArray.length > 0 && (
        <div>
          <AnimationClicker
            round={round}
            setRound={setRound}
            dateArray={dateArray}
            groupName={groupName}
          />
          <div>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-8">
              <AnimationGamesList
                dateArray={dateArray}
                round={round}
                favTeams={favTeams}
              />
              <AnimationTable
                dateArray={dateArray}
                round={round}
                seriesArray={seriesArray}
                favTeams={favTeams}
                group={group}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Animation
