import { CompareResponseObjectType } from '../../../types/teams/compare'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/src/@/components/ui/card'
import Date from '@/src/components/utilitycomponents/Components/Date'
import { CompareFormState } from '@/src/components/types/teams/teams'

type FirstGamesProps = {
  firstGames: CompareResponseObjectType['firstGames']
  searchObject: CompareFormState
}

const FirstGames = ({ firstGames, searchObject }: FirstGamesProps) => {
  const janFirstGames = searchObject['women']
    ? 'Speldatum 1 januari från säsongerna 1988/1989 och 1989/1990 gäller enbart tillsvidare, de betyder att faktiskt datum saknas.'
    : 'Obs! Speldatum 1 januari före 1931 gäller enbart tillsvidare, de betyder att faktiskt datum saknas.'

  return (
    <Card className="mt-2 w-full">
      <CardHeader>
        <CardTitle className="text-xs md:text-sm">Första matcherna</CardTitle>
      </CardHeader>
      <CardContent className="compareFirstLast w-full text-[8px] sm:text-sm">
        <div className="mb-2">
          {firstGames.map((game) => {
            return (
              <div key={game.game_id} className="card">
                <div className="line1">
                  <Date>{game.date}</Date>
                </div>
                <div className="line2">
                  <div>
                    {game.home_name}-{game.away_name}
                  </div>
                  <div className="result">{game.result}</div>
                </div>
              </div>
            )
          })}
        </div>
        <CardFooter>{janFirstGames}</CardFooter>
      </CardContent>
    </Card>
  )
}

export default FirstGames
