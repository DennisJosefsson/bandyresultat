import { Optional } from 'sequelize'
import {
  Table,
  Model,
  PrimaryKey,
  ForeignKey,
  Column,
  BelongsTo,
  BelongsToMany,
  AllowNull,
  Default,
} from 'sequelize-typescript'
import Team from './Team.js'
import Season from './Season.js'
import TableSeason from './TableSeason.js'

interface TeamTableAttributes {
  tableId?: number
  teamId: number
  seasonId: number
  position: number
  games: number
  won: number
  draw: number
  lost: number
  scoredGoals: number
  concededGoals: number
  goalDifference: number
  points: number
  qualification: boolean
  group: string
  women: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface TeamTableInput
  extends Optional<TeamTableAttributes, 'tableId'> {}
export interface TeamTableOutput extends Required<TeamTableAttributes> {}

@Table({
  underscored: true,
  timestamps: true,
  modelName: 'table',
})
class TeamTable extends Model<TeamTableAttributes, TeamTableInput> {
  @PrimaryKey
  @Column
  declare tableId?: number

  @AllowNull(false)
  @ForeignKey(() => Team)
  @Column
  declare teamId: number

  @AllowNull(false)
  @ForeignKey(() => Season)
  @Column
  declare seasonId: number

  @AllowNull(false)
  @Column
  declare position: number

  @AllowNull(false)
  @Column
  declare games: number

  @AllowNull(false)
  @Column
  declare won: number

  @AllowNull(false)
  @Column
  declare draw: number

  @AllowNull(false)
  @Column
  declare lost: number

  @AllowNull(false)
  @Column
  declare scoredGoals: number

  @AllowNull(false)
  @Column
  declare concededGoals: number

  @AllowNull(false)
  @Column
  declare goalDifference: number

  @AllowNull(false)
  @Column
  declare points: number

  @Default(false)
  @Column
  declare qualification: boolean

  @Default(false)
  @Column
  declare women: boolean

  @Column
  declare group: string

  @Column
  declare createdAt?: Date

  @Column
  declare updatedAt?: Date

  @BelongsTo(() => Team, 'teamId')
  declare team: ReturnType<() => Team>

  @BelongsToMany(() => Season, () => TableSeason, 'tableId')
  declare seasontable: ReturnType<() => Season>
}

export default TeamTable
