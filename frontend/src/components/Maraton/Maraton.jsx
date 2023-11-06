import { useContext, useState } from 'react'
import { GenderContext } from '../../contexts/contexts'
import { ErrorBoundary } from 'react-error-boundary'
import { logError } from '../utilitycomponents/functions/logError'
import Table from './Subcomponents/Table'
import Record from './Subcomponents/Record'
import ErrorFallback from '../utilitycomponents/Components/ErrorFallback'
import {
  ListIcon,
  StatsIcon,
  ManIcon,
  WomanIcon,
  QuestionIcon,
} from '../utilitycomponents/Components/icons'
import MaratonHelp from './Subcomponents/MaratonHelp'

const Maraton = () => {
  const { women, dispatch } = useContext(GenderContext)
  const [tab, setTab] = useState('maraton')

  return (
    <div className="mx-auto mt-2 flex min-h-screen max-w-7xl flex-col font-inter text-[#011d29]">
      <div className="hidden items-center bg-slate-300 text-sm font-bold xs:mb-2 xs:flex xs:flex-row xs:justify-between xs:gap-1 md:gap-2 md:text-lg">
        <div className="flex flex-row justify-start xs:gap-1 md:gap-2">
          <div
            className={`${
              tab === 'maraton'
                ? 'border-b-4 border-black'
                : 'border-b-4 border-slate-300'
            } cursor-pointer bg-slate-300 p-2 duration-300 ease-in-out hover:border-b-4 hover:border-black hover:bg-slate-200 hover:transition-colors`}
            onClick={() => setTab('maraton')}
          >
            Maratontabeller
          </div>
          <div
            className={`${
              tab === 'records'
                ? 'border-b-4 border-black'
                : 'border-b-4 border-slate-300'
            } cursor-pointer bg-slate-300 p-2 duration-300 ease-in-out hover:border-b-4 hover:border-black hover:bg-slate-200 hover:transition-colors`}
            onClick={() => setTab('records')}
          >
            Rekord
          </div>
        </div>
        <div className="flex flex-row justify-end xs:gap-1 md:gap-2">
          <div
            className={`${
              tab === 'help'
                ? 'border-b-4 border-black'
                : 'border-b-4 border-slate-300'
            } cursor-pointer bg-slate-300 p-2 duration-300 ease-in-out hover:border-b-4 hover:border-black hover:bg-slate-200 hover:transition-colors`}
            onClick={() => setTab('help')}
          >
            Hjälp/Info
          </div>
          <div
            className="cursor-pointer bg-slate-300 p-2 duration-300 ease-in-out hover:border-b-4 hover:border-black hover:bg-slate-200 hover:transition-colors"
            onClick={() => dispatch({ type: 'TOGGLE' })}
          >
            {women ? 'Herrar' : 'Damer'}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between gap-1 bg-slate-300 text-sm font-bold xs:mb-2 xs:hidden md:gap-2 md:text-lg">
        <div className="flex flex-row justify-start xs:gap-1 md:gap-2">
          <div
            className={`${
              tab === 'tables'
                ? 'border-b-4 border-black'
                : 'border-b-4 border-slate-300'
            } cursor-pointer bg-slate-300 p-2 hover:border-b-4 hover:border-black hover:bg-slate-200`}
            onClick={() => setTab('maraton')}
          >
            <ListIcon />
          </div>
          <div
            className={`${
              tab === 'records'
                ? 'border-b-4 border-black'
                : 'border-b-4 border-slate-300'
            } cursor-pointer bg-slate-300 p-2 hover:border-b-4 hover:border-black hover:bg-slate-200`}
            onClick={() => setTab('records')}
          >
            <StatsIcon />
          </div>
        </div>

        <div className="flex flex-row justify-end xs:gap-1 md:gap-2">
          <div
            className={`${
              tab === 'help'
                ? 'border-b-4 border-black'
                : 'border-b-4 border-slate-300'
            } cursor-pointer bg-slate-300 p-2 hover:border-b-4 hover:border-black hover:bg-slate-200`}
            onClick={() => setTab('help')}
          >
            <QuestionIcon />
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
      </div>
      <div className="mt-2">
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onError={logError}
          resetKeys={[tab]}
        >
          {tab === 'maraton' && <Table />}
          {tab === 'records' && <Record />}
          {tab === 'help' && <MaratonHelp />}
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default Maraton
