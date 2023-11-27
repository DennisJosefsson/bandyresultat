import { Optional } from 'sequelize'
import {
  Model,
  Table,
  Column,
  PrimaryKey,
  ForeignKey,
  Default,
} from 'sequelize-typescript'
import Team from './Team.js'
import Season from './Season.js'
import TeamTable from './TeamTable.js'

interface TeamSeasonAttributes {
  teamseasonId: number
  seasonId: number
  teamId: number
  tableId?: number
  women: boolean
  qualification: boolean
}

export interface TeamSeasonInput
  extends Optional<TeamSeasonAttributes, 'teamseasonId'> {}
export interface TeamSeasonOutput extends Required<TeamSeasonAttributes> {}

@Table({
  underscored: true,
  timestamps: false,
  modelName: 'teamseason',
})
class TeamSeason extends Model<TeamSeasonAttributes, TeamSeasonInput> {
  @PrimaryKey
  @Column
  declare teamseasonId: number

  @ForeignKey(() => Season)
  @Column
  declare seasonId: number

  @ForeignKey(() => Team)
  @Column
  declare teamId: number

  @ForeignKey(() => TeamTable)
  @Column
  declare tableId?: number

  @Default(false)
  @Column
  declare women: boolean

  @Default(false)
  @Column
  declare qualification: boolean
}

export default TeamSeason
