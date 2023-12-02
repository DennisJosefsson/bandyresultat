import { Optional } from 'sequelize'
import {
  Model,
  DataType,
  Column,
  Table,
  PrimaryKey,
  BelongsToMany,
  HasMany,
  AllowNull,
  Default,
} from 'sequelize-typescript'
import Season from './Season.js'
import TeamSeason from './TeamSeason.js'
import TeamGame from './TeamGame.js'
import Game from './Game.js'
import TeamTable from './TeamTable.js'

interface TeamAttributes {
  teamId?: number
  name: string
  city: string
  casualName: string
  shortName: string
  women?: boolean
  lat?: number
  long?: number
  createdAt?: Date
  updatedAt?: Date
}

export interface TeamInput extends Optional<TeamAttributes, 'teamId'> {}
export interface TeamOutput extends Required<TeamAttributes> {}

@Table({
  underscored: true,
  timestamps: true,
  modelName: 'team',
})
class Team extends Model<TeamAttributes, TeamInput> {
  @PrimaryKey
  @Column
  declare teamId?: number

  @AllowNull(false)
  @Column
  declare name: string

  @AllowNull(false)
  @Column
  declare city: string

  @Column
  declare casualName: string

  @Column
  declare shortName: string

  @Default(false)
  @Column
  declare women: boolean

  @Column(DataType.FLOAT)
  declare lat?: number

  @Column(DataType.FLOAT)
  declare long?: number

  @Column
  declare createdAt?: Date

  @Column
  declare updatedAt?: Date

  @BelongsToMany(() => Season, () => TeamSeason, 'teamId')
  declare seasonteam: Season[]

  @HasMany(() => Game, 'gameId')
  declare games: Game[]

  @HasMany(() => TeamGame, 'teamGameId')
  declare teamgames: TeamGame[]

  @HasMany(() => TeamTable, 'teamId')
  declare tabeller: TeamTable[]
}

export default Team
