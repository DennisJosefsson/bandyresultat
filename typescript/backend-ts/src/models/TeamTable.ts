import { z } from 'zod'

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

export const teamTableAttributes = z.object({
  tableId: z.number().optional(),
  teamId: z.number(),
  seasonId: z.number(),
  position: z.number(),
  games: z.number(),
  won: z.number(),
  draw: z.number(),
  lost: z.number(),
  scoredGoals: z.number(),
  concededGoals: z.number(),
  goalDifference: z.number(),
  points: z.number(),
  qualification: z.boolean(),
  group: z.string(),
  women: z.boolean(),
})

export const teamTableInput = teamTableAttributes.partial({ tableId: true })

export type TeamTableAttributes = z.infer<typeof teamTableAttributes>
export type TeamTableInput = z.infer<typeof teamTableInput>

export interface TeamTableOutput extends Required<TeamTableAttributes> {}

@Table({
  underscored: true,
  timestamps: false,
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

  @BelongsTo(() => Team, 'teamId')
  declare team: ReturnType<() => Team>

  @BelongsToMany(() => Season, () => TableSeason, 'tableId')
  declare seasontable: ReturnType<() => Season>
}

export default TeamTable
