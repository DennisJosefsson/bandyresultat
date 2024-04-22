import { useGetSingleSeason } from '@/src/hooks/dataHooks/seasonHooks/useGetSingleSeason'
import {
  DataError,
  Loading,
} from '../utilitycomponents/Components/LoadingOrError'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/@/components/ui/card'
import { Dispatch, SetStateAction } from 'react'
import { SerieAttributes } from '../types/series/series'

type SingleSeasonProps = {
  women: boolean
  year: string
  setFormContent: Dispatch<SetStateAction<string | null>>
  setTab: Dispatch<SetStateAction<string>>
  setSerieData: Dispatch<SetStateAction<SerieAttributes | null>>
}

const SingleSeason = ({
  women,
  year,
  setFormContent,
  setTab,
  setSerieData,
}: SingleSeasonProps) => {
  const seasonId = parseInt(year.slice(-4))
  const { data, isLoading, error } = useGetSingleSeason(seasonId)

  if (error) return <DataError error={error} />

  if (isLoading) return <Loading />

  const season = data?.find((season) => season.women === women)

  return (
    <>
      {season ? (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>
              {`${season.year} - ${season.women ? 'Damer' : 'Herrar'}`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <Card>
                <CardHeader>
                  <CardTitle>Lag</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2 text-sm">
                    <div>
                      <p
                        className="cursor-pointer text-accent-foreground"
                        onClick={() => {
                          setTab('forms')
                          setFormContent('teamseason')
                        }}
                      >
                        Lägg till lag
                      </p>
                    </div>
                    <div>
                      {season.teams.map((team) => {
                        return <div key={team.teamId}>{team.casualName}</div>
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Serier</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2 text-sm">
                    <div>
                      <p
                        className="cursor-pointer text-accent-foreground"
                        onClick={() => {
                          setTab('forms')
                          setFormContent('series')
                        }}
                      >
                        Lägg till serie
                      </p>
                    </div>
                    <div>
                      {season.series.map((serie) => {
                        return (
                          <div
                            key={serie.serieId}
                            className="flex w-60 flex-row justify-between"
                          >
                            <div>{serie.serieName}</div>
                            <div
                              className="cursor-pointer"
                              onClick={() => {
                                setSerieData(serie)
                                setTab('forms')
                                setFormContent('series')
                              }}
                            >
                              Ändra
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </>
  )
}

export default SingleSeason
