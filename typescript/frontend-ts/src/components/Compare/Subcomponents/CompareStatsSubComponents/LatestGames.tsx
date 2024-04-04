import dayjs from 'dayjs'
import 'dayjs/locale/sv'
import { CompareResponseObjectType } from '../../../types/teams/compare'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/@/components/ui/card'
dayjs.locale('sv')

type LatestGamesProps = {
  latestGames: CompareResponseObjectType['latestGames']
}

const LatestGames = ({ latestGames }: LatestGamesProps) => {
  return (
    <Card className="mt-2 w-full">
      <CardHeader>
        <CardTitle className="text-sm font-semibold md:text-base">
          Senaste matcherna
        </CardTitle>
      </CardHeader>
      <CardContent className="compareFirstLast mb-3 w-full text-[8px] sm:text-sm">
        <div>
          {latestGames.map((game) => {
            return (
              <div key={game.game_id} className="card">
                <div className="line1">
                  {game.date && (
                    <span>{dayjs(game.date).format('D MMMM YYYY')}:</span>
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
      </CardContent>
    </Card>
  )
}

export default LatestGames
