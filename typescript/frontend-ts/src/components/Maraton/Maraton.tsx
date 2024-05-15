import { ErrorBoundary } from 'react-error-boundary'
import { logError } from '../utilitycomponents/functions/logError.js'
import ErrorFallback from '../utilitycomponents/Components/LoadingAndError/ErrorFallback.js'

import MaratonTabBar from './Subcomponents/MaratonTabBar.js'
import MaratonComponentSwitch from './Subcomponents/MaratonComponentSwitch.js'
import { useSearch } from '@tanstack/react-router'
import { Card, CardContent } from '@/src/@/components/ui/card.js'

const Maraton = () => {
  const { tab } = useSearch({ from: '/maraton' })

  return (
    <div className="mx-auto mt-2 flex min-h-screen flex-col px-2 font-inter text-foreground">
      <Card className="mb-2 items-center">
        <CardContent className="p-2 pt-2 md:p-6 md:pt-6">
          <MaratonTabBar />
        </CardContent>
      </Card>
      <Card>
        <CardContent className="mt-2">
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onError={logError}
            resetKeys={[tab]}
          >
            <MaratonComponentSwitch tab={tab} />
          </ErrorBoundary>
        </CardContent>
      </Card>
    </div>
  )
}

export default Maraton
