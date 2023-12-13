import { getStreaks } from '../../../requests/games'
import { useQuery } from 'react-query'
import { useContext, useRef, useState, useEffect } from 'react'
import { useSearchParams, useLocation } from 'react-router-dom'
import { GenderContext } from '../../../contexts/contexts'
import RecordHeader from './RecordSubComponents/RecordHeader'

import PointsGoals from './RecordSubComponents/PointsGoals'
import GeneralStats from './RecordSubComponents/GeneralStats'
import Streaks from './RecordSubComponents/Streaks'
import LoadingOrError from '../../utilitycomponents/Components/LoadingOrError'
import ScrollRefComponent from '../../utilitycomponents/Components/ScrollRefComponent'

const titles = {
  points: 'Poäng Elitserien',
  conceded: 'Insläppta mål Elitserien',
  scored: 'Gjorda mål Elitserien',
  general: 'Statistik',
  streaks: 'Rekordsviter',
}

const fields = ['points', 'conceded', 'scored', 'general', 'streaks']

const Record = () => {
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams(location.search)
  const record = searchParams.get('record')
  const { women } = useContext(GenderContext)
  const [params, setParams] = useState({
    record: record && fields.includes(record) ? record : 'general',
    women: women,
  })
  const [title, setTitle] = useState(
    record && fields.includes(record) ? titles[record] : 'Statistik',
  )

  const { data, isLoading, error } = useQuery(['streaks', params], () =>
    getStreaks(params),
  )
  const topRef = useRef(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    setParams((params) => ({ ...params, women: women }))
  }, [women])

  if (isLoading || error)
    return <LoadingOrError isLoading={isLoading} error={error} />

  let pageContent
  switch (params.record) {
    case 'points':
    case 'scored':
    case 'conceded':
      pageContent = <PointsGoals data={data} />
      break
    case 'general':
      pageContent = <GeneralStats data={data} women={women} />
      break
    case 'streaks':
      pageContent = <Streaks data={data} />
      break
    default:
      pageContent = <GeneralStats data={data} women={women} />
  }

  return (
    <div
      className="mx-auto mt-4 min-h-screen max-w-7xl font-inter text-[#011d29]"
      ref={topRef}
    >
      <div className="flex flex-col">
        <RecordHeader
          setParams={setParams}
          women={women}
          title={title}
          setTitle={setTitle}
          setSeachParams={setSearchParams}
          record={record}
        />
        <div className="flex flex-col">{pageContent}</div>
      </div>
      <div ref={bottomRef}></div>
      <ScrollRefComponent bottomRef={bottomRef} topRef={topRef} />
    </div>
  )
}

export default Record
