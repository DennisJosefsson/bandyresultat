import { useParams, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { ErrorBoundary } from 'react-error-boundary'
import { logError } from '../utilitycomponents/functions/logError.js'

import ErrorFallback from '../utilitycomponents/Components/ErrorFallback.js'
import SeasonHeader from './Subcomponents/SeasonHeader.jsx'
import SeasonContextProvider from '../../contexts/seasonContext.js'
import useGenderContext from '../../hooks/contextHooks/useGenderContext.js'
import { useGetFirstAndLastSeason } from '../../hooks/dataHooks/seasonHooks/useGetFirstAndLastSeason.js'
import { inputSeasonId } from '../types/season/seasonId.js'
import SeasonComponentSwitch from './Subcomponents/SeasonComponentSwitch.js'
import SeasonTabBar from './Subcomponents/SeasonTabBar.js'

const Season = () => {
  const unparsedSeasonId = useParams().seasonId

  const { lastSeason } = useGetFirstAndLastSeason()
  const { women } = useGenderContext()
  const [tab, setTab] = useState('tables')

  const { state } = useLocation()

  useEffect(() => {
    if (state && state.tab === 'games') {
      setTab('games')
    }
  }, [state])

  if (!unparsedSeasonId) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
        Kolla länken, måste ange säsongsId.
      </div>
    )
  }
  const parsedSeasonId = inputSeasonId.safeParse(unparsedSeasonId)
  if (!parsedSeasonId.success || parsedSeasonId.data > lastSeason) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
        Kolla länken, angivna årtalet är felaktigt.
      </div>
    )
  }

  const seasonId = parsedSeasonId.data

  return (
    <div className="mx-auto mt-2 flex min-h-screen max-w-7xl flex-col font-inter text-[#011d29]">
      <SeasonHeader seasonId={seasonId} women={women} />

      <SeasonTabBar tab={tab} setTab={setTab} />
      <div>
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onError={logError}
          resetKeys={[tab]}
        >
          <SeasonContextProvider seasonId={seasonId}>
            <SeasonComponentSwitch tab={tab} />
          </SeasonContextProvider>
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default Season
