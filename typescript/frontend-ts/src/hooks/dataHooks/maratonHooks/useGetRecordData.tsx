import { Dispatch, SetStateAction, useEffect } from 'react'
import { useQuery } from 'react-query'
import { getStreaks } from '../../../requests/games'
import useGenderContext from '../../contextHooks/useGenderContext'

type ParamType = {
  record: string
  women: boolean
}

export const useGetRecordData = (
  params: ParamType,
  setParams: Dispatch<SetStateAction<ParamType>>,
) => {
  const { women } = useGenderContext()
  const { data, isLoading, error, isSuccess } = useQuery(
    ['streaks', params],
    () => getStreaks(params),
  )

  useEffect(() => {
    setParams((params) => ({ ...params, women: women }))
  }, [women])
  return { data, isLoading, error, isSuccess }
}
