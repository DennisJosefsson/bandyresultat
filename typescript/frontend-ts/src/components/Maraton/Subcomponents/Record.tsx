import RecordHeader from './RecordSubComponents/RecordHeader'

import {
  Loading,
  DataError,
} from '../../utilitycomponents/Components/LoadingOrError'

import { useGetRecordData } from '../../../hooks/dataHooks/maratonHooks/useGetRecordData'
import RecordComponentSwitch from './RecordSubComponents/RecordComponentSwitch'

const Record = () => {
  const { isLoading, error } = useGetRecordData()

  if (error) return <DataError error={error} />

  if (isLoading) return <Loading />

  return (
    <div className="mx-auto mt-4 min-h-screen max-w-7xl font-inter text-foreground">
      <div className="flex flex-col">
        <RecordHeader />
        <div className="flex flex-col">
          <RecordComponentSwitch />
        </div>
      </div>
    </div>
  )
}

export default Record
