import { z } from 'zod'

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

export const teamSeasonAttributes = z.object({
  teamseasonId: z.number(),
  seasonId: z.number(),
  teamId: z.number(),
  tableId: z.number().optional(),
  women: z.boolean(),
  qualification: z.boolean(),
})

const teamSeasonInput = teamSeasonAttributes.omit({ teamseasonId: true })

export type TeamSeasonAttributes = z.infer<typeof teamSeasonAttributes>
export type TeamSeasonInput = z.infer<typeof teamSeasonInput>

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
