import { z } from 'zod'

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

export const teamGameAttributes = z.object({
  teamGameId: z.number().optional(),
  gameId: z.number(),
  seasonId: z.number(),
  serieId: z.number(),
  team: z.number(),
  opponent: z.number(),
  goalsScored: z.number().optional().nullable(),
  goalsConceded: z.number().optional().nullable(),
  totalGoals: z.number().optional(),
  goalDifference: z.number().optional().nullable(),
  points: z.number().optional().nullable(),
  date: z.string(),
  category: z.string(),
  group: z.string(),
  playoff: z.boolean().optional(),
  mix: z.boolean().optional(),
  played: z.boolean().optional(),
  women: z.boolean().optional(),
  win: z.boolean().optional(),
  draw: z.boolean().optional(),
  lost: z.boolean().optional(),
  qualificationGame: z.boolean().optional(),
  homeGame: z.boolean().optional(),
  currInoffChamp: z.boolean().optional(),
})

const teamGameInput = teamGameAttributes.omit({ teamGameId: true })

export type TeamGameAttributes = z.infer<typeof teamGameAttributes>
export type TeamGameInput = z.infer<typeof teamGameInput>

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
  declare date: string

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
