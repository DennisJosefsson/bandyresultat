import Spinner from '../utilitycomponents/Components/Spinner'

import AllData from './Subcomponents/AllData'
import DetailedData from './Subcomponents/DetailedData'
import CompareStats from './Subcomponents/CompareStats'
import CompareHeader from './Subcomponents/CompareHeader'
import { UseFormReturn } from 'react-hook-form'
import {
  useCompareLocationData,
  useCompareResults,
} from '@/src/hooks/dataHooks/teamHooks/useCompare'
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/src/@/components/ui/tabs'
import { Card, CardContent } from '@/src/@/components/ui/card'
import useScrollTo from '@/src/hooks/domHooks/useScrollTo'
import { CompareFormState } from '../types/teams/teams'
import { Dispatch, SetStateAction } from 'react'

type ErrorState =
  | {
      error: true
      message: string
    }
  | { error: false }

type CompareProps = {
  compObjectParams: CompareFormState | null
  setCompObjectParams: Dispatch<SetStateAction<CompareFormState | null>>
  customError: ErrorState
  setCustomError: Dispatch<SetStateAction<ErrorState>>
  methods: UseFormReturn<CompareFormState>
}

const Compare = ({
  methods,
  compObjectParams,
  setCompObjectParams,
  customError,
  setCustomError,
}: CompareProps) => {
  const {
    data,
    isLoading,
    error,
    isSuccess,

    compareLink,
  } = useCompareResults(compObjectParams)

  useScrollTo()

  useCompareLocationData(setCustomError, setCompObjectParams, methods)

  if (isLoading) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-foreground">
        <Spinner />
      </div>
    )
  }

  if (customError.error) {
    console.log('customError', customError.error)
    return <div>{customError.message}</div>
  }

  if (error instanceof Error && error) {
    if (error.message === 'nullObject') {
      return (
        <div className="mx-auto grid h-screen place-items-center font-inter text-foreground">
          <p className="mx-10 text-center">
            Någon sköt högt över mål, och alla bollar i bollkorgarna är borta.
            Det var nog inte meningen att det skulle länkas till denna sidan
            direkt, så tyvärr har vi ingen information till dig. Om du kom hit
            från en länk på bandyresultat.se, meddela gärna
            dennis@bandyresultat.se att det finns en bugg han behöver fixa.
          </p>
        </div>
      )
    }
    console.log('error from nullobject', error.message)
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-foreground">
        {error.message}
      </div>
    )
  }

  const compareData = isSuccess ? data : null

  return (
    <>
      {compareData && (
        <Card className="mt-2">
          <CompareHeader
            length={compareData.allData.length}
            seasonNames={compareData.seasonNames}
            link={compareLink}
            compObject={compObjectParams}
            compareAllGames={compareData.compareAllGames}
            origin={origin}
          />
          <CardContent>
            <Tabs defaultValue="tables">
              <TabsList>
                <TabsTrigger value="tables">Tabeller</TabsTrigger>
                <TabsTrigger value="games">Matcher</TabsTrigger>
                <TabsTrigger value="stats">Statistik</TabsTrigger>
              </TabsList>

              <TabsContent value="tables">
                <AllData
                  allData={compareData.allData}
                  sortedData={compareData.sortedData}
                  compObject={compObjectParams}
                />
                <DetailedData
                  categoryData={compareData.categoryData}
                  compObject={compObjectParams}
                />
              </TabsContent>

              <CompareStats
                compObject={compObjectParams}
                firstGames={compareData.firstGames}
                latestGames={compareData.latestGames}
                golds={compareData.golds}
                playoffs={compareData.playoffs}
                allPlayoffs={compareData.allPlayoffs}
                seasons={compareData.seasons}
                allSeasons={compareData.allSeasons}
              />
            </Tabs>
          </CardContent>
        </Card>
      )}
    </>
  )
}

export default Compare
