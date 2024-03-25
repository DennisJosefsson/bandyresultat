import { useQuery } from 'react-query'
import { getAnimation } from '../../../../requests/games'
import { useEffect } from 'react'
import useGenderContext from '../../../contextHooks/useGenderContext'
import { SetStateAction, Dispatch } from 'react'

const useAnimationData = (
  seasonId: number,
  group: string | null,
  setGroup: Dispatch<SetStateAction<string | null>>,
  setRound: Dispatch<SetStateAction<number[]>>,
) => {
  const { women } = useGenderContext()
  const { data, isLoading, error, isSuccess } = useQuery(
    ['animationData', seasonId],
    () => getAnimation(seasonId),
  )

  useEffect(() => {
    if (!isLoading && !error && isSuccess) {
      const object = data.find((item) => item.women === women)

      const groupArray = object ? object.games.map((item) => item.group) : []
      if (groupArray.length === 1) {
        setGroup(groupArray[0])
      }
    }
    setRound([0])
  }, [data, isLoading, error, women, seasonId])

  // useEffect(() => {
  //   setRound([0])
  // }, [seasonId])

  const animationObject = isSuccess
    ? data.find((item) => item.women === women)
    : null

  const dateArray = animationObject
    ? animationObject.games.find((item) => item.group === group)?.dates
    : []

  const dateArrayLength = dateArray ? dateArray.length : 0

  const seriesArray = animationObject ? animationObject.series : []

  const groupArray = animationObject
    ? animationObject.games.map((item) => {
        return { group: item.group, serieName: item.serieName }
      })
    : []

  const groupName = animationObject
    ? animationObject.games.find((item) => item.group === group)?.serieName
    : ''

  return {
    data,
    animationObject,
    dateArray,
    dateArrayLength,
    groupName,
    groupArray,
    seriesArray,
    isLoading,
    isSuccess,
    error,
  }
}

export default useAnimationData
