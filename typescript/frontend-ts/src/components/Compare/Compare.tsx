import { useEffect, useState } from 'react'

import Spinner from '../utilitycomponents/Components/Spinner'

import AllData from './Subcomponents/AllData'
import DetailedData from './Subcomponents/DetailedData'
import CompareStats from './Subcomponents/CompareStats'
import CompareHeader from './Subcomponents/CompareHeader'
import { compareFormState } from '../types/teams/teams'
import { useFormContext } from 'react-hook-form'
import { useCompareResults } from '@/src/hooks/dataHooks/teamHooks/useCompare'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/src/@/components/ui/tabs'
import { Card, CardContent } from '@/src/@/components/ui/card'

type ErrorState = { error: false } | { error: true; message: string }

const Compare = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [customError, setCustomError] = useState<ErrorState>({ error: false })
  const methods = useFormContext()
  const {
    data,
    isLoading,
    error,
    isSuccess,
    compObjectParams,
    setCompObjectParams,
  } = useCompareResults()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if (location.state) {
      const parsedFormData = compareFormState.safeParse(
        location.state.compObject,
      )
      if (!parsedFormData.success) {
        setCustomError({ error: true, message: parsedFormData.error.message })
        navigate(location.pathname, { replace: true })
      }
      if (parsedFormData.success) {
        setCompObjectParams(parsedFormData.data)
        navigate(location.pathname, { replace: true })
      }
    } else {
      const parsedFormData = compareFormState.safeParse(methods.getValues())
      if (!parsedFormData.success) {
        setCustomError({ error: true, message: parsedFormData.error.message })
      }
      if (parsedFormData.success) {
        setCompObjectParams(parsedFormData.data)
      }
    }
  }, [])

  if (isLoading) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-foreground">
        <Spinner />
      </div>
    )
  }

  if (customError.error) {
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
            link={compareData.link}
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
