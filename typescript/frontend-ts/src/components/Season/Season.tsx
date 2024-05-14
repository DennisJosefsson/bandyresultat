import { useParams, useSearchParams } from 'react-router-dom'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { logError } from '../utilitycomponents/functions/logError.js'

import ErrorFallback from '../utilitycomponents/Components/LoadingAndError/ErrorFallback'
import SeasonHeader from './Subcomponents/SeasonHeader.jsx'
import SeasonContextProvider from '../../contexts/seasonContext.js'
import useGenderContext from '../../hooks/contextHooks/useGenderContext.js'
import { useGetFirstAndLastSeason } from '@/src/hooks/dataHooks/seasonHooks/useGetFirstAndLastSeason.js'
import { inputSeasonId } from '../types/season/seasonId.js'
import SeasonComponentSwitch from './Subcomponents/SeasonComponentSwitch.js'
import SeasonTabBar from './Subcomponents/SeasonTabBar.js'
import { Card, CardContent } from '@/src/@/components/ui/card.js'
import { Loading } from '../utilitycomponents/Components/LoadingAndError/LoadingOrError'

const Season = () => {
  const unparsedSeasonId = useParams().seasonId

  const [searchParams, setSearchParams] = useSearchParams(location.search)
  const tab = searchParams.get('tab')
  const { lastSeason } = useGetFirstAndLastSeason()
  const { women } = useGenderContext()

  if (!unparsedSeasonId) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-foreground">
        Kolla länken, måste ange säsongsId.
      </div>
    )
  }
  const parsedSeasonId = inputSeasonId.safeParse(unparsedSeasonId)
  if (!parsedSeasonId.success || parsedSeasonId.data > lastSeason) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-foreground">
        Kolla länken, angivna årtalet är felaktigt.
      </div>
    )
  }

  const seasonId = parsedSeasonId.data

  return (
    <div className="mx-auto mt-2 flex min-h-screen flex-col px-2 font-inter text-foreground">
      <Card className="mb-2">
        <CardContent className="mt-2 max-w-full">
          <SeasonHeader seasonId={seasonId} women={women} tab={tab} />
          <SeasonTabBar tab={tab} setSearchParams={setSearchParams} />
        </CardContent>
      </Card>
      <Card>
        <CardContent className="mt-2">
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onError={logError}
            resetKeys={[tab]}
          >
            <SeasonContextProvider seasonId={seasonId}>
              <Suspense fallback={<Loading />}>
                <SeasonComponentSwitch tab={tab} />
              </Suspense>
            </SeasonContextProvider>
          </ErrorBoundary>
        </CardContent>
      </Card>
    </div>
  )
}

export default Season
