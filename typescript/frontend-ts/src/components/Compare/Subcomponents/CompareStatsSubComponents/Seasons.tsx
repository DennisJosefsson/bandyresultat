import { CompareResponseObjectType } from '../../../types/teams/compare'
import { CompareFormState } from '../../../types/teams/teams'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/@/components/ui/card'
type SeasonProps = {
  seasons: CompareResponseObjectType['seasons']
  allSeasons: CompareResponseObjectType['allSeasons']
  compObject: CompareFormState
}

const Seasons = ({ seasons, allSeasons, compObject }: SeasonProps) => {
  return (
    <>
      <Card className="mt-2 w-full">
        <CardHeader>
          <CardTitle className="text-xs md:text-sm">Slutspel</CardTitle>
        </CardHeader>
        <CardContent className="compareFirstLast w-full text-[8px] sm:text-sm">
          <div className="mb-2">
            {allSeasons.map((team) => {
              return (
                <div key={team.team} className="card">
                  <div className="line2">
                    <div>{team.casual_name}</div>
                    <div className="text-right">{team.seasons}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
      {!compObject.women && (
        <>
          <Card className="mt-2 w-full">
            <CardHeader>
              <CardTitle className="text-xs md:text-sm">
                Slutspel sedan 1931
              </CardTitle>
            </CardHeader>
            <CardContent className="compareFirstLast w-full text-[8px] sm:text-sm">
              <div className="mb-2">
                {seasons.map((team) => {
                  return (
                    <div key={team.team} className="card">
                      <div className="line2">
                        <div>{team.casual_name}</div>
                        <div className="text-right">{team.seasons}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </>
  )
}

export default Seasons
