import { GameObjectType } from '../../../types/games/games'
import PlayoffCard from './PlayoffCard'
import Date from '@/src/components/utilitycomponents/Components/Date'
type FinalCardProps = {
  game: GameObjectType
  favTeams: number[]
}

const FinalCard = ({ game }: FinalCardProps) => {
  return (
    <div className="grid max-h-[10rem] w-auto min-w-[33%] grid-cols-1 justify-center md:mx-auto">
      <PlayoffCard group="final">
        <PlayoffCard.Title>
          <PlayoffCard.Group>Final</PlayoffCard.Group>
          <PlayoffCard.Result>
            <Date>{game.date}</Date>
          </PlayoffCard.Result>
        </PlayoffCard.Title>
        <PlayoffCard.Content>
          <div className="flex flex-row justify-between text-xs md:text-sm lg:text-base">
            <div>
              <PlayoffCard.Team teamId={game.homeTeam.teamId}>
                {game.homeTeam.name}
              </PlayoffCard.Team>
              <span> - </span>
              <PlayoffCard.Team teamId={game.awayTeamId}>
                {game.awayTeam.name}
              </PlayoffCard.Team>
            </div>
            <div>
              <PlayoffCard.Result>{game.result}</PlayoffCard.Result>
            </div>
          </div>
        </PlayoffCard.Content>
      </PlayoffCard>
    </div>
  )
}

export default FinalCard
