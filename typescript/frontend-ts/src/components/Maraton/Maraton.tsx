import { ErrorBoundary } from 'react-error-boundary'
import { logError } from '../utilitycomponents/functions/logError.js'
import ErrorFallback from '../utilitycomponents/Components/ErrorFallback.js'

import MaratonTabBar from './Subcomponents/MaratonTabBar.js'
import MaratonComponentSwitch from './Subcomponents/MaratonComponentSwitch.js'
import { useSearchParams } from 'react-router-dom'

const Maraton = () => {
  const [searchParams, setSearchParams] = useSearchParams(location.search)
  const tab = searchParams.get('tab')

  return (
    <div className="mx-auto mt-2 flex min-h-screen max-w-7xl flex-col font-inter text-foreground">
      <MaratonTabBar tab={tab} setSearchParams={setSearchParams} />
      <div className="mt-2">
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onError={logError}
          resetKeys={[tab]}
        >
          <MaratonComponentSwitch tab={tab} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default Maraton
