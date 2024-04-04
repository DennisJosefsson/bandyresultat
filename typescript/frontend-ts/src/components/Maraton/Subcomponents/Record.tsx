import { useRef } from 'react'

import RecordHeader from './RecordSubComponents/RecordHeader'

import {
  Loading,
  DataError,
} from '../../utilitycomponents/Components/LoadingOrError'
import ScrollRefComponent from '../../utilitycomponents/Components/ScrollRefComponent'
import { useGetRecordData } from '../../../hooks/dataHooks/maratonHooks/useGetRecordData'
import RecordComponentSwitch from './RecordSubComponents/RecordComponentSwitch'

const Record = () => {
  const { isLoading, error } = useGetRecordData()
  const topRef = useRef(null)
  const bottomRef = useRef(null)

  if (error) return <DataError />

  if (isLoading) return <Loading />

  return (
    <div
      className="mx-auto mt-4 min-h-screen max-w-7xl font-inter text-foreground"
      ref={topRef}
    >
      <div className="flex flex-col">
        <RecordHeader />
        <div className="flex flex-col">
          <RecordComponentSwitch />
        </div>
      </div>
      <div ref={bottomRef}></div>
      <ScrollRefComponent bottomRef={bottomRef} topRef={topRef} />
    </div>
  )
}

export default Record
