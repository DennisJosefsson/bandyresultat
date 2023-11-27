import { Optional } from 'sequelize'
import {
  Model,
  Column,
  Table,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript'

interface ErrorAttributes {
  errorId?: number
  date: string
  name: string
  message: string
  origin: string
  body: string
  production: boolean
  backend: boolean
}
export interface ErrorInput extends Optional<ErrorAttributes, 'errorId'> {}
export interface ErrorOutput extends Required<ErrorAttributes> {}

@Table({
  underscored: true,
  timestamps: false,
  modelName: 'error',
})
class Error extends Model<ErrorAttributes, ErrorInput> {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare errorId: number

  @Column
  declare date: string

  @Column
  declare name: string

  @Column
  declare message: string

  @Column
  declare origin: string

  @Column
  declare body: string

  @Column
  declare production: boolean

  @Column
  declare backend: boolean
}

export default Error
