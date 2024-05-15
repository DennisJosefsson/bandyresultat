import { CompareResponseObjectType } from '../../../types/teams/compare'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/@/components/ui/card'
import { CompareFormState } from '@/src/components/types/teams/teams'
type PlayoffProps = {
  playoffs: CompareResponseObjectType['playoffs']
  allPlayoffs: CompareResponseObjectType['allPlayoffs']
  searchObject: CompareFormState
}

const Playoffs = ({ playoffs, allPlayoffs, searchObject }: PlayoffProps) => {
  const women = searchObject['women']
  return (
    <>
      <Card className="mt-2 w-full">
        <CardHeader>
          <CardTitle className="text-xs md:text-sm">Slutspel</CardTitle>
        </CardHeader>
        <CardContent className="compareFirstLast w-full text-[8px] sm:text-sm">
          <div className="mb-2">
            {allPlayoffs.map((team) => {
              return (
                <div key={team.team} className="card">
                  <div className="line2">
                    <div>{team.casual_name}</div>
                    <div className="text-right">{team.playoffs}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
      {!women && (
        <>
          <Card className="mt-2 w-full">
            <CardHeader>
              <CardTitle className="text-xs md:text-sm">
                Slutspel sedan 1931
              </CardTitle>
            </CardHeader>
            <CardContent className="compareFirstLast w-full text-[8px] sm:text-sm">
              <div className="mb-2">
                {playoffs.map((team) => {
                  return (
                    <div key={team.team} className="card">
                      <div className="line2">
                        <div>{team.casual_name}</div>
                        <div className="text-right">{team.playoffs}</div>
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

export default Playoffs
