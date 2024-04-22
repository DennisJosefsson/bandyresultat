import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getStreaks } from '../../../requests/games'
import { useSearchParams } from 'react-router-dom'
import useGenderContext from '../../contextHooks/useGenderContext'

type Title = {
  [key: string]: string
}

const titles: Title = {
  points: 'Poäng Elitserien',
  conceded: 'Insläppta mål Elitserien',
  scored: 'Gjorda mål Elitserien',
  generalStats: 'Statistik',
  streaks: 'Rekordsviter',
}

const fields = ['points', 'conceded', 'scored', 'generalStats', 'streaks']

export const useGetRecordData = () => {
  const [searchParams, setSearchParams] = useSearchParams(location.search)
  const record = searchParams.get('record')
  const { women } = useGenderContext()
  const [params, setParams] = useState({
    record: record && fields.includes(record) ? record : 'generalStats',
    women: women,
  })
  const [title, setTitle] = useState<string>(
    record && fields.includes(record) ? titles[record] : 'Statistik',
  )
  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ['streaks', params],
    queryFn: () => getStreaks(params),
  })

  useEffect(() => {
    setParams((params) => ({ ...params, women: women }))
  }, [women])
  return {
    data,
    title,
    params,
    record,
    setParams,
    setTitle,
    setSearchParams,
    isLoading,
    error,
    isSuccess,
  }
}
