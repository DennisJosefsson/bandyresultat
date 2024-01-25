import { z } from 'zod'

import {
  Model,
  Table,
  Column,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
  AllowNull,
} from 'sequelize-typescript'
import Season from './Season.js'
import Team from './Team.js'

export const metadataAttributes = z.object({
  metadataId: z.number(),
  seasonId: z.number(),
  name: z.string(),
  year: z.string(),
  winnerId: z.number().optional().nullable(),
  winnerName: z.string().optional().nullable(),
  hostCity: z.string(),
  finalDate: z.string(),
  northSouth: z.boolean(),
  multipleGroupStages: z.boolean(),
  eight: z.boolean(),
  quarter: z.boolean(),
  semi: z.boolean(),
  final: z.boolean(),
  comment: z.string().optional().nullable(),
})

export const metadataInput = metadataAttributes.partial({ metadataId: true })

export type MetadataAttributes = z.infer<typeof metadataAttributes>
export type MetadataInput = z.infer<typeof metadataInput>

export interface MetadataOutput extends Required<MetadataAttributes> {}

@Table({
  underscored: true,
  timestamps: false,
  modelName: 'metadata',
})
class Metadata extends Model<MetadataAttributes, MetadataInput> {
  @PrimaryKey
  @Column
  declare metadataId?: number

  @AllowNull(false)
  @ForeignKey(() => Season)
  @Column
  declare seasonId: number

  @AllowNull(false)
  @Column
  declare name: string

  @AllowNull(false)
  @Column
  declare year: string

  @ForeignKey(() => Team)
  @Column
  declare winnerId: number

  @Column
  declare winnerName: string

  @Column
  declare hostCity: string

  @Column
  declare finalDate: string

  @AllowNull(false)
  @Column
  declare northSouth: boolean

  @AllowNull(false)
  @Column
  declare multipleGroupStages: boolean

  @AllowNull(false)
  @Column
  declare eight: boolean

  @AllowNull(false)
  @Column
  declare quarter: boolean

  @AllowNull(false)
  @Column
  declare semi: boolean

  @AllowNull(false)
  @Column
  declare final: boolean

  @Column
  declare comment: string

  @BelongsTo(() => Season, 'seasonId')
  declare season: ReturnType<() => Season>
}

export default Metadata
