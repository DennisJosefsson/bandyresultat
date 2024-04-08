import dayjs from 'dayjs'
import 'dayjs/locale/sv'
import { CompareResponseObjectType } from '../../../types/teams/compare'
import { CompareFormState } from '../../../types/teams/teams'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/src/@/components/ui/card'

dayjs.locale('sv')

type FirstGamesProps = {
  firstGames: CompareResponseObjectType['firstGames']
  compObject: CompareFormState
}

const FirstGames = ({ firstGames, compObject }: FirstGamesProps) => {
  const janFirstGames = compObject.women
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
                  {game.date && (
                    <span>{dayjs(game.date).format('D MMMM YYYY')}</span>
                  )}
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
