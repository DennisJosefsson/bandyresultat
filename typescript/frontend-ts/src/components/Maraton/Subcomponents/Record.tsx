import { getStreaks } from '../../../requests/games'
import { useQuery } from 'react-query'
import { useRef, useState, useEffect } from 'react'

import RecordHeader from './RecordSubComponents/RecordHeader'

import PointsGoals from './RecordSubComponents/PointsGoals'
import GeneralStats from './RecordSubComponents/GeneralStats'
import Streaks from './RecordSubComponents/Streaks'
import LoadingOrError from '../../utilitycomponents/Components/LoadingOrError'
import ScrollRefComponent from '../../utilitycomponents/Components/ScrollRefComponent'

const Record = ({ women }: { women: boolean }) => {
  const [params, setParams] = useState<{ record: string; women: boolean }>({
    record: 'generalStats',
    women: women,
  })
  const [title, setTitle] = useState<string>('Statistik')

  const { data, isLoading, error, isSuccess } = useQuery(
    ['streaks', params],
    () => getStreaks(params),
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
      if (isSuccess) pageContent = <PointsGoals data={data} />
      break
    case 'generalStats':
      if (isSuccess) pageContent = <GeneralStats data={data} women={women} />
      break
    case 'streaks':
      if (isSuccess) pageContent = <Streaks data={data} />
      break
    default:
      pageContent = <div>Något är fel, tom sida.</div>
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
        />
        <div className="flex flex-col">{pageContent}</div>
      </div>
      <div ref={bottomRef}></div>
      <ScrollRefComponent bottomRef={bottomRef} topRef={topRef} />
    </div>
  )
}

export default Record
