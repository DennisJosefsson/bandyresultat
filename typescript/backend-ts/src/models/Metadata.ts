import { Optional } from 'sequelize'
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

interface MetadataAttributes {
  metadataId?: number
  seasonId: number
  name: string
  year: string
  winnerId?: number
  winnerName?: string
  hostCity: string
  finalDate: string
  northSouth: boolean
  multipleGroupStages: boolean
  eight: boolean
  quarter: boolean
  semi: boolean
  final: boolean
  comment?: string
}

export interface MetadataInput
  extends Optional<MetadataAttributes, 'metadataId'> {}
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
