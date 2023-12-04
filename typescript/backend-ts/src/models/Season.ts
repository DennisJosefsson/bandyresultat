import { Optional } from 'sequelize'
import {
  Model,
  Column,
  Table,
  PrimaryKey,
  BelongsToMany,
  HasOne,
  HasMany,
  AllowNull,
  Default,
} from 'sequelize-typescript'
import Team from './Team.js'
import TeamSeason from './TeamSeason.js'
import Metadata from './Metadata.js'
import Serie from './Serie.js'
import Game from './Game.js'
import TeamGame from './TeamGame.js'
import TeamTable from './TeamTable.js'
import TableSeason from './TableSeason.js'

interface SeasonAttributes {
  seasonId?: number
  year: string
  women: boolean
  seasonStructure?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface SeasonInput extends Optional<SeasonAttributes, 'seasonId'> {}
export interface SeasonOutput extends Required<SeasonAttributes> {}

@Table({
  underscored: true,
  timestamps: true,
  modelName: 'season',
})
class Season extends Model<SeasonAttributes, SeasonInput> {
  @PrimaryKey
  @Column
  declare seasonId: number

  @AllowNull(false)
  @Column
  declare year: string

  @Default(false)
  @Column
  declare women: boolean

  @Column
  declare seasonStructure?: string

  @Column
  declare createdAt?: Date

  @Column
  declare updatedAt?: Date

  @BelongsToMany(() => Team, () => TeamSeason)
  declare teams: Team[]

  @HasOne(() => Metadata, 'seasonId')
  declare metadata: ReturnType<() => Metadata>

  @HasMany(() => Serie, 'seasonId')
  declare series: Serie[]

  @HasMany(() => Game, 'seasonId')
  declare games: Game[]

  @HasMany(() => TeamGame, 'seasonId')
  declare teamgames: TeamGame[]

  @BelongsToMany(() => TeamTable, () => TableSeason, 'seasonId')
  declare tables: TeamTable[]
}

export default Season