import { useRef, useState } from 'react'

import RecordHeader from './RecordSubComponents/RecordHeader'

import {
  Loading,
  DataError,
} from '../../utilitycomponents/Components/LoadingOrError'
import ScrollRefComponent from '../../utilitycomponents/Components/ScrollRefComponent'
import useGenderContext from '../../../hooks/contextHooks/useGenderContext'
import { useGetRecordData } from '../../../hooks/dataHooks/maratonHooks/useGetRecordData'
import RecordComponentSwitch from './RecordSubComponents/RecordComponentSwitch'

const Record = () => {
  const { women } = useGenderContext()
  const [params, setParams] = useState<{ record: string; women: boolean }>({
    record: 'generalStats',
    women: women,
  })
  const [title, setTitle] = useState<string>('Statistik')

  const { data, isLoading, error } = useGetRecordData(params, setParams)
  const topRef = useRef(null)
  const bottomRef = useRef(null)

  if (error) return <DataError />

  if (isLoading) return <Loading />

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
          record={params.record}
        />
        <div className="flex flex-col">
          {data ? <RecordComponentSwitch data={data} params={params} /> : null}
        </div>
      </div>
      <div ref={bottomRef}></div>
      <ScrollRefComponent bottomRef={bottomRef} topRef={topRef} />
    </div>
  )
}

export default Record
