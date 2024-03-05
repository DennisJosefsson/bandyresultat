import { Link } from 'react-router-dom'
import { useState } from 'react'
import {
  Loading,
  DataError,
} from '../../utilitycomponents/Components/LoadingOrError'

import AnimationClicker from './AnimationSubComponents/AnimationClicker'
import AnimationGamesList from './AnimationSubComponents/AnimationGamesList'
import AnimationTable from './AnimationSubComponents/AnimationTable'
import GroupSelector from './AnimationSubComponents/GroupSelector'

import useGenderContext from '../../../hooks/contextHooks/useGenderContext'
import useSeasonContext from '../../../hooks/contextHooks/useSeasonContext'
import { useAnimationData } from '../../../hooks/dataHooks/seasonHooks/animationHooks/useAnimationData'

const Animation = () => {
  const { seasonId } = useSeasonContext()
  const [group, setGroup] = useState<string | null>(null)
  const [round, setRound] = useState<number>(0)

  const {
    isLoading,
    isSeasonLoading,
    error,
    seasonError,
    dateArray,
    gameLength,
    groupName,
    gamesArray,
    seriesArray,
  } = useAnimationData(seasonId, group, setGroup, setRound)

  const { women } = useGenderContext()

  if (error || seasonError) return <DataError />

  if (isLoading || isSeasonLoading) return <Loading />

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

  if (gameLength === 0) {
    return (
      <div className="mx-auto mt-4 grid place-items-center py-5 font-inter text-sm font-bold text-[#011d29] md:text-base">
        <p className="mx-10 text-center">
          Data över serieutvecklingen saknas för denna säsong.
        </p>
      </div>
    )
  }

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
            arrayLength={dateArray.length}
            groupName={groupName}
          />

          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-8">
            <AnimationGamesList dateArray={dateArray} round={round} />
            <AnimationTable
              dateArray={dateArray}
              round={round}
              seriesArray={seriesArray}
              group={group}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Animation
