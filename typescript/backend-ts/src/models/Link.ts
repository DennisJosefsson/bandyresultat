import { Optional } from 'sequelize'
import { Model, Table, PrimaryKey, Column } from 'sequelize-typescript'

interface LinkAttributes {
  linkId?: number
  linkName: string
  searchString: string
  origin: string
}

export interface LinkInput extends Optional<LinkAttributes, 'linkId'> {}
export interface LinkOutput extends Required<LinkAttributes> {}

@Table({
  underscored: true,
  timestamps: false,
  modelName: 'link',
})
class Link extends Model<LinkAttributes, LinkInput> {
  @PrimaryKey
  @Column
  declare linkId: number

  @Column
  declare linkName: string

  @Column
  declare searchString: string

  @Column
  declare origin: string
}

export default Link
