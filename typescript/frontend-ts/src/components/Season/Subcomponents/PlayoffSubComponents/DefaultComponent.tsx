import { Dispatch, SetStateAction } from 'react'
import { GameObjectType } from '../../../types/games/games'
import { groupConstant } from '../../../utilitycomponents/functions/constants'
import { TableObjectType } from '../../../types/tables/tables'
import PlayoffCard from './PlayoffCard'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/src/@/components/ui/popover'

type ColstartsType = {
  [key: string]: string
}

type GroupType = {
  group: string
  dates: {
    date: string
    games: GameObjectType[]
  }[]
}

type TableType = {
  group: string
  tables: TableObjectType[]
}

type DefaultComponentProps = {
  group: GroupType
  colStarts: ColstartsType
  setGameData: Dispatch<SetStateAction<GameObjectType[] | null>>
  setShowPopup: Dispatch<SetStateAction<boolean>>
  playoffGames: GameObjectType[]
  favTeams: number[]
  tables: TableType[]
}

const DefaultComponent = ({
  group,
  colStarts,
  playoffGames,
  tables,
}: DefaultComponentProps) => {
  const styleClass = colStarts
    ? `${colStarts[group.group]} cursor-pointer`
    : 'cursor-pointer md:col-start-4 md:odd:col-start-2'

  let resultString
  const tableObject = tables.find(
    (tableGroup) => tableGroup.group === group.group,
  )
  if (tables.length === 0) {
    resultString = '0-0'
  } else if (tableObject) {
    const actualTableObject = tableObject.tables.find(
      (team) => team.team === group.dates[0].games[0].homeTeamId,
    )
    if (!actualTableObject) {
      resultString = ''
      return
    }
    resultString = `${actualTableObject.totalWins}-${actualTableObject.totalLost}`
  } else {
    resultString = ''
  }

  return (
    <PlayoffCard styleClass={styleClass}>
      <PlayoffCard.Title>
        <PlayoffCard.Group>{groupConstant[group.group]}</PlayoffCard.Group>
        <PlayoffCard.Result>{resultString}</PlayoffCard.Result>
      </PlayoffCard.Title>
      <PlayoffCard.Content>
        {group.dates[0].games.map((game) => {
          return (
            <div key={`${game.date}-${Math.random()}`}>
              <PlayoffCard.Team teamId={game.homeTeamId}>
                {game.homeTeam.casualName}
              </PlayoffCard.Team>
              <span> - </span>
              <PlayoffCard.Team teamId={game.awayTeamId}>
                {game.awayTeam.casualName}
              </PlayoffCard.Team>
            </div>
          )
        })}
      </PlayoffCard.Content>
    </PlayoffCard>
  )
}

export default DefaultComponent
