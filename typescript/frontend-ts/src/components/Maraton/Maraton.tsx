import { useState } from 'react'

import { ErrorBoundary } from 'react-error-boundary'
import { logError } from '../utilitycomponents/functions/logError.js'
import ErrorFallback from '../utilitycomponents/Components/ErrorFallback.js'

import MaratonTabBar from './Subcomponents/MaratonTabBar.js'
import MaratonComponentSwitch from './Subcomponents/MaratonComponentSwitch.js'

const Maraton = () => {
  const [tab, setTab] = useState<string>('maraton')

  return (
    <div className="mx-auto mt-2 flex min-h-screen max-w-7xl flex-col font-inter text-[#011d29]">
      <MaratonTabBar tab={tab} setTab={setTab} />
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
