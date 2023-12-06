import { Optional } from 'sequelize'
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

interface SerieAttributes {
  serieId?: number
  serieGroupCode: string
  serieCategory: string
  serieName: string
  serieStructure?: number[]
  seasonId: number
  bonusPoints?: string
  comment?: string
}

export interface SerieInput extends Optional<SerieAttributes, 'serieId'> {}
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
