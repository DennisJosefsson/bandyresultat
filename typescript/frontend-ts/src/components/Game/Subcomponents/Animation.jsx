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
import GroupSelector from './GroupSelector'

const Animation = ({ seasonId }) => {
  const [group, setGroup] = useState()
  const [round, setRound] = useState(0)
  const { data, isLoading, error } = useQuery(
    ['singleSeasonGames', seasonId],
    () => getSeasonGames(seasonId),
  )

  const {
    data: season,
    isLoading: isSeasonLoading,
    error: seasonError,
  } = useQuery(['singleSeason', seasonId], () => getSingleSeason(seasonId))

  const { favTeams } = useContext(TeamPreferenceContext)
  const { women } = useContext(GenderContext)

  useEffect(() => {
    if (!isLoading && !error) {
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

  const seriesArray = season.find((season) => season.women === women)
    ? season.find((season) => season.women === women).series
    : []

  const teamArray = season.find((season) => season.women === women)
    ? season.find((season) => season.women === women).teams
    : []

  const unsortedRegularGames = data
    .filter((table) => table.women === women)
    .filter((game) => game.category === 'regular')

  const seriesInfo = season.find((season) => season.women === women)
    ? season.find((season) => season.women === women).series
    : []

  if (women && seasonId < 1973) {
    return (
      <div className="font-inter mx-auto mt-4 grid place-items-center py-5 text-sm font-bold text-[#011d29] md:text-base">
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
      <div className="font-inter mx-auto mt-4 grid place-items-center py-5 text-sm font-bold text-[#011d29] md:text-base">
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

  const groupName = seriesArray.find((serie) => serie.serieGroupCode === group)
    ? seriesArray.find((serie) => serie.serieGroupCode === group).serieName
    : ''

  const gamesArray = regularGames
    .filter((group) => group.group !== 'mix')
    .map((group) => {
      return {
        group: group.group,
        serieName: animationArray.find(
          (aniGroup) => aniGroup.group === group.group,
        ).serieName,
        dates: group.dates.map((date) => {
          return {
            date: date.date,
            games: [...date.games],
            table: animationArray
              .find((tableGroup) => tableGroup.group === group.group)
              .tables.find((tableDate) => tableDate.date === date.date).table,
          }
        }),
      }
    })

  const dateArray =
    gamesArray.filter((serieGroup) => serieGroup.group === group).length > 0
      ? gamesArray.filter((serieGroup) => serieGroup.group === group)[0].dates
      : []

  return (
    <div className="font-inter mx-auto flex flex-col pt-4 text-[#011d29]">
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
                seriesInfo={seriesInfo}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Animation
