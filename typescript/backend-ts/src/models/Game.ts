import { Optional } from 'sequelize'
import {
  Model,
  Column,
  Table,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
  HasMany,
  AutoIncrement,
  Default,
} from 'sequelize-typescript'
import Season from './Season.js'
import Team from './Team.js'
import TeamGame from './TeamGame.js'
import Serie from './Serie.js'

interface GameAttributes {
  gameId?: number
  seasonId: number
  serieId: number
  homeTeamId: number
  awayTeamId: number
  result: string
  halftimeResult: string
  homeGoal: number
  awayGoal: number
  halftimeHomeGoal: number
  halftimeAwayGoal: number
  date: Date
  round: number
  category: string
  group: string
  playoff: boolean
  extraTime: boolean
  penalties: boolean
  mix: boolean
  played: boolean
  women: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface GameInput extends Optional<GameAttributes, 'gameId'> {}
export interface GameOutput extends Required<GameAttributes> {}

@Table({
  underscored: true,
  timestamps: true,
  modelName: 'game',
})
class Game extends Model<GameAttributes, GameInput> {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare gameId?: number

  @ForeignKey(() => Season)
  @Column
  declare seasonId: number

  @ForeignKey(() => Serie)
  @Column
  declare serieId: number

  @ForeignKey(() => Team)
  @Column
  declare homeTeamId: number

  @ForeignKey(() => Team)
  @Column
  declare awayTeamId: number

  @Column
  declare result: string

  @Column
  declare halftimeResult: string

  @Column
  declare homeGoal: number

  @Column
  declare awayGoal: number

  @Column
  declare halftimeHomeGoal: number

  @Column
  declare halftimeAwayGoal: number

  @Column
  declare date: Date

  @Column
  declare round: number

  @Default('regular')
  @Column
  declare category: string

  @Default('elitserien')
  @Column
  declare group: string

  @Default(false)
  @Column
  declare playoff: boolean

  @Default(false)
  @Column
  declare extraTime: boolean

  @Default(false)
  @Column
  declare penalties: boolean

  @Default(false)
  @Column
  declare mix: boolean

  @Default(false)
  @Column
  declare played: boolean

  @Default(false)
  @Column
  declare women: boolean

  @Column
  declare createdAt?: Date

  @Column
  declare updatedAt?: Date

  @BelongsTo(() => Season, 'seasonId')
  declare season: ReturnType<() => Season>

  @HasMany(() => TeamGame)
  declare teamgames: TeamGame[]

  @BelongsTo(() => Serie, 'serieId')
  declare serie: ReturnType<() => Serie>

  @BelongsTo(() => Team, 'homeTeamId')
  declare homeTeam: ReturnType<() => Team>

  @BelongsTo(() => Team, 'awayTeamId')
  declare awayTeam: ReturnType<() => Team>
}

export default Game
