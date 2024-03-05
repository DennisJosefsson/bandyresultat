import { z } from 'zod'

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

export const teamAttributes = z.object({
  teamId: z.number(),
  name: z.string(),
  city: z.string(),
  casualName: z.string(),
  shortName: z.string(),
  women: z.boolean().optional(),
  lat: z.number().optional().nullable(),
  long: z.number().optional().nullable(),
})

export const teamInput = teamAttributes.partial({ teamId: true })

export type TeamAttributes = z.infer<typeof teamAttributes>
export type TeamInput = z.infer<typeof teamInput>

export interface TeamOutput extends Required<TeamAttributes> {}

@Table({
  underscored: true,
  timestamps: false,
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
