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

const SingleSeason = ({ women, year }: { women: boolean; year: string }) => {
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
                  {season.teams.map((team) => {
                    return <div key={team.teamId}>{team.casualName}</div>
                  })}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Serier</CardTitle>
                </CardHeader>
                <CardContent>
                  {season.series.map((serie) => {
                    return <div key={serie.serieId}>{serie.serieName}</div>
                  })}
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
