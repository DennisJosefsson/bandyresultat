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
import { TeamAndSeasonAttributes } from '../types/teams/teams'
import useGetMetaData from '@/src/hooks/dataHooks/seasonHooks/metadataHooks/useGetMetadata'

type SingleSeasonProps = {
  women: boolean
  year: string
  setFormContent: Dispatch<SetStateAction<string | null>>
  setTab: Dispatch<SetStateAction<string>>
  setSerieData: Dispatch<SetStateAction<SerieAttributes | null>>
  setTeams: Dispatch<SetStateAction<TeamAndSeasonAttributes[] | null>>
}

const SingleSeason = ({
  women,
  year,
  setFormContent,
  setTab,
  setSerieData,
  setTeams,
}: SingleSeasonProps) => {
  const seasonId = parseInt(year.slice(-4))
  const { data, isLoading, error } = useGetSingleSeason(seasonId)
  const { data: metadata } = useGetMetaData(year)
  if (error) return <DataError error={error} />

  if (isLoading) return <Loading />

  const season = data?.find((season) => season.women === women)
  const metadataObject = metadata?.find(
    (item) => item.seasonId === season?.seasonId,
  )

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
            <div className="grid grid-cols-3 gap-2">
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
              <Card>
                <CardHeader>
                  <CardTitle>Metadata</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2 text-sm">
                    <div>
                      <p
                        className="cursor-pointer text-accent-foreground"
                        onClick={() => {
                          setTab('forms')
                          setTeams(season.teams)
                          setFormContent('metadata')
                        }}
                      >
                        Ändra metadata
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex flex-row items-center justify-between">
                        <div>Finalstad:</div>{' '}
                        <div>{metadataObject?.hostCity}</div>
                      </div>
                      <div className="flex flex-row items-center justify-between">
                        <div>Finaldatum:</div>{' '}
                        <div>{metadataObject?.finalDate}</div>
                      </div>
                      <div className="flex flex-row items-center justify-between">
                        <div>SM-Guld:</div>
                        <div> {metadataObject?.winnerName}</div>
                      </div>
                      <div className="flex flex-row items-center justify-between">
                        <div>Kommentar:</div>{' '}
                        <div>{metadataObject?.comment}</div>
                      </div>
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
