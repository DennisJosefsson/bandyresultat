import { z } from 'zod'

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

export const seasonAttributes = z.object({
  seasonId: z.number(),
  year: z.string().superRefine((val, ctx) => {
    if (!val.match(/\d{4}/) || !val.match(/\d{4}\/\d{4}/)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Wrong year format`,
        fatal: true,
      })

      return z.NEVER
    }

    if (val.match(/\d{4}/)) {
      if (Number(val) > 1963) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Wrong year format, single year can't be higher than 1963`,
          fatal: true,
        })
        return z.NEVER
      }
    }

    if (val.match(/\d{4}\/\d{4}/)) {
      const yearArray = val.split('/')
      if (Number(yearArray[1]) - Number(yearArray[0]) !== 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Wrong year format, xxxx/xxxx+1`,
        })
      }
    }
  }),
  women: z.boolean(),
  seasonStructure: z.string().optional(),
})

export const seasonInput = seasonAttributes.partial({ seasonId: true })

export type SeasonAttributes = z.infer<typeof seasonAttributes>
export type SeasonInput = z.infer<typeof seasonInput>

export interface SeasonOutput extends Required<SeasonAttributes> {}

@Table({
  underscored: true,
  timestamps: false,
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
