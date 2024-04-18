import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
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
import useAnimationData from '../../../hooks/dataHooks/seasonHooks/animationHooks/useAnimationData.ts'
import { CarouselApi } from '@/src/@/components/ui/carousel.tsx'

const Animation = () => {
  const { seasonId } = useSeasonContext()
  const [group, setGroup] = useState<string | null>(null)
  const [round, setRound] = useState<number>(0)
  const [api, setApi] = useState<CarouselApi>()
  const [dateApi, setDateApi] = useState<CarouselApi>()

  const {
    isLoading,
    error,
    groupName,
    groupArray,
    seriesArray,
    dateArray,
    dateArrayLength,
    animationObject,
    justDatesArray,
  } = useAnimationData(seasonId, group, setGroup, setRound, api, dateApi)

  const { women } = useGenderContext()

  useEffect(() => {
    if (!api || !dateApi) return
    api.on('select', () => {
      setRound(api.selectedScrollSnap())

      dateApi.scrollTo(api.selectedScrollSnap())
    })
  }, [api])

  // useEffect(() => {
  //   if (!isLoading && !error && data !== undefined) {
  //     const object = data.find((item) => item.women === women)

  //     const groupArray = object ? object.games.map((item) => item.group) : []
  //     if (groupArray.length === 1) {
  //       setGroup(groupArray[0])
  //     }
  //   }
  //   setRound([0])
  // }, [data, isLoading, error, women, seasonId])

  if (error) return <DataError error={error} />

  if (isLoading) return <Loading />

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

  if (animationObject && animationObject.length === 0) {
    return (
      <div className="mx-auto mt-4 grid place-items-center py-5 font-inter text-sm font-bold text-foreground md:text-base">
        <p className="mx-10 text-center">
          Data över serieutvecklingen saknas för denna säsong.
        </p>
      </div>
    )
  }

  if (animationObject && animationObject.length > 0) {
    return (
      <div className="mx-auto flex flex-col pt-4 font-inter text-foreground">
        {animationObject.games.length > 1 && (
          <GroupSelector
            groupArray={groupArray}
            setRound={setRound}
            setGroup={setGroup}
            groupName={groupName}
            api={api}
            dateApi={dateApi}
          />
        )}

        {groupName !== '' && animationObject.games.length > 0 && (
          <div>
            <AnimationClicker
              arrayLength={dateArrayLength}
              groupName={groupName}
              setApi={setApi}
              api={api}
              setDateApi={setDateApi}
              justDatesArray={justDatesArray}
            />

            {dateArray ? (
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-8">
                <AnimationGamesList dateArray={dateArray} round={round} />
                <AnimationTable
                  dateArray={dateArray}
                  round={round}
                  seriesArray={seriesArray}
                  group={group}
                />
              </div>
            ) : null}
          </div>
        )}
      </div>
    )
  }
}

export default Animation
