import AllData from './Subcomponents/AllData'
import DetailedData from './Subcomponents/DetailedData'
import CompareStats from './Subcomponents/CompareStats'
import CompareHeader from './Subcomponents/CompareHeader'
import { UseFormReturn } from 'react-hook-form'
import { useCompareLocationData } from '@/src/hooks/dataHooks/teamHooks/useCompare'
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
import { UseMutationResult } from '@tanstack/react-query'

import { CompareResponseObjectType } from '../types/teams/compare'

type ErrorState =
  | {
      error: true
      message: string
    }
  | { error: false }

type CompareProps = {
  mutation: UseMutationResult<
    CompareResponseObjectType,
    Error,
    CompareFormState,
    unknown
  >
  customError: ErrorState
  setCustomError: Dispatch<SetStateAction<ErrorState>>
  methods: UseFormReturn<CompareFormState>
  compareLink: string
}

const Compare = ({
  methods,
  mutation,
  customError,
  setCustomError,
  compareLink,
}: CompareProps) => {
  useScrollTo()

  useCompareLocationData(setCustomError, mutation, methods)

  const error = mutation.error

  if (customError.error) {
    const errorArray = JSON.parse(customError.message)

    if (Array.isArray(errorArray)) {
      const errorString =
        errorArray.map((error) => error.message).join(', ') + '.'

      return <div>{errorString}</div>
    }
    return <div>{customError.message}</div>
  }

  if (error instanceof Error) {
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

    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-foreground">
        {error.message}
      </div>
    )
  }

  const compareData = mutation.data ? mutation.data : null

  return (
    <>
      {compareData && (
        <Card className="mt-2">
          <CompareHeader
            length={compareData.allData.length}
            seasonNames={compareData.seasonNames}
            link={compareLink}
            compObject={methods.getValues()}
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
                />
                <DetailedData categoryData={compareData.categoryData} />
              </TabsContent>

              <CompareStats
                compObject={methods.formState}
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
