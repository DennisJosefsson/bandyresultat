import { Optional } from 'sequelize'
import {
  Table,
  Column,
  ForeignKey,
  PrimaryKey,
  Model,
} from 'sequelize-typescript'
import Season from './Season.js'
import TeamTable from './TeamTable.js'

interface TableSeasonAttributes {
  tableseasonId: number
  seasonId: number
  tableId: number
}

export interface TableSeasonInput
  extends Optional<TableSeasonAttributes, 'tableseasonId'> {}
export interface TableSeasonOutput extends Required<TableSeasonAttributes> {}

@Table({
  underscored: true,
  timestamps: true,
  modelName: 'tableseason',
})
class TableSeason extends Model<TableSeasonAttributes, TableSeasonInput> {
  @PrimaryKey
  @Column
  declare tableseasonId: number

  @ForeignKey(() => Season)
  @Column
  declare seasonId: number

  @ForeignKey(() => TeamTable)
  @Column
  declare tableId: number
}

export default TableSeason
