import { Optional } from 'sequelize'
import {
  Model,
  Column,
  Table,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
  Default,
} from 'sequelize-typescript'
import Season from './Season.js'
import Team from './Team.js'
import Game from './Game.js'
import Serie from './Serie.js'

interface TeamGameAttributes {
  teamGameId?: number
  gameId: number
  seasonId: number
  serieId: number
  team: number
  opponent: number
  goalsScored?: number
  goalsConceded?: number
  totalGoals?: number
  goalDifference?: number
  points?: number
  date: Date | string
  category: string
  group: string
  playoff?: boolean
  mix?: boolean
  played?: boolean
  women?: boolean
  win?: boolean
  draw?: boolean
  lost?: boolean
  qualificationGame?: boolean
  homeGame?: boolean
  currInoffChamp?: boolean
}

export interface TeamGameInput
  extends Optional<TeamGameAttributes, 'teamGameId'> {}
export interface GTeamameOutput extends Required<TeamGameAttributes> {}

@Table({
  underscored: true,
  timestamps: false,
  modelName: 'teamgame',
})
class TeamGame extends Model<TeamGameAttributes, TeamGameInput> {
  @PrimaryKey
  @Column
  declare teamGameId?: number

  @ForeignKey(() => Game)
  @Column
  declare gameId: number

  @ForeignKey(() => Season)
  @Column
  declare seasonId: number

  @Column
  declare serieId: number

  @ForeignKey(() => Team)
  @Column
  declare team: number

  @ForeignKey(() => Team)
  @Column
  declare opponent: number

  @Column
  declare goalsScored: number

  @Column
  declare goalsConceded: number

  @Column
  declare goalDifference: number

  @Column
  declare points: number

  @Column
  declare totalGoals: number

  @Column
  declare date: Date

  @Column
  declare category: string

  @Column
  declare group: string

  @Default(false)
  @Column
  declare playoff: boolean

  @Default(false)
  @Column
  declare mix: boolean

  @Default(false)
  @Column
  declare played: boolean

  @Default(false)
  @Column
  declare women: boolean

  @Default(false)
  @Column
  declare win: boolean

  @Default(false)
  @Column
  declare lost: boolean

  @Default(false)
  @Column
  declare draw: boolean

  @Column
  declare qualificationGame: boolean

  @Default(false)
  @Column
  declare homeGame: boolean

  @Default(false)
  @Column
  declare currInoffChamp: boolean

  @BelongsTo(() => Season, 'seasonId')
  declare season: ReturnType<() => Season>

  @BelongsTo(() => Game, 'gameId')
  declare game: ReturnType<() => Game>

  @BelongsTo(() => Serie, 'serieId')
  declare serie: ReturnType<() => Serie>

  @BelongsTo(() => Team, 'team')
  declare lag: ReturnType<() => Team>

  @BelongsTo(() => Team, 'opponent')
  declare opp: ReturnType<() => Team>
}

export default TeamGame
