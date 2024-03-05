import { z } from 'zod'
import {
  Table,
  Column,
  ForeignKey,
  PrimaryKey,
  Model,
} from 'sequelize-typescript'
import Season from './Season.js'
import TeamTable from './TeamTable.js'

export const tableSeasonAttributes = z.object({
  tableseasonId: z.number(),
  seasonId: z.number(),
  tableId: z.number(),
})

const tableSeasonInput = tableSeasonAttributes.omit({ tableseasonId: true })

export type TableSeasonAttributes = z.infer<typeof tableSeasonAttributes>
export type TableSeasonInput = z.infer<typeof tableSeasonInput>

export interface TableSeasonOutput extends Required<TableSeasonAttributes> {}

@Table({
  underscored: true,
  timestamps: false,
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
