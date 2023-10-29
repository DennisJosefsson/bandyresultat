import { useContext, useState } from 'react'
import { GenderContext } from '../../contexts/contexts'
import { ErrorBoundary } from 'react-error-boundary'
import { logError } from '../utilitycomponents/logError'
import Table from '../Table/Table'
import Record from '../Record/Record'
import ErrorFallback from '../utilitycomponents/ErrorFallback'
import {
  ListIcon,
  StatsIcon,
  ManIcon,
  WomanIcon,
} from '../utilitycomponents/icons'
import MaratonHelpModal from '../Table/MaratonHelp'

const Maraton = () => {
  const { women, dispatch } = useContext(GenderContext)
  const [tab, setTab] = useState('maraton')
  const [showHelpModal, setShowHelpModal] = useState(false)

  return (
    <div className="mx-auto mt-2 flex min-h-screen max-w-7xl flex-col font-inter text-[#011d29]">
      <div className="hidden items-center bg-slate-300 text-sm font-bold xs:mb-2 xs:flex xs:flex-row xs:justify-between xs:gap-1 md:gap-2 md:text-lg">
        <div
          className={`${
            tab === 'maraton' ? 'border-b-4 border-black' : null
          } cursor-pointer bg-slate-300 p-2 hover:border-b-4 hover:border-black hover:bg-slate-200`}
          onClick={() => setTab('maraton')}
        >
          Maratontabeller
        </div>
        <div
          className={`${
            tab === 'records' ? 'border-b-4 border-black' : null
          } cursor-pointer bg-slate-300 p-2 hover:border-b-4 hover:border-black hover:bg-slate-200`}
          onClick={() => setTab('records')}
        >
          Rekord
        </div>

        <div
          className="cursor-pointer bg-slate-300 p-2 hover:border-b-4 hover:border-black hover:bg-slate-200"
          onClick={() => dispatch({ type: 'TOGGLE' })}
        >
          {women ? 'Herrar' : 'Damer'}
        </div>
      </div>
      <div className="flex flex-row justify-between gap-1 bg-slate-300 text-sm font-bold xs:mb-2 xs:hidden md:gap-2 md:text-lg">
        <div
          className={`${
            tab === 'tables' ? 'border-b-4 border-black' : null
          } cursor-pointer bg-slate-300 p-2 hover:border-b-4 hover:border-black hover:bg-slate-200`}
          onClick={() => setTab('maraton')}
        >
          <ListIcon />
        </div>

        <div
          className={`${
            tab === 'records' ? 'border-b-4 border-black' : null
          } cursor-pointer bg-slate-300 p-2 hover:border-b-4 hover:border-black hover:bg-slate-200`}
          onClick={() => setTab('records')}
        >
          <StatsIcon />
        </div>

        <div
          className="cursor-pointer bg-slate-300 p-2 hover:border-b-4 hover:border-black hover:bg-slate-200"
          onClick={() => {
            dispatch({ type: 'TOGGLE' })
          }}
        >
          {women ? <ManIcon /> : <WomanIcon />}
        </div>
      </div>
      <div>
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onError={logError}
          resetKeys={[tab]}
        >
          {tab === 'maraton' && <Table />}
          {tab === 'records' && <Record />}
        </ErrorBoundary>
      </div>

      {showHelpModal ? (
        <>
          <MaratonHelpModal setShowModal={setShowHelpModal} />
        </>
      ) : null}
    </div>
  )
}

export default Maraton
