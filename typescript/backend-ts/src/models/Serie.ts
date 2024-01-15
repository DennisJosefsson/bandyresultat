import { z } from 'zod'

import {
  Table,
  Column,
  ForeignKey,
  PrimaryKey,
  Model,
  BelongsTo,
  HasMany,
  AllowNull,
  DataType,
} from 'sequelize-typescript'
import Season from './Season.js'
import Game from './Game.js'
import TeamGame from './TeamGame.js'

export const serieAttributes = z.object({
  serieId: z.string().optional(),
  serieGroupCode: z.string(),
  serieCategory: z.string(),
  serieName: z.string(),
  serieStructure: z.array(z.number()).optional(),
  seasonId: z.number(),
  bonusPoints: z.string().optional(),
  comment: z.string().optional(),
})

const serieInput = serieAttributes.omit({ serieId: true })

export type SerieAttributes = z.infer<typeof serieAttributes>
export type SerieInput = z.infer<typeof serieInput>

export interface SerieOutput extends Required<SerieAttributes> {}

@Table({
  underscored: true,
  timestamps: false,
  modelName: 'serie',
})
class Serie extends Model<SerieAttributes, SerieInput> {
  @PrimaryKey
  @Column
  declare serieId?: number

  @AllowNull(false)
  @Column
  declare serieGroupCode: string

  @AllowNull(false)
  @Column
  declare serieCategory: string

  @Column
  declare serieName: string

  @Column(DataType.ARRAY(DataType.INTEGER))
  declare serieStructure: number[]

  @ForeignKey(() => Season)
  @Column
  declare seasonId: number

  @Column
  declare bonusPoints: string

  @Column
  declare comment: string

  @BelongsTo(() => Season, 'seasonId')
  declare season: ReturnType<() => Season>

  @HasMany(() => Game, 'serieId')
  declare games: Game[]

  @HasMany(() => TeamGame, 'serieId')
  declare teamgames: TeamGame[]
}

export default Serie
