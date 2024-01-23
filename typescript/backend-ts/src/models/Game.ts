import { z } from 'zod'
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

export const gameAttributes = z.object({
  gameId: z.number().optional(),
  seasonId: z.number(),
  serieId: z.number(),
  homeTeamId: z.object({ value: z.number() }).transform((value) => value.value),
  awayTeamId: z.object({ value: z.number() }).transform((value) => value.value),
  result: z.string().optional(),
  halftimeResult: z.string().optional(),
  homeGoal: z.coerce.number().optional(),
  awayGoal: z.coerce.number().optional(),
  halftimeHomeGoal: z.coerce.number().optional(),
  halftimeAwayGoal: z.coerce.number().optional(),
  date: z.string(),
  round: z.number().nullable().optional(),
  category: z.string(),
  group: z.string(),
  playoff: z.boolean().optional(),
  extraTime: z.boolean().optional(),
  penalties: z.boolean().optional(),
  mix: z.boolean().optional(),
  played: z.boolean().optional(),
  women: z.boolean().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

const gameInput = gameAttributes.omit({ gameId: true })

export type GameAttributes = z.infer<typeof gameAttributes>
export type GameInput = z.infer<typeof gameInput>

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
  declare date: string

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
